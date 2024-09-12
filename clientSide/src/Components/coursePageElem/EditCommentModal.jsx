import { useDispatch } from "react-redux";
import { editComment } from "../../redux/ApiCalls/CourseApiCall";
import { useState } from "react";
import { toast } from "react-toastify";

const EditCommentModal = ({ isOpen, onClose, title1, onsuccess, courseId, commentId, comment }) => {
    const dispatch = useDispatch();
    const [content, setContent] = useState(comment.content);

    const handleAddContent = async (e) => {
        e.preventDefault();
        if (content.trim() === "") return toast.error("Comment content is required!");

        try {
            await dispatch(editComment(courseId, commentId, { content }));
            onsuccess();
            onClose();
        } catch (error) {
            toast.error("Failed to edit comment. Please try again.");
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
                    <button className="bg-gray-500 text-white px-4 py-2 rounded-lg mr-2" onClick={onClose}>Cancel</button>
                    <button className="bg-blue-600 text-white px-4 py-2 rounded-lg" onClick={handleAddContent}>Edit Comment</button>
                </div>
            </div>
        </div>
    );
};


export default EditCommentModal;
