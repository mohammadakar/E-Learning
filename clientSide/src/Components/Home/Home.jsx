import { useDispatch, useSelector } from "react-redux";
import Header from "../Header";
import { useEffect, useState } from "react";
import { dropCourse, getUserCourses } from "../../redux/ApiCalls/UserApiCall";
import './Home.css'; 
import { Link } from "react-router-dom";
import swal from "sweetalert";
import { deleteCourse, getAllCourses } from "../../redux/ApiCalls/CourseApiCall";

const Home = () => {
    const { user } = useSelector(state => state.auth);
    const { userCourses } = useSelector(state => state.user);
    const { courses } = useSelector(state => state.course);
    const dispatch = useDispatch();
    
    useEffect(()=>{
        dispatch(getAllCourses());
    },[dispatch])

    useEffect(() => {
        dispatch(getUserCourses());
    }, [dispatch]);


    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 9;

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses?.slice(indexOfFirstCourse, indexOfLastCourse) || [];

    const totalPages = Math.ceil(courses?.length / coursesPerPage) || 0;

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section>
            <Header />
            {user?.isAdmin ? (
                <div className="course-container">
                    <div className="flex-grow container mx-auto mt-10 px-4 py-5 ml-20">
                        {currentCourses.length > 0 ? (
                            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                                {currentCourses.map(course => (
                                    <div key={course._id} className="p-4 bg-white rounded-lg shadow-md">
                                        <form>
                                            <h3 className="text-xl font-semibold uppercase">{course.courseName}</h3>
                                            <p className="text-gray-700">Code: {course.code}</p>
                                            <p className="text-gray-700">Instructor: {course.instructor}</p>
                                            <p className="text-gray-700">Time: {course.time}</p>
                                            <div className="flex flex-row">
                                            <Link to={`/editcourse/${course._id}`}><button className="rounded bg-blue-400 p-2 mt-3">Edit Course</button></Link>
                                            <button className="rounded bg-red-400 p-2 mt-3 ml-10" onClick={(e)=>{
                                                e.preventDefault();
                                                swal({
                                                    title: "Are you sure?",
                                                    text: "You want to drop this course?",
                                                    icon: "warning",
                                                    buttons: true,
                                                    dangerMode: true,
                                                }).then((isOk) => {
                                                    if (isOk) {
                                                        dispatch(deleteCourse(course._id));
                                                    }
                                                });
                                            }}>Delete Course</button>
                                            </div>
                                        </form>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <p className="text-center">No courses founded</p>
                        )}
                    </div>
                    {totalPages > 1 && (
                        <div className="flex justify-center mt-8 mb-10">
                            <nav>
                                <ul className="inline-flex -space-x-px">
                                    {[...Array(totalPages).keys()].map(pageNumber => (
                                        <li key={pageNumber + 1}>
                                            <button
                                                onClick={() => paginate(pageNumber + 1)}
                                                className={`px-3 py-2 leading-tight ${
                                                    currentPage === pageNumber + 1
                                                        ? "bg-blue-500 text-white"
                                                        : "bg-white text-gray-500 hover:bg-gray-200"
                                                } border border-gray-300 rounded-lg mx-1`}
                                            >
                                                {pageNumber + 1}
                                            </button>
                                        </li>
                                    ))}
                                </ul>
                            </nav>
                        </div>
                    )}
                </div>
            ) 
            : user?.isInstructor ?
            (
                <div className="course-container">
                    {courses && courses.length ? (
                        courses.map(course => (
                            course?.instructor === user?.username ?
                                <div key={course._id} className="course-card mt-10">
                                    <img src={course.cover.url} alt="cover" className="course-cover" />
                                    <div className="course-info">
                                        <h2 className="course-title uppercase">{course.courseName}</h2>
                                        <p className="course-code">{course.code}</p>
                                        <Link to={`/coursepage/${course._id}`}><button className="view-course-btn">View Course</button></Link>
                                    </div>
                                </div>
                                :
                                <></>
                        ))
                    ) : (
                        <p className="text-center">No courses founded</p>
                    )}
                </div>
            )
            :
            (
                <div className="course-container">
                    {userCourses && userCourses.length ? (
                        userCourses.map(course => (
                            <div key={course._id} className="course-card mt-10">
                                <img src={course.cover.url} alt="cover" className="course-cover" />
                                <div className="course-info">
                                    <h2 className="course-title uppercase">{course.courseName}</h2>
                                    <p className="course-code">{course.code}</p>
                                    <p className="course-instructor">{course.instructor}</p>
                                    <Link to={`/coursepage/${course._id}`}><button className="view-course-btn">View Course</button></Link>
                                    <button className="drop-course-btn" onClick={(e) => {
                                        e.preventDefault();
                                        swal({
                                            title: "Are you sure?",
                                            text: "You want to drop this course?",
                                            icon: "warning",
                                            buttons: true,
                                            dangerMode: true,
                                        }).then((isOk) => {
                                            if (isOk) {
                                                dispatch(dropCourse(course._id));
                                            }
                                        });
                                    }}>Drop Course</button>
                                </div>
                            </div>
                        ))
                    ) : (
                        <p className="text-center">No courses founded</p>
                    )}
                </div>
            )}
        </section>
    );
};

export default Home;
