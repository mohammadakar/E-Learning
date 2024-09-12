import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import { useEffect } from "react";
import { assignInstructor, deleteUser, getAllUsers } from "../../redux/ApiCalls/UserApiCall";

const Users = () => {

    const { allUsers } = useSelector(state => state.user);
    const dispatch = useDispatch();
    
    useEffect(() => {
        dispatch(getAllUsers())
    }, [dispatch])

    const handleDeleteUser = (userId) => {
        dispatch(deleteUser(userId)).then(() => {
            dispatch(getAllUsers());
        });
    }

    return (
        <div className="min-h-screen bg-gray-100 mt-20 ">
            <Header />
            <div className="overflow-x-auto px-4 sm:px-8 py-8">
                <div className="min-w-full bg-white border border-gray-300 shadow-md rounded-lg lg:ml-40 md:ml-24 sm:ml-16">
                    <table className="min-w-full table-auto">
                        <thead>
                            <tr className="bg-blue-50">
                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Profile Photo</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Username</th>
                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Actions</th>
                            </tr>
                        </thead>
                        <tbody>
                            {allUsers?.map(user => (
                                <tr key={user?._id} className="hover:bg-gray-100">
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <img 
                                            src={user?.profilePhoto?.url} 
                                            alt={`${user?.username}'s profile`} 
                                            className="h-10 w-10 rounded-full object-cover" 
                                        />
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300 uppercase">
                                        {user?.username}
                                    </td>
                                    <td className="py-2 px-4 border-b border-gray-300">
                                        <div className="flex flex-col space-y-2">
                                            <button onClick={(e)=>{
                                                e.preventDefault();
                                                dispatch(assignInstructor(user._id))
                                                }}
                                                className="bg-blue-500 text-white py-1 px-2 rounded-lg hover:bg-blue-600">
                                                Assign instructor
                                            </button>
                                            <button onClick={(e)=>{
                                                e.preventDefault();
                                                handleDeleteUser(user._id);
                                                }}
                                                className="bg-red-500 text-white py-1 px-2 rounded-lg hover:bg-red-600">
                                                Delete User
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default Users;
