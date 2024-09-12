import { useState } from "react";
import { useDispatch } from "react-redux";
import { addCourse } from "../../redux/ApiCalls/CourseApiCall";

const AddCourse = ({instructors,majors}) => {
    
    const dispatch=useDispatch();
    const [courseName,setCoursename]=useState("");
    const [code,setCode]=useState("");
    const [instructor,setInstructor]=useState("");
    const [major,setMajor]=useState("");
    const [time,setTime]=useState("");
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        dispatch(addCourse({courseName,code,instructor,major,time}));
        setCoursename("");
        setCode("");
        setInstructor("");
        setMajor("");
        setTime("");
    }
    console.log(major);
    console.log(instructors);
    
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Add new course:</h1>
            <form onSubmit={formSubmitHandler} className="w-full max-w-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Course name:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="courseName"
                            value={courseName}
                            onChange={(e)=>setCoursename(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Code:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="code"
                            value={code}
                            onChange={(e)=>setCode(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Major:</h2>
                        <select onChange={(e)=>setMajor(e.target.value)} className="w-full border font-bold p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700">
                            <option className="font-bold bg-blue-400">Select Major</option>
                            {majors && majors.length > 0 && majors.map(major=>(
                                <option key={major._id}>
                                    {major?.major}
                                </option>
                            ))}
                        </select>
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Instructor:</h2>
                        <select
                            onChange={(e) => setInstructor(e.target.value)}
                            className="w-full border font-bold p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                        >
                            <option className="font-bold bg-blue-400">Select Instructor</option>
                            {instructors &&
                                instructors.length > 0 &&
                                instructors
                                    .filter(instructor => instructor.major === major)
                                    .map(instructor => (
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
                            onChange={(e)=>setTime(e.target.value)}
                            placeholder="MW or TTH with hour"
                        />
                    </div>
                </div>
                <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Add Course
                </button>
            </form>
        </div>
    );
}

export default AddCourse;
