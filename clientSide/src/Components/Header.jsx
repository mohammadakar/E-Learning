import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { logout } from '../redux/ApiCalls/AuthApiCall';
import { Link } from "react-router-dom";
import homeIcon from "../icons/home.png";
import usersIcon from "../icons/usersicon.jpg";
import registerIcon from "../icons/register.png";
import courseIcon from "../icons/course.png";
import userIcon from "../icons/user.png";
import adminIcon from "../icons/Admin.png";
import assignmentIcon from "../icons/assignments.jpg"
import { getAllCourses } from '../redux/ApiCalls/CourseApiCall';

const Header = () => {
    const user = JSON.parse(localStorage.getItem("userinfo"));
    const [isDropdownOpen, setIsDropdownOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const { userCourses } = useSelector(state => state.user);
    const {courses}=useSelector(state => state.course)
    const dispatch = useDispatch();
    useEffect(()=>{
        dispatch(getAllCourses())
    },[dispatch])
    

    const handleProfileClick = () => {
        setIsDropdownOpen(!isDropdownOpen);
    };

    const handleLogout = () => {
        dispatch(logout());
    };

    const handleSidebarToggle = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <header className='bg-white h-14 shadow-md fixed top-0 left-0 right-0 z-20'>
            <div className="flex justify-between items-center max-w-6xl mx-auto p-3">
                <div className="flex items-center">
                    <button
                        onClick={handleSidebarToggle}
                        className="sm:hidden text-blue-500 text-3xl"
                    >
                        &#9776;
                    </button>
                    <h1 className='font-bold text-sm sm:text-xl flex flex-wrap ml-4 sm:ml-0'>
                        <span className='text-blue-500'>E</span>
                        <span className="text-blue-400">-</span>
                        <span className='text-blue-300'>Learning</span>
                    </h1>
                </div>
                <div className="relative">
                    <button onClick={handleProfileClick}>
                        <img src={user?.profilePhoto?.url} alt="profile" className="rounded-full h-10 w-10" />
                    </button>
                    {isDropdownOpen && (
                        <div className="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg z-10">
                            <p className='block px-4 py-2 text-sm text-gray-700 font-bold w-full uppercase text-center bg-blue-400 cursor-none'>{user?.username}</p>
                            <Link 
                                to='/profile'
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Update Your Profile
                            </Link>
                            <button 
                                onClick={handleLogout}
                                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 w-full text-left"
                            >
                                Logout
                            </button>
                        </div>
                    )}
                </div>
            </div>

            {user?.isAdmin ? 
                <div
                className={`fixed top-0 left-0 h-full mt-14 bg-blue-400 shadow-md text-white transition-all duration-300 ${
                    isSidebarOpen ? 'w-1/5' : 'w-1/12'
                } hidden sm:block`}
            >
                <div className="p-4">
                    {isSidebarOpen ? 
                    <div className='flex flex-col space-y-7'>
                        <div className='flex flex-row items-center'>
                            <img src={homeIcon} alt="home" className='w-6 h-6'/>
                            <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={adminIcon} alt="admin" className='w-6 h-6'/>
                            <Link to="/admindashboard" className="ml-4 hover:text-blue-950">Admin-Dashboard</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={userIcon} alt="admin" className='w-6 h-6'/>
                            <Link to="/adduser" className="ml-4 hover:text-blue-950">Add user</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={usersIcon} alt="admin" className='w-6 h-6'/>
                            <Link to="/users" className="ml-4 hover:text-blue-950">Users</Link>
                        </div>
                    </div>
                    :
                    <div className='flex flex-col space-y-7 items-center'>
                        <img src={homeIcon} alt="home" className='w-6 h-6'/>
                        <img src={adminIcon} alt="admin" className='w-6 h-6'/>
                        <img src={userIcon} alt="admin" className='w-6 h-6'/>
                        <img src={usersIcon} alt="admin" className='w-6 h-6'/>
                    </div>
                    }
                    <button
                        onClick={handleSidebarToggle}
                        className="text-white mt-4"
                    >
                        {isSidebarOpen ? "<--" : "-->"}
                    </button>
                </div>
            </div>
            :
            user?.isInstructor ? 
                <div
                className={`fixed top-0 left-0 h-full mt-14 bg-blue-400 shadow-md text-white transition-all duration-300 ${
                    isSidebarOpen ? 'w-1/5' : 'w-1/12'
                } hidden sm:block`}
                >
                <div className="p-4">
                    {isSidebarOpen ? 
                    <div className='flex flex-col space-y-7'>
                        <div className='flex flex-row items-center'>
                            <img src={homeIcon} alt="home" className='w-6 h-6'/>
                            <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={assignmentIcon} alt="home" className='w-6 h-6'/>
                            <Link to="/assignments" className="ml-4 hover:text-blue-950">Assignments</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                            <p className="ml-4 cursor-none">Your Courses:</p>
                        </div>
                        {courses && courses.length > 0 && (courses.map(course=>(
                            <div key={course._id}>
                                {user?.username === course?.instructor ?<button  className='rounded bg-blue-600 p-3 w-full'>{course.courseName}</button> : <></>}
                            </div>
                            )))
                        }
                    </div>
                    :
                    <div className='flex flex-col space-y-7 items-center'>
                        <img src={homeIcon} alt="home" className='w-6 h-6'/> 
                        <img src={assignmentIcon} alt="home" className='w-6 h-6'/>
                        <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                    </div>
                    }
                    <button
                        onClick={handleSidebarToggle}
                        className="text-white mt-4"
                    >
                        {isSidebarOpen ? "<--" : "-->"}
                    </button>
                </div>
            </div>

            :
            <div
                className={`fixed top-0 left-0 h-full mt-14 bg-blue-400 shadow-md text-white transition-all duration-300 ${
                    isSidebarOpen ? 'w-1/5' : 'w-1/12'
                } hidden sm:block`}
            >
                <div className="p-4">
                    {isSidebarOpen ? 
                    <div className='flex flex-col space-y-7'>
                        <div className='flex flex-row items-center'>
                            <img src={homeIcon} alt="home" className='w-6 h-6'/>
                            <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={registerIcon} alt="register" className='w-6 h-6'/> 
                            <Link to="/registernewcourse" className="ml-4 hover:text-blue-950">Register New Courses</Link>
                        </div>
                        <div className='flex flex-row items-center'>
                            <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                            <p className="ml-4 cursor-none">Your Courses:</p>
                        </div>
                        {userCourses && userCourses.length > 0 && (userCourses.map(course=>(
                            <div key={course._id}>
                                <Link><button className='rounded bg-blue-600 p-3 w-full'>{course.courseName}</button></Link>
                            </div>
                            )))
                        }
                    </div>
                    :
                    <div className='flex flex-col space-y-7 items-center'>
                        <img src={homeIcon} alt="home" className='w-6 h-6'/>
                        <img src={registerIcon} alt="register" className='w-6 h-6'/> 
                        <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                    </div>
                    }
                    <button
                        onClick={handleSidebarToggle}
                        className="text-white mt-4"
                    >
                        {isSidebarOpen ? "<--" : "-->"}
                    </button>
                </div>
            </div>
            }

            {user?.isAdmin ? 
            <div>
            {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" onClick={handleSidebarToggle}>
                    <div
                        className={`fixed top-0 left-0 h-full bg-blue-400 shadow-md text-white w-3/4 max-w-xs transition-transform duration-300 transform ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <button
                                onClick={handleSidebarToggle}
                                className="text-white mb-4"
                            >
                                X
                            </button>
                            <div className="flex flex-col">
                                <div className='flex flex-col space-y-7'>
                                    <div className='flex flex-row items-center'>
                                    <img src={homeIcon} alt="home" className='w-6 h-6'/>
                                    <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <img src={adminIcon} alt="admin" className='w-6 h-6'/>
                                        <Link to="/admindashboard" className="ml-4 hover:text-blue-950">Admin-Dashboard</Link>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <img src={userIcon} alt="admin" className='w-6 h-6'/>
                                        <Link to="/adduser" className="ml-4 hover:text-blue-950">Add user</Link>
                                    </div>
                                    <div className='flex flex-row items-center'>
                                        <img src={usersIcon} alt="admin" className='w-6 h-6'/>
                                        <Link to="/users" className="ml-4 hover:text-blue-950">Users</Link>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
            </div>
            :
            user?.isInstructor ? 
                <div>
                {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" onClick={handleSidebarToggle}>
                    <div
                        className={`fixed top-0 left-0 h-full bg-blue-400 shadow-md text-white w-1/2 max-w-xs transition-transform duration-300 transform ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <button
                                onClick={handleSidebarToggle}
                                className="text-white mb-4"
                            >
                                X
                            </button>
                            <div className="flex flex-col">
                            <div className='flex flex-col space-y-7'>
                                <div className='flex flex-row items-center'>
                                    <img src={homeIcon} alt="home" className='w-6 h-6'/>
                                    <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <img src={assignmentIcon} alt="home" className='w-6 h-6'/>
                                    <Link to="/assignments" className="ml-4 hover:text-blue-950">Assignments</Link>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                                    <p className="ml-4 cursor-none">Your Courses:</p>
                                </div>
                                {userCourses && userCourses.length > 0 && (userCourses.map(course=>(
                                    <div key={course._id}>
                                        <Link to="/coursepage" className='rounded bg-blue-600 p-3 w-full' >{course.courseName}</Link>
                                    </div>
                                    )))
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
                </div>
            : 
            <div>
                {isSidebarOpen && (
                <div className="fixed inset-0 bg-black bg-opacity-50 z-30 sm:hidden" onClick={handleSidebarToggle}>
                    <div
                        className={`fixed top-0 left-0 h-full bg-blue-400 shadow-md text-white w-1/2 max-w-xs transition-transform duration-300 transform ${
                            isSidebarOpen ? 'translate-x-0' : '-translate-x-full'
                        }`}
                        onClick={(e) => e.stopPropagation()}
                    >
                        <div className="p-4">
                            <button
                                onClick={handleSidebarToggle}
                                className="text-white mb-4"
                            >
                                X
                            </button>
                            <div className="flex flex-col">
                            <div className='flex flex-col space-y-7'>
                                <div className='flex flex-row items-center'>
                                    <img src={homeIcon} alt="home" className='w-6 h-6'/>
                                    <Link to="/home" className="ml-4 hover:text-blue-950">Home</Link>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <img src={registerIcon} alt="register" className='w-6 h-6'/> 
                                    <Link to="/registernewcourse" className="ml-4 hover:text-blue-950">Register New Courses</Link>
                                </div>
                                <div className='flex flex-row items-center'>
                                    <img src={courseIcon} alt="courses" className='w-6 h-6'/>
                                    <p className="ml-4 cursor-none">Your Courses:</p>
                                </div>
                                {userCourses && userCourses.length > 0 && (userCourses.map(course=>(
                                    <div key={course._id}>
                                        <Link to="/coursepage" className='rounded bg-blue-600 p-3 w-full' >{course.courseName}</Link>
                                    </div>
                                    )))
                                }
                            </div>
                            </div>
                        </div>
                    </div>
                </div>
                )}
            </div>
            }
            
        </header>
    );
};

export default Header;
