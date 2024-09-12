import { useState } from "react";
import { useDispatch } from "react-redux";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
import { loginUser } from "../redux/ApiCalls/AuthApiCall";

const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");

    const dispatch = useDispatch();

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (email.trim() === "") return toast.error('Email is required !!')
        if (password.trim() === "") return toast.error('Password is required !!')

        dispatch(loginUser({ email, password }));
    }

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <h1 className="bg-blue-400 text-center text-white p-3 rounded-lg 
            uppercase hover:opacity-95 mb-8 text-2xl sm:text-3xl md:text-4xl">Login to your account</h1>
            <form onSubmit={formSubmitHandler} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="font-bold mb-2">Email</label>
                    <input
                        type="email"
                        className="text-center w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your email"
                        id="email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-6">
                    <label htmlFor="password" className="font-bold mb-2">Password</label>
                    <input
                        type="password"
                        className="text-center w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your password"
                        id="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                    />
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 rounded-lg p-3 text-white uppercase font-bold hover:bg-blue-500 transition-colors"
                >
                    Login
                </button>
            </form>
            <p className="text-center mt-6 text-gray-700">
                Don't have an account? <Link to="/register" className="text-blue-500">Register</Link>
            </p>
        </section>
    );
}

export default Login;
