import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { deleteComment, deleteTask, getCourse } from "../../redux/ApiCalls/CourseApiCall";
import './TasksAndComments.css'; // Assuming you're using a CSS file
import EditCommentModal from "./EditCommentModal";
import EditTaskModal from "./EditTaskModal";
import { Link } from "react-router-dom";
import swal from "sweetalert";

const TasksAndComments = ({ id }) => {
    const { courseById } = useSelector(state => state.course);
    const {user} = useSelector(state => state.auth);
    const dispatch = useDispatch();
    const courseId=id;
    
    useEffect(() => {
        dispatch(getCourse(id));
    }, [dispatch, id]);
    const [isEditTaskModalOpen, setIsEditTaskModalOpen] = useState(false);
    const [EditTaskmodalTitle, setEditTaskModalTitle] = useState('');

    const [isEditCommentModalOpen, setIsEditCommentModalOpen] = useState(false);
    const [EditCommentmodalTitle, setEditCommentModalTitle] = useState('');

    const handleOpenEditTaskModal = (title1) => {
        setEditTaskModalTitle(title1);
        setIsEditTaskModalOpen(true);
    };

    const handleOpenEditCommentModal = (title1) => {
        setEditCommentModalTitle(title1);
        setIsEditCommentModalOpen(true);
    };

    const handleSuccess = () => {
        dispatch(getCourse(id)); 
    };

    const handleCloseTaskModal = () => {
        setIsEditTaskModalOpen(false);
    };

    const handleCloseCommentModal = () => {
        setIsEditCommentModalOpen(false);
    };

    const handleDeleteTask = async (courseId,taskId) =>{
        swal({
            title: "Are you sure?",
            text: "You want to delete this Task?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (isOk) => {
            if (isOk){
                await dispatch(deleteTask(courseId,taskId));
                await dispatch(getCourse(id));
            }
        });
        
    }

    const handleDeleteComment = async (courseId,commentId) =>{
        swal({
            title: "Are you sure?",
            text: "You want to delete this comment?",
            icon: "warning",
            buttons: true,
            dangerMode: true,
        }).then(async (isOk) => {
            if (isOk){
                await dispatch(deleteComment(courseId,commentId));
                await dispatch(getCourse(id));
            }
        });
        
    }

    
    const sortedTasks = [...(courseById?.tasks || [])].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));
    const sortedComments = [...(courseById?.comments || [])].sort((a, b) => new Date(b.addedAt) - new Date(a.addedAt));

    return (
        <div>
            {user?.isInstructor ? 
            <>
                <div className="tasks-comments-container lg:ml-40 md: sm:ml-24">
                <h1 className="text-center p-1 mb-2 bg-blue-200 rounded ">Tasks</h1>
                {sortedTasks.map((task) => (
                    <div className="task-container" key={task._id}>
                        <div className="task-header">
                            <p className="bg-blue-500 p-2 rounded">{task.title}</p>
                            <span className="text-gray-400">{new Date(task.addedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-semibold">{task.description}</p>
                        <p className="p-1 ml">DueDate: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <div className="flex flex-row">
                            <button 
                                onClick={()=>handleOpenEditTaskModal("Task")}
                                className="w-20 rounded bg-white shadow-md p-3 shadow-blue-500 bg-center text-blue-600 mr-2"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={()=>handleDeleteTask(courseId,task._id)}
                                className="w-20 rounded bg-white shadow-md p-3 shadow-red-500 bg-center text-blue-600"
                            >
                                Delete
                            </button>
                        </div>
                        <EditTaskModal 
                            isOpen={isEditTaskModalOpen} 
                            onClose={handleCloseTaskModal} 
                            title1={`Edit ${EditTaskmodalTitle}`} 
                            onsuccess={handleSuccess}
                            courseId={courseId}
                            taskId={task._id}
                            task={task}
                        />
                    </div>
                    
                ))}
                <h1 className="text-center p-1 mb-2 mt-2 bg-blue-200 rounded ">Comments</h1>
                {sortedComments.map((comment) => (
                    <div className="comment-container" key={comment._id}>
                        <div className="comment-header">
                            <p className="bg-blue-500 p-2 rounded">Class comment:</p>
                            <span className="text-gray-400">{new Date(comment.addedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-semibold">{comment.content}</p>
                        <div className="flex flex-row mt-2">
                            <button
                                onClick={()=>handleOpenEditCommentModal("Comment")} 
                                className="w-20 rounded bg-white shadow-md p-3 shadow-blue-500 bg-center text-blue-600 mr-2"
                            >
                                Edit
                            </button>
                            <button 
                                onClick={()=>handleDeleteComment(courseId,comment._id)}
                                className="w-20 rounded bg-white shadow-md p-3 shadow-red-500 bg-center text-blue-600"
                            >
                                Delete
                            </button>
                        </div>
                        <EditCommentModal 
                            isOpen={isEditCommentModalOpen} 
                            onClose={handleCloseCommentModal} 
                            title1={`Edit ${EditCommentmodalTitle}`} 
                            onsuccess={handleSuccess}
                            courseId={id}
                            commentId={comment._id}
                            comment={comment}
                        />
                    </div>
                ))}
                </div>
            </> 
            : 
            <>
                <div className="tasks-comments-container lg:ml-40 md: sm:ml-24">
                <h1 className="text-center p-1 mb-2 bg-blue-200 rounded ">Tasks</h1>
                {sortedTasks.map((task) => (
                    <div className="task-container" key={task._id}>
                        <div className="task-header">
                            <p className="bg-blue-500 p-2 rounded">{task.title}</p>
                            <span className="text-gray-400">{new Date(task.addedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-semibold">{task.description}</p>
                        <p className="p-1 ml">DueDate: {new Date(task.dueDate).toLocaleDateString()}</p>
                        <Link to={`/coursepage/${courseId}/viewinstructions/${task._id}`}><button className="button1 rounded bg-white shadow-md p-3 shadow-blue-500 bg-center text-blue-600">View instructions</button></Link>
                    </div>
                ))}
                <h1 className="text-center p-1 mb-2 mt-2 bg-blue-200 rounded ">Comments</h1>
                {sortedComments.map((comment) => (
                    <div className="comment-container" key={comment._id}>
                        <div className="comment-header">
                            <p className="bg-blue-500 p-2 rounded">Class comment:</p>
                            <span className="text-gray-400">{new Date(comment.addedAt).toLocaleDateString()}</span>
                        </div>
                        <p className="font-semibold">{comment.content}</p>
                    </div>
                ))}
                </div>
            </>
            }
        </div>
    );
};

export default TasksAndComments;
