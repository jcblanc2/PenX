import NavBar from "../components/NavBar";
import Article from "../components/Article";
import { useEffect, useState } from "react";
import { ShimmerContentBlock } from "react-shimmer-effects";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState('');
    const [loading, setLoading] = useState(true);


    useEffect(() => {
        const fetchPots = async () => {
            const response = await fetch('http://localhost:4000/post/posts', {
                method: 'GET',
                headers: { 'Content-Type': 'application/json' },
                credentials: "include",
            });

            const responseData = await response.json();
            setPosts(responseData.posts);
            setLoading(false)
        };

        fetchPots();
    }, []);

    return (
        <main>
            <NavBar handleChange={(e) => setKeyword(e.target.value)} />

            <div className="px-10 my-0">
                <div className="p-2 my-0 mx-auto max-w-[900px] pt-20">
                    <div className="">
                        {loading ? (
                            Array.from({ length: 20 }, (_, index) => (
                                <ShimmerContentBlock
                                    key={index}
                                    title
                                    text
                                    thumbnailWidth={370}
                                    thumbnailHeight={370}
                                />
                            ))
                        ) : posts.length > 0 && posts
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