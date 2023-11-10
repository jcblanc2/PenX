import { Link } from 'react-router-dom'

const NavBar = () => {
    return (
        <header className="flex pt-2 justify-between mb-24 items-center">
            <Link to="/" className="text-[1.5rem] text-inherit no-underline font-bold">PenX</Link>

            <nav className="flex gap-14">
                <Link to="/login">Login</Link>
                <Link to="register">Register</Link>
            </nav>
        </header>
    )
}

export default NavBar
