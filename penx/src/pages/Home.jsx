import NavBar from "../components/NavBar";
import Article from "../components/Article";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        const fetchPots = async () => {
            const response = await fetch('http://localhost:4000/post/posts', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            const responseData = await response.json();
            setPosts(responseData.posts);
        };

        fetchPots();
    }, []);

    return (
        <main>
            <NavBar handleChange={(e) => setKeyword(e.taget.value)} />

            <div className="px-10 my-0">
                <div className="p-2 my-0 mx-auto max-w-[900px] pt-20">
                    <div className="">
                        {posts.length > 0 && posts
                            .filter((post) =>
                                post.title.toLowerCase().includes(keyword.toLowerCase())
                            ).map(post => (
                                <Article
                                    key={post._id}
                                    id={post._id}
                                    userName={post.author.name}
                                    cover={post.cover}
                                    title={post.title}
                                    content={post.content}
                                    date={post.createdAt} />
                            ))}
                    </div>
                </div>
            </div>
        </main>
    )
}

export default Home