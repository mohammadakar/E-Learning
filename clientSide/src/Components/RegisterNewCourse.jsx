import { useDispatch, useSelector } from "react-redux";
import Header from "./Header";
import { useEffect, useState } from "react";
import { getAllCourses } from "../redux/ApiCalls/CourseApiCall";
import { registerCourse } from "../redux/ApiCalls/UserApiCall";

const RegisterNewCourse = () => {
    const { courses } = useSelector(state => state.course);
    const dispatch = useDispatch();
    const {user} = useSelector(state => state.auth)
    

    const [currentPage, setCurrentPage] = useState(1);
    const coursesPerPage = 9;

    useEffect(() => {
        dispatch(getAllCourses());
    }, [dispatch]);

    const indexOfLastCourse = currentPage * coursesPerPage;
    const indexOfFirstCourse = indexOfLastCourse - coursesPerPage;
    const currentCourses = courses.slice(indexOfFirstCourse, indexOfLastCourse);

    const totalPages = Math.ceil(courses.length / coursesPerPage);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    return (
        <section className="min-h-screen flex flex-col bg-gray-100">
            <Header />
            <div className="flex-grow container lg:ml-40 md:ml-20 mx-auto mt-10 px-4 py-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                    {currentCourses.map(course => (
                        <div key={course._id}>
                            {user?.major === course?.major ? (
                                <div key={course._id} className="p-4 bg-white rounded-lg shadow-md">
                                <form onSubmit={(e) => {
                                    e.preventDefault();
                                    dispatch(registerCourse(course._id));}}>
                                <h3 className="text-xl font-semibold">{course.courseName}</h3>
                                <p className="text-gray-700">Code: {course.code}</p>
                                <p className="text-gray-700">Instructor: {course.instructor}</p>
                                <p className="text-gray-700">Time: {course.time}</p>
                                <button className="rounded bg-blue-400 p-2 mt-3">Register</button>
                                </form>
                                
                            </div>
                            )
                            :
                            <></>
                        }
                        </div>
                    ))}
                </div>
            </div>
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
        </section>
    );
}

export default RegisterNewCourse;
