import NavBar from "../components/NavBar";
import Article from "../components/Article";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);

    useEffect(() => {
        const fetchPots = async () => {
            const response = await fetch('http://localhost:4000/post/posts');

            const responseData = await response.json();
            setPosts(responseData.posts);
        };

        fetchPots();
    }, []);

    return (
        <main className="p-2 my-0 mx-auto max-w-[700px]">
            <NavBar writing={false} />

            {posts.length > 0 && posts.map(post => (
                <Article
                    key={post._id}
                    id={post._id}
                    userName={post.author.name}
                    cover={post.cover}
                    title={post.title}
                    content={post.content} 
                    date={post.createdAt}/>
            ))}
        </main>
    )
}

export default Home