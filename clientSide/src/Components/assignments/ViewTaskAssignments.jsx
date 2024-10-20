import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getCourse } from "../../redux/ApiCalls/CourseApiCall";
import { useParams } from "react-router-dom";
import Header from "../Header";

const ViewTaskAssignments = () => {
    const { courseById } = useSelector(state => state.course);
    const { id, taskId } = useParams();
    const dispatch = useDispatch();

    const [currentPage, setCurrentPage] = useState(1);
    const assignmentsPerPage = 9;

    useEffect(() => {
        dispatch(getCourse(id));
    }, [dispatch, id]);

    
    const filteredAssignments = courseById?.assignments.filter(assignment => assignment.taskId === taskId) || [];

    
    const indexOfLastAssignment = currentPage * assignmentsPerPage;
    const indexOfFirstAssignment = indexOfLastAssignment - assignmentsPerPage;
    const currentAssignments = filteredAssignments.slice(indexOfFirstAssignment, indexOfLastAssignment);
    
    const paginate = (pageNumber) => setCurrentPage(pageNumber);

    const totalAssignments = filteredAssignments.length;
    const totalPages = Math.ceil(totalAssignments / assignmentsPerPage);

    return ( 
        <div className="min-h-screen flex flex-col">
            <Header />
            <div className="flex-grow">
                <div className="ml-4 mt-10 lg:ml-40 lg:mt-20 md:ml-32 md:mt-16">
                    <div className="grid gap-4 sm:grid-cols-1 md:grid-cols-2 lg:grid-cols-3">
                        {currentAssignments.length ? (
                            currentAssignments.map((assignment) => (
                                <div 
                                    key={assignment._id} 
                                    className="bg-gray-100 rounded p-3 shadow shadow-black mb-4 w-full sm:w-full md:w-auto lg:w-60"
                                >
                                    <h1 className="font-bold text-lg sm:text-base">{assignment.assignment}</h1>
                                    <p className="uppercase mt-1 text-sm text-gray-700">{assignment.username}</p>
                                    <a
                                        href={`${assignment?.file}`} 
                                        target="_blank" 
                                        rel="noopener noreferrer"
                                        className="text-blue-500 underline mt-3 block"
                                    >
                                        View File
                                    </a>
                                </div>
                            ))
                        ) : (
                            <p className="text-center text-gray-500 mt-20">No assignments for this task</p>
                        )}
                    </div>
                </div>
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

export default ViewTaskAssignments;
