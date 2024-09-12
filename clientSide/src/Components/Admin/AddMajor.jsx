import { useState } from "react";
import { useDispatch } from "react-redux";
import { addMajor } from "../../redux/ApiCalls/MajorApiCall";
import { toast } from "react-toastify";

const AddMajor = ({instructors}) => {
    
    const dispatch=useDispatch();
    const [major,setMajor]=useState("");
    const [faculty,setFaculty]=useState("");
    const formSubmitHandler = (e) =>{
        e.preventDefault();
        if(major.trim()==="") return toast.error("Major is required");
        if(faculty.trim()==="") return toast.error("Faculty is required");
        dispatch(addMajor({major,faculty}));
        setMajor("");
        setFaculty("");
    }

    
    

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 p-4">
            <h1 className="text-2xl font-bold mb-6">Add new major:</h1>
            <form onSubmit={formSubmitHandler} className="w-full max-w-lg">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Major:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="courseName"
                            value={major}
                            onChange={(e)=>setMajor(e.target.value)}
                        />
                    </div>
                    <div>
                        <h2 className="text-lg font-semibold mb-2">Faculty:</h2>
                        <input 
                            type="text" 
                            className="w-full border p-3 rounded-lg focus:outline-none focus:ring-2 text-gray-700"
                            id="code"
                            value={faculty}
                            onChange={(e)=>setFaculty(e.target.value)}
                        />
                    </div>
                </div>
                <button className="mt-6 w-full bg-blue-500 text-white p-3 rounded-lg hover:bg-blue-600 transition-colors">
                    Add major
                </button>
            </form>
        </div>
    );
}

export default AddMajor;
