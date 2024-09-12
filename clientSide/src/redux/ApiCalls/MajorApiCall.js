import { toast } from "react-toastify"
import request from "../../utils/request";
import { majorActions } from "../Slices/MajorSlice";


export function addMajor(newMajor){
    return async (dispatch,getState)=>{
        try {
            const res=await request.post("/api/major/addMajor",newMajor,{
                headers:{
                    Authorization:"Bearer " + getState().auth.user.token
                }
            })
            dispatch(majorActions.setNewMajor(res.data))
            toast.success("Major added successfully")
        } catch (error) {
            toast.error(error.response.data.message)
        }
    }
}

export function getAllMajors(){
    return async (dispatch)=>{
        try {
            const res=await request.get("/api/major/allMajors")
            dispatch(majorActions.setAllMajors(res.data))
        } catch (error) {
            toast.error("Failed to get all majors")
        }
    }
}