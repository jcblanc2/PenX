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
        <main>
            <NavBar />

            <header>
                <div>
                    <h1>{post.title}</h1>
                    {post.subTitle !== '' && (<h1>{post.subTitle}</h1>)}
                </div>

                <div>
                    <div className={`rounded-full flex justify-center items-center  text-white w-8 py-1`} style={{ background: color }}>{post.author.name.charAt(0)}
                    </div>

                    <div>
                        <div className="">
                            <span className="">{post.author.name} </span>
                            {post.author._id === userInfo.userId && (<button className=' bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white font-semibold rounded-full px-3 py-1 inline-flex gap-1' onClick={handleEdit}>
                                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="w-5 h-5">
                                    <path strokeLinecap="round" strokeLinejoin="round" d="M16.862 4.487l1.687-1.688a1.875 1.875 0 112.652 2.652L10.582 16.07a4.5 4.5 0 01-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 011.13-1.897l8.932-8.931zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0115.75 21H5.25A2.25 2.25 0 013 18.75V8.25A2.25 2.25 0 015.25 6H10" />
                                </svg>
                                Edit
                            </button>)}
                        </div>

                        <p className="">
                            <span className=""> {calculateReadingTime(post.content)} </span>·
                            <time className=" "> {formatDate(post.createdAt)}</time>
                        </p>
                    </div>
                </div>
            </header>

            <section>
                <img className="w-[80%] ml-5 overflow-hidden" src={`http://localhost:4000/${post.cover}`} alt="Image" />

                <div dangerouslySetInnerHTML={{ __html: post.content }}></div>
            </section>
        </main>
    )
}

export default Post
