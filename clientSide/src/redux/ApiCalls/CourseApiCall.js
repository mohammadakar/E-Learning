import { toast } from "react-toastify";
import request from "../../utils/request";
import { courseActions } from "../Slices/CourseSlice";

export function addCourse(newCourse){
    return async (dispatch,getState)=>{
        try {
            const res= await request.post("/api/course/addCourse",newCourse,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(courseActions.setCourse(res.data));
            toast.success("Course Added successfully")
        } catch (error) {
            toast.error("Adding course went wrong")
        }
    }
}

export function editCourse(id,updatedCourse){
    return async (dispatch,getState)=>{
        try {
            const res= await request.put(`/api/course/update/${id}`,updatedCourse,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(courseActions.setUpdatedCourse(res.data));
            toast.success("Course updated successfully")
        } catch (error) {
            toast.error("Updating course went wrong")
        }
    }
}

export function getAllCourses(){
    return async (dispatch,getState)=>{
        try {
            const res= await request.get("/api/course/getAllCourses");
            dispatch(courseActions.setCourses(res.data));
        } catch (error) {
            toast.error(error.message);
        }
}
}

export function getCourseCount(){
    return async (dispatch,getState)=>{
        try {
            const res=await request.get("/api/course/getAllCoursesCount",{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            dispatch(courseActions.setCourseCount(res.data));
        } catch (error) {
            toast.error("Something went wrong");
        }
    }
}

export function getCourse(id){
    return async (dispatch)=>{
        try {
            const res= await request.get(`/api/course/course/${id}`)
            dispatch(courseActions.setCourseById(res.data));
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function deleteCourse(id){
    return async (dispatch,getState)=>{
        try {
            await request.delete(`/api/course/deleteCourse/${id}`,{
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            })
            dispatch(courseActions.setIsCourseDeleted());
            dispatch(getAllCourses());
            toast.success("Course deleted successfully")
        } catch (error) {
            toast.error("error")
        }
    }
}

export function getCourseUsers(id){
    return async (dispatch)=>{
        try {
            const res = await request.get(`/api/course/courseUsers/${id}`);
            dispatch(courseActions.setCourseUsers(res.data));
        } catch (error) {
            toast.error("Something went wrong")
        }
    }
}

export function addTask(id,task){
    return async (dispatch)=>{
        try {
            const res = await request.post(`/api/course/addTask/${id}`,task);
            dispatch(courseActions.setTask(res.data));
            getCourse(id);
            toast.success("Task added successfully")
        } catch (error) {
            toast.error("Cant add task")
        }
    }
}

export function addComment(id,comment){
    return async (dispatch)=>{
        try {
            const res = await request.post(`/api/course/addComment/${id}`,comment);
            dispatch(courseActions.setComment(res.data));
            getCourse(id);
            toast.success("Comment added successfully")
        } catch (error) {
            toast.error("Cant add Comment")
        }
    }
}

export function editTask(courseId,taskId,editedTask){
    return async (dispatch)=>{
        try {
            const res = await request.put(`/api/course/${courseId}/task/${taskId}`,editedTask);
            dispatch(courseActions.setEditedTask(res.data));
            toast.success("Task edited successfully")
        } catch (error) {
            toast.error("Cant edit task")
        }
    }
}

export function editComment(courseId,commentId,editedComment){
    return async (dispatch)=>{
        try {
            const res = await request.put(`/api/course/${courseId}/comment/${commentId}`,editedComment);
            dispatch(courseActions.setEditedComment(res.data));
            toast.success("Comment edited successfully")
        } catch (error) {
            toast.error("Cant edit comment")
        }
    }
}

export function deleteTask(courseId,taskId){
    return async (dispatch)=>{
        try {
            await request.delete(`/api/course/${courseId}/task/${taskId}`);
            dispatch(courseActions.setisTaskDeleted());
            toast.success("Task deleted successfully")
        } catch (error) {
            toast.error("Cant delete task")
        }
    }
}

export function deleteComment(courseId,commentId){
    return async (dispatch)=>{
        try {
            await request.delete(`/api/course/${courseId}/comment/${commentId}`);
            dispatch(courseActions.setisCommentDeleted());
            toast.success("Comment deleted successfully")
        } catch (error) {
            toast.error("Cant delete comment")
        }
    }
}

export function getTaskById(courseId,taskId){
    return async (dispatch)=>{
        try {
            const res = await request.get(`/api/course/${courseId}/task/${taskId}`);
            dispatch(courseActions.settaskById(res.data));
        } catch (error) {
            toast.error("Cant get task")
        }
    }
}

export function submitAssignment(courseId, file , taskId){
    return async (dispatch, getState) => {
        try {
            const formData = new FormData();
            formData.append('file', file);

            await request.post(`/api/course/${courseId}/submit-assignment/task/${taskId}`, formData, {
                headers: {
                    'Content-Type': 'multipart/form-data',
                    Authorization: "Bearer " + getState().auth.user.token
                }
            });
            toast.success("Assignment submitted successfully!");
        } catch (error) {
            toast.error(error.response.data.message);
        }
    }
}

