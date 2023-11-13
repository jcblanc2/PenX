import { useEffect, useState } from "react"
import { useParams } from 'react-router-dom';

const Post = () => {
    const [post, setPost] = useState(null);
    const { id } = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/post/${id}`);

            const responseBody = await response.json();
            setPost(responseBody);
            console.log(responseBody);
        }

        fetchPost();
    }, []);

    return (
        <div>
            Post
        </div>
    )
}

export default Post
