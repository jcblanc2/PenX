import { Link } from "react-router-dom"

const Register = () => {
    return (
        <section className="flex flex-col md:flex-row h-screen items-center">
            <div className="bg-white w-full md:max-w-md lg:max-w-full md:mx-auto md:w-1/2 xl:w-1/3 h-screen px-6 lg:px-16 xl:px-12
        flex items-center justify-center">

                <div className="w-full h-100">
                    <h1 className="text-2xl md:text-2xl font-bold leading-tight mt-12 text-center text-[#333]">Register</h1>

                    <form className="mt-6" action="#" method="POST">
                        <div>
                            <input type="text" name="" id="text" placeholder="Enter Full Name" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#555] focus:bg-white focus:outline-none" autoFocus required />
                        </div>

                        <div className="my-4">
                            <input type="email" name="" id="email" placeholder="Enter Email Address" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#555] focus:bg-white focus:outline-none" required />
                        </div>

                        <div >
                            <input type="password" name="" id="password" placeholder="Enter Password" minLength="6" className="w-full px-4 py-3 rounded-lg bg-gray-200 mt-2 border focus:border-[#555]
                focus:bg-white focus:outline-none" required />
                        </div>


                        <button type="submit" className="w-full block bg-[#555] hover:bg-[#666] focus:bg-[#666] text-white font-semibold rounded-lg px-4 py-3 mt-6">Log In</button>
                    </form>


                    <p className="mt-5 text-center text-[#333]">Already have an account? <Link to="/login" className="text-[#555] hover:text-[#666] font-semibold">Log In</Link></p>
                </div>
            </div>

        </section>

    )
}

export default Register
