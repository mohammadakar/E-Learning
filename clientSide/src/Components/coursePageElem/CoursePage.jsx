import { useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getCourse, getCourseUsers } from "../../redux/ApiCalls/CourseApiCall";
import Header from "../Header";
import TaskModal from "./TaskModal";
import CommentModal from "./CommentModal";
import TasksAndComments from "./tasksAndComments";

const CoursePage = () => {
    const { id } = useParams();
    const dispatch = useDispatch();
    const { courseById, courseUsers } = useSelector(state => state.course);
    const { user } = useSelector(state => state.auth);

    const [activeSection, setActiveSection] = useState('classwork');

    const [isTaskModalOpen, setIsTaskModalOpen] = useState(false);
    const [TaskmodalTitle, setTaskModalTitle] = useState('');

    const [isCommentModalOpen, setIsCommentModalOpen] = useState(false);
    const [CommentmodalTitle, setCommentModalTitle] = useState('');

    useEffect(() => {
        dispatch(getCourse(id));
        dispatch(getCourseUsers(id));
    }, [id, dispatch]);

    const handleOpenTaskModal = (title1) => {
        setTaskModalTitle(title1);
        setIsTaskModalOpen(true);
    };

    const handleOpenCommentModal = (title1) => {
        setCommentModalTitle(title1);
        setIsCommentModalOpen(true);
    };

    const handleSuccess = () => {
        dispatch(getCourse(id)); 
    };

    const handleCloseTaskModal = () => {
        setIsTaskModalOpen(false);
    };

    const handleCloseCommentModal = () => {
        setIsCommentModalOpen(false);
    };

    return (
        <section className="min-h-screen">
            <Header />
            {
                user?.isInstructor ? 
                    (<div>
                        <div className="bg-blue-200 mt-20 bg-center p-6 md:p-12 lg:p-20 flex flex-col items-center justify-center mx-4 md:mx-20 lg:mx-40 lg:ml-60 md:mr-9 rounded-lg">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl text-center bg-blue-800 text-white p-3 rounded-lg shadow-md w-full mt-3">
                                <span className="mr-2">Course:</span>{courseById?.courseName}
                            </h1>
                            <h2 className="text-xl md:text-3xl lg:text-4xl text-center bg-blue-700 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Code:</span>{courseById?.code}
                            </h2>
                            <h2 className="text-lg md:text-2xl lg:text-3xl text-center bg-blue-600 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Instructor:</span>{courseById?.instructor}
                            </h2>
                            <h2 className="text-base md:text-xl lg:text-2xl text-center bg-blue-500 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Time:</span>{courseById?.time}
                            </h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-4 md:space-y-0 md:space-x-8 border-b-2 border-blue-400 pb-2">
                            <button 
                                className={`w-48 rounded-lg shadow-md p-3 ${activeSection === 'classwork' ? 'bg-blue-800' : 'bg-blue-600'} text-white border-b-4 border-blue-800`}
                                onClick={() => setActiveSection('classwork')}
                            >
                                Classwork
                            </button>
                            <button 
                                className={`w-48 rounded-lg shadow-md p-3 ${activeSection === 'people' ? 'bg-blue-800' : 'bg-blue-600'} text-white border-b-4 border-blue-800`}
                                onClick={() => setActiveSection('people')}
                            >
                                People
                            </button>
                        </div>

                        <div className="mt-8 p-4">
                            {activeSection === 'classwork' && (
                                <div>
                                    <TasksAndComments id={id}/>
                                </div>
                            )}
                            {activeSection === 'people' && (
                                <div className="lg:ml-40 md:ml-20 sm:ml-0">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Profile Photo</th>
                                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseUsers?.map(user => (
                                                <tr key={user._id}>
                                                    <td className="py-2 px-4 border-b border-gray-300">
                                                        <img 
                                                            src={user?.profilePhoto?.url} 
                                                            alt={`${user?.username}'s profile`} 
                                                            className="h-10 w-10 rounded-full object-cover" 
                                                        />
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-300 uppercase">
                                                        {user.username}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                        <div className="flex flex-row mt-24 lg:ml-96 md:ml-25 sm:ml-60 p-4">
                            <button 
                                className="w-48 rounded-lg shadow-md p-3 text-blue-700 font-bold lg:mr-72 md:mr-2 sm:mr-2 border-b-4 border-blue-800"
                                onClick={() => handleOpenTaskModal('Task')}
                            >
                                Add Task
                            </button>
                            <button 
                                className="w-48 rounded-lg shadow-md p-3 text-blue-700 font-bold border-b-4 border-blue-800"
                                onClick={() => handleOpenCommentModal('Comment')}
                            >
                                Add Comment
                            </button>
                        </div>

                        <TaskModal 
                            isOpen={isTaskModalOpen} 
                            onClose={handleCloseTaskModal} 
                            title1={`Add ${TaskmodalTitle}`} 
                            onsuccess={handleSuccess}
                            id={id}
                        />

                        <CommentModal 
                            isOpen={isCommentModalOpen} 
                            onClose={handleCloseCommentModal} 
                            title1={`Add ${CommentmodalTitle}`} 
                            onsuccess={handleSuccess}
                            id={id}
                        />
                    </div>)
                    :
                    (<div>
                        <div className="bg-blue-200 mt-20 bg-center p-6 md:p-12 lg:p-20 flex flex-col items-center justify-center mx-4 md:mx-20 lg:mx-40 lg:ml-60 md:mr-9 rounded-lg">
                            <h1 className="text-2xl md:text-4xl lg:text-5xl text-center bg-blue-800 text-white p-3 rounded-lg shadow-md w-full mt-3">
                                <span className="mr-2">Course:</span>{courseById?.courseName}
                            </h1>
                            <h2 className="text-xl md:text-3xl lg:text-4xl text-center bg-blue-700 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Code:</span>{courseById?.code}
                            </h2>
                            <h2 className="text-lg md:text-2xl lg:text-3xl text-center bg-blue-600 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Instructor:</span>{courseById?.instructor}
                            </h2>
                            <h2 className="text-base md:text-xl lg:text-2xl text-center bg-blue-500 text-white p-3 rounded-lg shadow-md w-full mt-3">
                            <span className="mr-2">Time:</span>{courseById?.time}
                            </h2>
                        </div>
                        <div className="flex flex-col md:flex-row items-center justify-center mt-8 space-y-4 md:space-y-0 md:space-x-8 border-b-2 border-blue-400 pb-2">
                            <button 
                                className={`w-48 rounded-lg shadow-md p-3 ${activeSection === 'classwork' ? 'bg-blue-800' : 'bg-blue-600'} text-white border-b-4 border-blue-800`}
                                onClick={() => setActiveSection('classwork')}
                            >
                                Classwork
                            </button>
                            <button 
                                className={`w-48 rounded-lg shadow-md p-3 ${activeSection === 'people' ? 'bg-blue-800' : 'bg-blue-600'} text-white border-b-4 border-blue-800`}
                                onClick={() => setActiveSection('people')}
                            >
                                People
                            </button>
                        </div>

                        <div className="mt-8 p-4">
                            {activeSection === 'classwork' && (
                                <div>
                                    <TasksAndComments id={id}/>
                                </div>
                            )}
                            {activeSection === 'people' && (
                                <div className="lg:ml-40 md:ml-20 sm:ml-0">
                                    <table className="min-w-full bg-white border border-gray-300">
                                        <thead>
                                            <tr>
                                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Profile Photo</th>
                                                <th className="py-2 px-4 border-b border-gray-300 text-left text-blue-600">Username</th>
                                            </tr>
                                        </thead>
                                        <tbody>
                                            {courseUsers?.map(user => (
                                                <tr key={user._id}>
                                                    <td className="py-2 px-4 border-b border-gray-300">
                                                        <img 
                                                            src={user?.profilePhoto?.url} 
                                                            alt={`${user?.username}'s profile`} 
                                                            className="h-10 w-10 rounded-full object-cover" 
                                                        />
                                                    </td>
                                                    <td className="py-2 px-4 border-b border-gray-300 uppercase">
                                                        {user.username}
                                                    </td>
                                                </tr>
                                            ))}
                                        </tbody>
                                    </table>
                                </div>
                            )}
                        </div>

                    </div>)
            }
        </section>
    );
};

export default CoursePage;
