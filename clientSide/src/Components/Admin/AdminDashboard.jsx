import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import Header from "../Header";
import { getAllUsersCount, getInstructors, getInstructorsCount } from "../../redux/ApiCalls/UserApiCall";
import { getCourseCount } from "../../redux/ApiCalls/CourseApiCall";
import AddCourse from "./AddCourse";
import AddMajor from "./AddMajor";
import { getAllMajors } from "../../redux/ApiCalls/MajorApiCall";

const AdminDashboard = () => {
    const dispatch = useDispatch();
    const { usersCount } = useSelector(state => state.user);
    const { courseCount } = useSelector(state => state.course);
    const {instructors} = useSelector(state => state.user);
    const {instructorsCount}=useSelector(state =>state.user)
    const {allMajors} =useSelector(state => state.major)
    useEffect(() => {
        dispatch(getAllUsersCount());
        dispatch(getCourseCount());
        dispatch(getInstructors());
        dispatch(getInstructorsCount());
        dispatch(getAllMajors());
    }, [dispatch]);

    return (
        <section className="min-h-screen bg-blue-100">
            <Header />
            <div className="flex flex-col items-center justify-center pt-5 mt-10 space-y-6 md:flex-row md:space-y-0 md:space-x-20">
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Users Count:</p>
                    <div className="text-2xl font-bold">{usersCount}</div>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Instructors Count:</p>
                    <div className="text-2xl font-bold">{instructorsCount}</div>
                </div>
                <div className="flex flex-col items-center p-6 bg-white rounded-lg shadow-lg">
                    <p className="text-lg font-semibold">Courses Count:</p>
                    <div className="text-2xl font-bold">{courseCount}</div>
                </div>
            </div>
            <div>
                <AddMajor/>
            </div>
            <div className="mt-10 md:mt-12 px-4">
                <AddCourse instructors={instructors} majors={allMajors}/>
            </div>
        </section>
    );
}

export default AdminDashboard;
