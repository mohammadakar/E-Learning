import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../redux/ApiCalls/CourseApiCall";
import { Link, useParams } from "react-router-dom";
import Header from "../Header";

const ViewAssignments = () => {
    const { courseById } = useSelector(state => state.course);
    const { id } = useParams();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const tasksPerPage = 5; 

    useEffect(() => {
        dispatch(getCourse(id));
    }, [dispatch, id]);

    const indexOfLastTask = currentPage * tasksPerPage;
    const indexOfFirstTask = indexOfLastTask - tasksPerPage;
    const currentTasks = courseById?.tasks.slice(indexOfFirstTask, indexOfLastTask);

    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalAssignments = courseById?.tasks.length || 0;
    const totalPages = Math.ceil(totalAssignments / tasksPerPage);

    return (
        <div>
            <Header />
            <div className="flex-grow ">
                {currentTasks && currentTasks.length ? (
                    <div className="ml-4 lg:ml-40 lg:mt-20 md:ml-32 md:mt-16 lg:w-full md:w-96 sm:w-52 mt-24">
                        {currentTasks.map(task => (
                            <div key={task._id} className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3 bg-gray-300 rounded p-3 mb-2">
                                <h2 className="font-bold text-xl text-blue-700 mb-2">{task.title}</h2>
                                <Link
                                    to={`/viewtaskassignments/${id}/${task._id}`}
                                    className="text-blue-500 hover:underline bg-blue-200 rounded p-3 w-40"
                                >
                                    View Assignments
                                </Link>
                            </div>
                        ))}
                    </div>
                ) : (
                    
                    <p className="text-center text-gray-500 mt-72">No Tasks found</p>
                    
                )}
            </div>

            {totalPages > 1 && (
                <div className="flex justify-center items-center mt-auto pb-6">
                    <button 
                        onClick={() => paginate(currentPage - 1)} 
                        disabled={currentPage === 1}
                        className="px-6 py-2 mx-2 w-28 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        Previous
                    </button>
                    {[...Array(totalPages)].map((_, i) => (
                        <button 
                            key={i} 
                            onClick={() => paginate(i + 1)} 
                            className={`px-4 py-2 mx-1 ${currentPage === i + 1 ? 'bg-blue-700' : 'bg-blue-500'} text-white rounded`}
                        >
                            {i + 1}
                        </button>
                    ))}
                    <button 
                        onClick={() => paginate(currentPage + 1)} 
                        disabled={currentPage === totalPages}
                        className="px-6 py-2 mx-2 w-28 bg-blue-500 text-white rounded disabled:bg-gray-400"
                    >
                        Next
                    </button>
                </div>
            )}
        </div>
    );
};

export default ViewAssignments;
