import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { editCourse, getCourse } from "../../redux/ApiCalls/CourseApiCall";
import { getInstructors } from "../../redux/ApiCalls/UserApiCall";
import { useParams } from "react-router-dom";

const EditCourse = () => {
    
    const { instructors } = useSelector(state => state.user);
    const { courseById } = useSelector(state => state.course);
    const { id } = useParams();
    const dispatch = useDispatch();
    
    const [courseName, setCourseName] = useState("");
    const [code, setCode] = useState("");
    const [instructor, setInstructor] = useState("");
    const [time, setTime] = useState("");

    useEffect(() => {
        dispatch(getCourse(id));
    }, [id, dispatch]);

    useEffect(() => {
        if (courseById) {
            setCourseName(courseById.courseName || "");
            setCode(courseById.code || "");
            setInstructor(courseById.instructor || "");
            setTime(courseById.time || "");
        }
    }, [courseById]);

    useEffect(() => {
        dispatch(getInstructors());
    }, [dispatch]);

    const formSubmitHandler = (e) => {
        e.preventDefault();
        dispatch(editCourse(id,{ courseName, code, instructor, time }));
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Edit course:</h1>
            <form onSubmit={formSubmitHandler} className="w-full max-w-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Course name:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="courseName"
                            value={courseName}
                            onChange={(e) => setCourseName(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Code:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="code"
                            value={code}
                            onChange={(e) => setCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Instructor:</h2>
                        <select 
                            onChange={(e) => setInstructor(e.target.value)} 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            value={instructor}
                        >
                            {instructors && instructors.length > 0 && instructors.map(instructor => (
                                <option key={instructor._id} value={instructor.username}>
                                    {instructor.username}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Time:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            value={time}
                            id="time"
                            onChange={(e) => setTime(e.target.value)}
                            placeholder="MW or TTH with hour"
                        />
                    </div>
                </div>
                <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Edit Course
                </button>
            </form>
        </div>
    );
}

export default EditCourse;
