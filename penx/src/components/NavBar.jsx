import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../UserContext';
import UserIcon from '../assets/icons/user.svg';

const NavBar = ({ label, handleClick }) => {
    const { setUserInfo, userInfo } = useContext(userContext);
    const name = userInfo?.name;
    const navigate = useNavigate();

    useEffect(() => {
        async function fetchProfile() {
            const response = await fetch("http://localhost:4000/api/profile", {
                credentials: "include"
            });

            const responseBody = await response.json();
            setUserInfo(responseBody);
        }
        fetchProfile();
    }, []);

    const onLogout = () => {
        const response = fetch("http://localhost:4000/api/logout", {
            credentials: "include",
            method: "POST",
        });
        setUserInfo(null);
    }

    const handleCreatePost = () => {
        navigate('/create');
    }

    return (
        <header className="flex pt-2 justify-between items-center">
            <Link to="/" className="text-[1.5rem] text-inherit no-underline font-bold">PenX</Link>

            <nav className="flex gap-7">
                {name && (
                    <>
                        {!label && (<svg width="24" height="24" className=' cursor-pointer' onClick={handleCreatePost} clipRule="evenodd" fillRule="evenodd" strokeLinejoin="round" strokeMiterlimit="2" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                            <path d="m11.25 6c.398 0 .75.352.75.75 0 .414-.336.75-.75.75-1.505 0-7.75 0-7.75 0v12h17v-8.749c0-.414.336-.75.75-.75s.75.336.75.75v9.249c0 .621-.522 1-1 1h-18c-.48 0-1-.379-1-1v-13c0-.481.38-1 1-1zm1.521 9.689 9.012-9.012c.133-.133.217-.329.217-.532 0-.179-.065-.363-.218-.515l-2.423-2.415c-.143-.143-.333-.215-.522-.215s-.378.072-.523.215l-9.027 8.996c-.442 1.371-1.158 3.586-1.264 3.952-.126.433.198.834.572.834.41 0 .696-.099 4.176-1.308zm-2.258-2.392 1.17 1.171c-.704.232-1.274.418-1.729.566zm.968-1.154 7.356-7.331 1.347 1.342-7.346 7.347z" fillRule="nonzero" />
                        </svg>)}

                        {label && (<button className=' bg-green-400 hover:bg-green-500 focus:bg-green-500 text-white font-semibold rounded-full px-2 py-1' onClick={handleClick}>{label}</button>)}

                        <svg width="24" height="24" className=' cursor-pointer' xmlns="http://www.w3.org/2000/svg" fillRule="evenodd" clipRule="evenodd">
                            <path d="M12 0c6.623 0 12 5.377 12 12s-5.377 12-12 12-12-5.377-12-12 5.377-12 12-12zm8.127 19.41c-.282-.401-.772-.654-1.624-.85-3.848-.906-4.097-1.501-4.352-2.059-.259-.565-.19-1.23.205-1.977 1.726-3.257 2.09-6.024 1.027-7.79-.674-1.119-1.875-1.734-3.383-1.734-1.521 0-2.732.626-3.409 1.763-1.066 1.789-.693 4.544 1.049 7.757.402.742.476 1.406.22 1.974-.265.586-.611 1.19-4.365 2.066-.852.196-1.342.449-1.623.848 2.012 2.207 4.91 3.592 8.128 3.592s6.115-1.385 8.127-3.59zm.65-.782c1.395-1.844 2.223-4.14 2.223-6.628 0-6.071-4.929-11-11-11s-11 4.929-11 11c0 2.487.827 4.783 2.222 6.626.409-.452 1.049-.81 2.049-1.041 2.025-.462 3.376-.836 3.678-1.502.122-.272.061-.628-.188-1.087-1.917-3.535-2.282-6.641-1.03-8.745.853-1.431 2.408-2.251 4.269-2.251 1.845 0 3.391.808 4.24 2.218 1.251 2.079.896 5.195-1 8.774-.245.463-.304.821-.179 1.094.305.668 1.644 1.038 3.667 1.499 1 .23 1.64.59 2.049 1.043z" />
                        </svg>

                        <Link onClick={onLogout}>Logout</Link>
                    </>
                )}

                {!name && (
                    <>
                        <Link to="/login">Login</Link>
                        <Link to="register">Register</Link>
                    </>
                )}

            </nav>
        </header>
    )
}

export default NavBar
