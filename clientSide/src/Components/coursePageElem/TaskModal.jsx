import { useDispatch } from "react-redux";
import { addTask } from "../../redux/ApiCalls/CourseApiCall";
import { useState } from "react";
import { toast } from "react-toastify";

const TaskModal = ({ isOpen, onClose, title1, onsuccess, id }) => {
    const dispatch = useDispatch();
    
    const [title, setTitle] = useState("");
    const [description, setDescription] = useState("");
    const [dueDate, setDueDate] = useState("");

    const handleClose = () => {
        setTitle("");
        setDescription("");
        setDueDate("");
        onClose();
    };
    
    const handleAddTask = async (e) => {
        e.preventDefault();
        
        if (title.trim() === "") return toast.error("Task title is required!");
        if (description.trim() === "") return toast.error("Task description is required!");
        if (dueDate.trim() === "") return toast.error("Task due date is required!");
        try {
            await dispatch(addTask(id, { title, description, dueDate }));
            onsuccess(); 
            handleClose();
        } catch (error) {
            toast.error("Failed to add task. Please try again.");
        }
    };

    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-lg md:w-1/2 lg:w-1/3 mx-4">
                <h2 className="text-2xl font-bold mb-4">{title1}</h2>
                <input 
                    type="text" 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
                    placeholder="Task title"
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                />
                
                <textarea 
                    className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4" 
                    placeholder="Task description..."
                    value={description}
                    onChange={(e) => setDescription(e.target.value)}
                />
                <input 
                    type="date" 
                    className="w-full p-2 border border-gray-300 rounded-lg mb-4" 
                    value={dueDate}
                    onChange={(e) => setDueDate(e.target.value)}
                />
                
                <div className="flex justify-end mt-4">
                    <button 
                        className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2"
                        onClick={handleClose}
                    >
                        Cancel
                    </button>
                    <button 
                        className="bg-blue-600 text-white px-4 py-2 rounded-lg"
                        onClick={handleAddTask}
                    >
                        Add Task
                    </button>
                </div>
            </div>
        </div>
    );
};


export default TaskModal;
