import { useParams } from "react-router-dom";
import Header from "../Header";
import { useDispatch, useSelector } from "react-redux";
import { getTaskById, submitAssignment } from "../../redux/ApiCalls/CourseApiCall";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";
import { FaFilePdf } from "react-icons/fa";
import { ref, uploadBytesResumable, getDownloadURL, getStorage } from "firebase/storage";
import { app } from "../../firebase";

const ViewInstructions = () => {
    const { courseId, taskId } = useParams();
    const dispatch = useDispatch();
    const { taskById } = useSelector(state => state.course);
    const [file, setFile] = useState(null);
    const [isUploading, setIsUploading] = useState(false);

    useEffect(() => {
        dispatch(getTaskById(courseId, taskId));
    }, [dispatch, courseId, taskId]);

    const handleFileChange = (e) => {
        setFile(e.target.files[0]);
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        if (!file || !file.type.includes("pdf")) {
            toast.error("Please upload a valid PDF file.");
            return;
        }
        const storage = getStorage(app)
        const storageRef = ref(storage, `assignments/${courseId}/${taskId}/${file.name}`);
        const uploadTask = uploadBytesResumable(storageRef, file);
        setIsUploading(true);

        uploadTask.on(
            "state_changed",
            (snapshot) => {
                
            },
            (error) => {
                setIsUploading(false);
                toast.error("Error uploading file: " + error.message);
            },
            () => {
                getDownloadURL(uploadTask.snapshot.ref).then((filePath) => {
                    
                    dispatch(submitAssignment(courseId, filePath, taskId));
                    setFile(null); 
                    e.target.reset();
                    setIsUploading(false);
                });
            }
        );
    };

    return (
        <section className="flex flex-col lg:flex-row mt-20 ml-4 mr-4">
            <Header />
            <div className="container mx-auto px-4 mt-10 lg:mt-20">
                <div className="bg-white p-6 rounded-md shadow-md max-w-4xl mx-auto">
                    <h1 className="font-bold text-2xl mb-4 text-blue-700">{taskById?.title}</h1>
                    <p className="text-gray-700 mb-4">{taskById?.description}</p>
                </div>
            </div>
            <div className="sidebar w-full lg:w-1/4 bg-gray-100 p-4 mt-10 lg:mt-0 shadow-md">
                <h2 className="font-bold mb-4 text-blue-700">Submit Your Assignment</h2>
                <form onSubmit={handleSubmit} className="upload-form">
                    <label htmlFor="fileUpload" className="block mb-2 font-semibold text-gray-700">
                        Upload PDF:
                    </label>

                    {file && (
                        <div className="flex items-center justify-between border border-gray-300 p-2 rounded mb-4 bg-gray-50">
                            <span className="text-gray-700">{file.name}</span>
                            <FaFilePdf className="text-red-500 ml-2" />
                        </div>
                    )}

                    <div className="relative mb-4 mt-11">
                        <input
                            type="file"
                            id="fileUpload"
                            accept="application/pdf"
                            onChange={handleFileChange}
                            className="absolute inset-0 opacity-0 z-10 cursor-pointer"
                        />
                        <button
                            type="button"
                            className="bg-blue-500 text-white p-2 rounded w-full text-center cursor-pointer"
                        >
                            Choose File
                        </button>
                    </div>

                    <button
                        type="submit"
                        className="bg-blue-500 text-white p-2 rounded w-full"
                        disabled={isUploading} 
                    >
                        {isUploading ? "Uploading..." : "Submit Assignment"}
                    </button>
                </form>
            </div>
        </section>
    );
};

export default ViewInstructions;
