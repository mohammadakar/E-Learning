import { useSelector } from "react-redux";
import Header from "../Header";
import { Link } from "react-router-dom";

const Assignments = () => {
    
    const {user}=useSelector(state => state.auth);
    const { courses } = useSelector(state => state.course);

    console.log(user,courses);
    

    return ( 
        <div>
            <Header/>
            <div>
            user?.isInstructor ?
            (
                <div className="course-container">
                    {courses && courses.length ? (
                        courses.map(course => (
                            course?.instructor === user?.username ?
                                <div key={course._id} className="course-card mt-10">
                                    <img src={course.cover.url} alt="cover" className="course-cover" />
                                    <div className="course-info">
                                        <h2 className="course-title uppercase">{course.courseName}</h2>
                                        <p className="course-code">{course.code}</p>
                                        <Link to={`/viewassignments/${course._id}`}><button className="view-course-btn">View assignments</button></Link>
                                    </div>
                                </div>
                                :
                                <></>
                        ))
                    ) : (
                        <p className="text-center">No courses founded</p>
                    )}
                </div>
            )
            </div>
        </div>
    );
}

export default Assignments;