import { useEffect, useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../constants';
import NavBar from '../components/NavBar';
import { useNavigate, useParams } from 'react-router-dom';

const EditPost = () => {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const navigate = useNavigate();
    const {id} = useParams();

    useEffect(() => {
        const fetchPost = async () => {
            const response = await fetch(`http://localhost:4000/post/${id}`);

            const postInfo = await response.json();
            setTitle(postInfo.title);
            setSubTitle(postInfo.subTitle);
            setContent(postInfo.content);
        }

        fetchPost();
    }, []);

    const onUpdate = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('subTitle', subTitle);
        data.set('content', content);
        data.set('id', id);

        if(files?.[0]){
            data.set('file', files?.[0]);
        }

        e.preventDefault();

        const response = await fetch('http://localhost:4000/post/update', {
            method: 'PUT',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            navigate(`/post/${id}`);
        }
    }

    return (
        <main className='p-2 my-0 mx-auto max-w-[750px]' >
            <NavBar label='Update' handleClick={onUpdate} />

            <form className=' mt-16 '>
                <input
                    type="title"
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <input
                    type="text"
                    placeholder='Subtitle'
                    value={subTitle}
                    onChange={(e) => setSubTitle(e.target.value)} />

                <input
                    type="file"
                    name="file"
                    id="file"
                    onChange={(e) => setFiles(e.target.files)} />

                <ReactQuill
                    value={content}
                    modules={modules}
                    formats={formats}
                    onChange={newValue => setContent(newValue)} />
            </form>
        </main >
    )
}


export default EditPost
