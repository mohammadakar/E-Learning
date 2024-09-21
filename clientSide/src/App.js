import {BrowserRouter,Routes,Route, Navigate} from "react-router-dom";
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Login from "./Components/Login";
import Register from "./Components/Register";
import Home from "./Components/Home/Home.jsx";
import { useSelector } from "react-redux";
import Profile from "./Components/Profile";
import AdminDashboard from "./Components/Admin/AdminDashboard";
import RegisterNewCourse from "./Components/RegisterNewCourse";
import CoursePage from "./Components/coursePageElem/CoursePage.jsx";
import EditCourse from "./Components/Home/EditCourse.jsx";
import Users from "./Components/Admin/Users.jsx";
import AddUser from "./Components/Admin/AddUser.jsx";
import ViewInstructions from "./Components/coursePageElem/ViewInstructions.jsx";
import Assignments from "./Components/assignments/Assignments.jsx";
import ViewAssignments from "./Components/assignments/ViewAssignments.jsx";
import VerifyEmail from "./Components/VerifyEmail.jsx";
import ViewTaskAssignments from "./Components/assignments/ViewTaskAssignments.jsx";

function App() {
  const {user}=useSelector(state=>state.auth)
  
  return <BrowserRouter>
    <ToastContainer theme="colored" position="top-center" />  
    <Routes>
      <Route path="/" element={user?<Home />:<Login />}/>
      <Route path="/register" element={user?<Home />:<Register />}/>
      <Route path="/users/:userId/verify/:token" element={!user ? <VerifyEmail /> : <Navigate to="/" />}/>
      <Route path="/home" element={!user?<Login/>:<Home />}/>
      <Route path="/profile" element={!user?<Login/>:<Profile />}/>
      <Route path="/coursepage/:id" element={!user?<Login/>:<CoursePage />}/>
      <Route path="/registernewcourse" element={!user?<Login/>:<RegisterNewCourse />}/>
      <Route path="/admindashboard" element={user?.isAdmin? <AdminDashboard /> : <Navigate to='/home'/>}/>
      <Route path="/editcourse/:id" element={user?.isAdmin? <EditCourse /> : <Navigate to='/home'/>}/>
      <Route path="/users" element={user?.isAdmin? <Users /> : <Navigate to='/home'/>}/>
      <Route path="/adduser" element={user?.isAdmin? <AddUser /> : <Navigate to='/home'/>}/>
      <Route path="/coursepage/:courseId/viewinstructions/:taskId" element={user? <ViewInstructions /> : <Navigate to='/'/>}/>
      <Route path="/assignments" element={user?.isInstructor ? <Assignments /> : <Navigate to='/home'/>}/>
      <Route path="/viewtaskassignments/:id/:taskId" element={user?.isInstructor ? <ViewTaskAssignments /> : <Navigate to='/home'/>}/>
      <Route path="/viewassignments/:id" element={user?.isInstructor ? <ViewAssignments /> : <Navigate to='/home'/>}/>
      
    </Routes>
  </BrowserRouter>
}

export default App;
