import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toast } from "react-toastify";
import { addUser, generateEmailForUser } from "../../redux/ApiCalls/AuthApiCall";
import Header from "../Header";
import { useNavigate } from "react-router-dom";
import { getAllMajors } from "../../redux/ApiCalls/MajorApiCall";
import { getAllUsers } from "../../redux/ApiCalls/UserApiCall";

const AddUser = () => {
    const dispatch = useDispatch();
    const { allMajors } = useSelector(state => state.major);
    
    const [username, setUsername] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [major, setMajor] = useState("");

    const navigate = useNavigate();

    useEffect(() => {
        dispatch(getAllMajors());
    }, [dispatch]);

    const generateEmail = () => {
        const generatedEmail = generateEmailForUser(username);
        setEmail(generatedEmail);
        toast.success(`Email generated: ${generatedEmail}`);
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();

        if (username.trim() === "") return toast.error("Username is required!");
        if (password.trim() === "") return toast.error("Password is required!");
        if (major.trim() === "") return toast.error("Major is required!");

        dispatch(addUser({ username, email, password, major }));
        toast.success("User added successfully");
        navigate("/users");
        dispatch(getAllUsers());
    };

    return (
        <section className="flex flex-col items-center justify-center min-h-screen bg-gray-100">
            <Header />
            <h1 className="bg-blue-400 text-center text-white p-3 rounded-lg 
                uppercase hover:opacity-95 mb-8 text-2xl sm:text-3xl md:text-4xl">
                Add new user
            </h1>
            <form onSubmit={formSubmitHandler} className="w-full max-w-md bg-white p-6 rounded-lg shadow-lg">
                <div className="flex flex-col mb-4">
                    <label htmlFor="username" className="font-bold mb-2">Username</label>
                    <input
                        type="text"
                        className="text-center w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                        placeholder="Enter your username"
                        id="username"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                    />
                </div>
                <div className="flex flex-col mb-4">
                    <label htmlFor="email" className="font-bold mb-2">Email</label>
                    <div className="flex">
                        <input
                            type="email"
                            className="text-center w-full border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
                            placeholder="Email will be auto-generated"
                            id="email"
                            value={email}
                            readOnly
                        />
                        <button type="button" onClick={generateEmail} className="ml-2 bg-blue-400 p-3 rounded-lg text-white">
                            Generate Email
                        </button>
                    </div>
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
                <div className="flex flex-col mb-6">
                    <label htmlFor="major" className="font-bold mb-2">Major</label>
                    <select value={major} onChange={(e) => setMajor(e.target.value)} 
                        className="w-full border font-bold p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700">
                        <option className="font-bold bg-blue-400">Select Major</option>
                        {allMajors && allMajors.length > 0 && allMajors.map(major => (
                            <option key={major._id}>
                                {major?.major}
                            </option>
                        ))}
                    </select>
                </div>
                <button
                    type="submit"
                    className="w-full bg-blue-400 rounded-lg p-3 text-white uppercase font-bold hover:bg-blue-500 transition-colors"
                >
                    Add user
                </button>
            </form>
        </section>
    );
};

export default AddUser;
