import NavBar from "../components/NavBar";
import Article from "../components/Article";
import { useEffect, useState } from "react";

const Home = () => {
    const [posts, setPosts] = useState([]);
    const [keyword, setKeyword] = useState('');


    useEffect(() => {
        const fetchPots = async () => {
            const response = await fetch('http://localhost:4000/post/posts');

            const responseData = await response.json();
            setPosts(responseData.posts);
        };

        fetchPots();
    }, []);

    const handleSearch = () => { }

    return (
        <main className="p-2 my-0 mx-auto max-w-[900px]">
            <NavBar />

            <form className="pt-14 pb-20 flex justify-end">
                <div className="relative">
                    <div className="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                        <svg className="w-4 h-4 text-gray-500 " aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 20 20">
                            <path stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z" />
                        </svg>
                    </div>
                    <input
                        type="search"
                        id="default-search"
                        className="block w-[300px] p-4 ps-10 text-sm text-[#333] border border-gray-300 rounded-lg bg-gray-50 focus:outline-none"
                        placeholder="Search"
                        required
                        onChange={(e) => setKeyword(e.target.value)}
                        onKeyDown={handleSearch} />
                </div>
            </form>


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
        </main>
    )
}

export default Home