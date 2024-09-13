import { toast } from "react-toastify";
import { userActions } from "../Slices/UserSlice";
import request from '../../utils/request';
import { authActions } from "../Slices/AuthSlice";

export function updateProfilePhoto(newPhoto) {
    return async (dispatch, getState) => {
        try {
            const formData = new FormData();
            formData.append('image', newPhoto);
            const res = await request.post(`/api/user/updateProfilePhoto`, formData, {
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token,
                    "content-type": "multipart/form-data"
                }
            });
            console.log(res.data);
            
            dispatch(userActions.setProfilePhoto(res.data.profilePhoto));
            dispatch(authActions.setUserPhoto(res.data.profilePhoto));

            // Update localStorage with new photo
            const user = JSON.parse(localStorage.getItem("userinfo"));
            user.profilePhoto = res.data?.profilePhoto;
            localStorage.setItem("userinfo", JSON.stringify(user));

            toast.success("Profile photo updated successfully!");
        } catch (error) {
            toast.error(error?.response?.data?.message || "An error occurred");
        }
    };
}

export function updateProfile(updatedFields){
    return async (dispatch,getState)=>{
        try {
            const res=await request.put('/api/user/updateProfile',updatedFields,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setUpdatedProfile(res.data));
            const user=JSON.parse(localStorage.getItem("userinfo"));
            user.username=res.data?.username;
            localStorage.setItem("userinfo",JSON.stringify(user))
            toast.success("Profile updated successfully")
        } catch (error) {
            toast.error("An error occurred")
        }
    }
}

export function deleteAccount(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.delete('/api/user/delete',{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
    
            dispatch(userActions.setIsProfileDelete());
            toast.success(res.data.message);
        } catch (error) {
            toast.error("An error occurred")
        }
    }
}

export function getAllUsersCount(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get('/api/user/allUsersCount',{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token,
                }
            })
            dispatch(userActions.setUsersCount(res.data));
        } catch (error) {
            toast.error("An error occurred")
        }
    }
}

export function registerCourse(courseID){
    return async (dispatch,getState)=>{
        try {
            const res=await request.post("/api/user/registerCourse", { courseID }, {
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(userActions.setCourse(res.data));
            toast.success("Course registered successfully");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

export function getUserCourses(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get("/api/user/myCourses",{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setUsersCourses(res.data));
        } catch (error) {
            toast.error("Something Went Wrong");
        }
    }
}

export function dropCourse(courseID) {
    return async (dispatch, getState) => {
        try {
            await request.delete("/api/user/drop", {
                data: { courseID },
                headers: {
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(userActions.setIsCourseDeleted());
            dispatch(getUserCourses());
            toast.success("Course dropped successfully");
        } catch (error) {
            toast.error("Something went wrong");
        }
    };
}

export function getInstructors(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get("/api/user/instructor",{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setInstructors(res.data));
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
}

export function getInstructorsCount(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get("/api/user/instructorCount",{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setInstructorsCount(res.data));
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
}

export function getAllUsers(){
    return async (dispatch,getState)=>{
        try {
            const res = await request.get("/api/user/allUsers",{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setAllUsers(res.data));
        } catch (error) {
            toast.error("Cant get users!")
        }
    }
}

export function deleteUser(id){
    return async (dispatch,getState)=>{
        try {
            await request.delete(`/api/user/deleteUser/${id}`,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setIsUserDeleted());
            getAllUsers();
            toast.success("User deleted successfully")
        } catch (error) {
            toast.error("Cant delete user")
        }
    }
}

export function assignInstructor(id){
    return async (dispatch,getState)=>{
        try {
            await request.put(`/api/user/assignInstructor/${id}`,'',{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(userActions.setIsUserDeleted());
            getAllUsers();
            toast.success("User assigned successfully")
        } catch (error) {
            toast.error("Cant delete user")
        }
    }
}
