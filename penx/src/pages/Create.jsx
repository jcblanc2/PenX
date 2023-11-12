import { useState } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import { modules, formats } from '../constants';
import NavBar from '../components/NavBar';
import { useNavigate } from 'react-router-dom';

const Create = () => {
    const [title, setTitle] = useState('');
    const [subtitle, setSubtitle] = useState('');
    const [content, setContent] = useState('');
    const [files, setFiles] = useState('');
    const navigate = useNavigate();

    const onPublish = async (e) => {
        const data = new FormData();
        data.set('title', title);
        data.set('subtitle', subtitle);
        data.set('content', content);
        data.set('file', files[0]);

        e.preventDefault();

        const response = await fetch('http://localhost:4000/post/create', {
            method: 'POST',
            body: data,
            credentials: 'include',
        });

        if (response.ok) {
            navigate('/');
        }
    }

    return (
        <main className='p-2 my-0 mx-auto max-w-[750px]' >
            <NavBar writing={true} handlePublish={onPublish} />

            <form className=' mt-16 '>
                <input
                    type="title"
                    placeholder='Title'
                    value={title}
                    onChange={(e) => setTitle(e.target.value)} />

                <input
                    type="text"
                    placeholder='Subtitle'
                    value={subtitle}
                    onChange={(e) => setSubtitle(e.target.value)} />

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

export default Create
