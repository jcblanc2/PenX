import { formatDate, formatText } from "../utils/util";
import { useNavigate } from 'react-router-dom'

const Article = ({ id, userName, title, date, content, cover }) => {
    const navigate = useNavigate();
    const handleClick = () => {
        navigate(`post/${id}`);
    }

    return (
        <div className="flex mb-5 cursor-pointer" onClick={handleClick}>
            <div>
                <img className="w-[80%] ml-5" src={`http://localhost:4000/${cover}`} alt="Image" />
            </div>

            <div className="">
                <h2 className="m-0 text-[1.8rem] text-xl font-bold ">{title}</h2>
                <p className="my-2 text-[#888]">
                    <span className="font-semibold text-[#333] text-[1rem]">{userName}</span> ·
                    <time className=" "> {formatDate(date)}</time>
                </p>
                <p className=" leading-20">{formatText(content)}</p>
            </div>
        </div>
    )
}

export default Article
