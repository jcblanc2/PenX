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
    const { id } = useParams();

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

        if (files?.[0]) {
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
        <main className='px-10 my-0' >
            <NavBar label='Update' handleClick={onUpdate} />

            <form className='mt-16 mx-auto max-w-[900px] pb-10'>
                <div className='flex flex-col gap-2 justify-center items-center pb-5'>
                    <input
                        type="title"
                        placeholder='Title'
                        value={title}
                        onChange={(e) => setTitle(e.target.value)}
                        className='block w-full text-[1.8rem] text-xl text-[#333] font-bold p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none' autoFocus />

                    <input
                        type="text"
                        placeholder='Subtitle'
                        value={subTitle}
                        onChange={(e) => setSubTitle(e.target.value)}
                        className='block w-full mt-3 text-[#333] text-lg font-bold p-4 border border-gray-300 rounded-lg bg-gray-50 focus:outline-none' />

                    <input
                        type="file"
                        name="file"
                        id="file"
                        onChange={(e) => setFiles(e.target.files)}
                        className='block w-full text-lg text-[#333] border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none p-4 border' />
                </div>
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
