import { useContext, useEffect, useMemo, useState } from "react"
import { useNavigate, useParams } from 'react-router-dom';
import {
    calculateReadingTime,
    formatDate,
    generateRandomColor
} from "../utils/util";
import NavBar from "../components/NavBar";
import { userContext } from "../UserContext";

const Post = () => {
    const [post, setPost] = useState(null);
    const [color, setColor] = useState('');
    const { userInfo } = useContext(userContext);
    const { id } = useParams();
    const navigate = useNavigate();

    useMemo(() => setColor(generateRandomColor()), [])

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/post/${id}`);

            const responseBody = await response.json();
            setPost(responseBody);
        }

        fetchPost();
    }, []);

    const handleEdit = () => {
        navigate(`/edit/${post._id}`);
    }

    if (!post) return '';

    return (
        <main >
            <NavBar />
            <div className="px-10 my-0">
                <header className="flex flex-col items-center justify-center pt-24">
                    <div>
                        <h1 className="text-[1.8rem] text-2xl text-[#333] font-bold">{post.title}</h1>
                        {post.subTitle !== '' && (<h1 className="text-center mt-3 text-[#333] text-xl font-bold">{post.subTitle}</h1>)}
                    </div>

                    <div className="flex flex-row justify-center items-center py-3">
                        <div className={`rounded-full flex justify-center items-center  text-white w-12 py-3 mx-2 font-bold text-[1rem]`} style={{ background: color }}>{post.author.name.charAt(0)}
                        </div>

                        <div>
                            <div>
                                <span className="mr-2 font-semibold text-[#333] text-[1rem]">{post.author.name} </span>
                            </div>

                            <p className=" leading-5 text-[#888]">
                                <span> {calculateReadingTime(post.content)} </span>·
                                <time> {formatDate(post.createdAt)}</time>
                            </p>
                        </div>
                    </div>

                    {post.author._id === userInfo.userId && (<button className=' bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white font-semibold rounded-full px-3 py-1 inline-flex gap-1' onClick={handleEdit}>
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                        </svg>
                        Edit
                    </button>)}
                </header>

                <section className="flex flex-col items-center justify-center py-5 mx-auto max-w-[700px]">
                    <img className="w-[100%] ml-5 overflow-hidden pb-5" src={`http://localhost:4000/${post.cover}`} alt="Image" />

                    <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
                </section>
            </div>
        </main>
    )
}

export default Post
