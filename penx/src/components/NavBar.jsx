import { useContext, useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { userContext } from '../UserContext';

const NavBar = () => {
    const {setUserInfo, userInfo} = useContext(userContext);
    const name = userInfo?.name;

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

    return (
        <header className="flex pt-2 justify-between mb-24 items-center">
            <Link to="/" className="text-[1.5rem] text-inherit no-underline font-bold">PenX</Link>

            <nav className="flex gap-14">
                {name && (
                    <>
                        <Link to='/create'>Create new post</Link>
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
