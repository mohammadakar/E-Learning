import { useDispatch } from "react-redux";
import { addComment } from "../../redux/ApiCalls/CourseApiCall";
import { useState } from "react";
import { toast } from "react-toastify";

const CommentModal = ({ isOpen, onClose, title1, onsuccess, id }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState("");

    const handleClose = () => {
        setContent("");
        onClose();
    };

    const handleAddContent = async (e) => {
        e.preventDefault();
        if (content.trim() === "") return toast.error("Comment content is required!");

        try {
            await dispatch(addComment(id, { content }));
            onsuccess();
            handleClose();
        } catch (error) {
            toast.error("Failed to add comment. Please try again.");
        }
    };

    

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 bg-gray-600 bg-opacity-50 flex justify-center items-center">
            <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md md:max-w-1/2 mx-4 md:mx-0">
                <h2 className="text-2xl font-bold mb-4">{title1}</h2>
                <textarea 
                    className="w-full h-32 p-2 border border-gray-300 rounded-lg mb-4" 
                    placeholder={`Add your ${title1.toLowerCase()}...`}
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                />
                <div className="flex justify-end mt-4">
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={handleClose}>Cancel</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleAddContent}>Add Comment</button>
                </div>
            </div>
        </div>
    );
};


export default CommentModal;
