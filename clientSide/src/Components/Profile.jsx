import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useState } from "react";
import { deleteAccount, updateProfile, updateProfilePhoto } from "../redux/ApiCalls/UserApiCall";
import { logout } from "../redux/ApiCalls/AuthApiCall";
import swal from "sweetalert";

const Profile = () => {
    const user = useSelector(state => state.auth.user);
    const [profilePhoto, setProfilePhoto] = useState(null);
    const [username, setUsername] = useState(user?.username);
    const [password, setPassword] = useState("");
    const dispatch = useDispatch();

    const handleProfilePhotoChange = (e) => {
        setProfilePhoto(e.target.files[0]);
    };

    const handleDeleteAcc = () => {
        swal({
            title: "Are you sure?",
            text: "You will not be able to recover your profile!",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then((isOk) => {
            if (isOk) {
                dispatch(deleteAccount());
                dispatch(logout());
            }
        });
    };

    const formSubmitHandler = (e) => {
        e.preventDefault();
        if (profilePhoto) {
            dispatch(updateProfilePhoto(profilePhoto));
        }
        const updatedUser = { username };
        if (password.trim() !== "") {
            updatedUser.password = password;
        }
        dispatch(updateProfile(updatedUser));
    };

    return (
        <section>
            <Header />
            <div className="max-w-3xl mx-auto p-6">
                <h2 className="text-2xl font-bold mb-6 text-blue-400 text-center">Update Profile</h2>
                <form onSubmit={formSubmitHandler}>
                    <div className="flex flex-col items-center mb-6">
                        <div className="relative">
                            <img
                                src={profilePhoto ? URL.createObjectURL(profilePhoto) : user.profilePhoto?.url}
                                alt="profile"
                                className="rounded-full h-24 w-24 object-cover"
                            />
                            <label htmlFor="profilePhotoInput" className="absolute bottom-0 right-0 bg-gray-700 text-white p-2 rounded-full cursor-pointer">
                                <svg
                                    className="w-6 h-6"
                                    fill="none"
                                    stroke="currentColor"
                                    viewBox="0 0 24 24"
                                    xmlns="http://www.w3.org/2000/svg"
                                >
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 3h14a2 2 0 012 2v14a2 2 0 01-2 2H5a2 2 0 01-2-2V5a2 2 0 012-2z" />
                                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                </svg>
                            </label>
                            <input
                                type="file"
                                id="profilePhotoInput"
                                onChange={handleProfilePhotoChange}
                                className="hidden"
                            />
                        </div>
                        <input
                            type="text"
                            id="username"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="text-center mt-4 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                        />
                        <input
                            type="password"
                            id="password"
                            placeholder="New Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="text-center mt-4 border p-3 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400 w-full sm:w-64"
                        />
                    </div>
                    <div className="flex items-center justify-center">
                        <button
                            type="submit"
                            className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline w-full sm:w-auto"
                        >
                            Update
                        </button>
                    </div>
                </form>
                <div className="flex items-center justify-center mt-10">
                    <button onClick={handleDeleteAcc} className="bg-red-600 text-white rounded p-3 w-full sm:w-auto">
                        Delete Account
                    </button>
                </div>
            </div>
        </section>
    );
};

export default Profile;
