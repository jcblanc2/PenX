import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../constants';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [subTitle, setSubTitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const navigate = useNavigate();

    const onPublish = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('subTitle', subTitle);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();

        const response = await fetch('https://tricky-vest-pike.cyclic.app/post/create', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            navigate('/');
        }
    }

    return (
        <main >
            <NavBar label='Publish' handleClick={onPublish} />
            <div className="px-10 my-0">
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
                            className='block w-full text-sm text-[#333] border-gray-300 rounded-lg cursor-pointer bg-gray-50  focus:outline-none p-4 border' />
                    </div>

                    <ReactQuill
                        value={content}
                        modules={modules}
                        formats={formats}
                        onChange={newValue => setContent(newValue)} />
                </form>
            </div>
        </main >
    )
}

export default Create
