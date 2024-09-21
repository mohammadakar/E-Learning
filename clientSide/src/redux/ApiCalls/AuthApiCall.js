import { toast } from "react-toastify"
import request from "../../utils/request";
import { authActions } from "../Slices/AuthSlice";



export function loginUser(user){
    return async (dispatch)=>{
        try {
            const res = await request.post("/api/auth/login",user);
            dispatch(authActions.login(res.data));
            localStorage.setItem("userinfo",JSON.stringify(res.data));
            toast.success("Logged in successfully")
        } catch (error) {
            toast.error(error?.response?.data?.message);
        }
    }
}

export function logout(){
    return async (dispatch)=>{
        dispatch(authActions.logout());
        localStorage.removeItem("userinfo");
    }
}

export function register(newUser) {
    return async (dispatch) => {
        try {
            const res = await request.post("/api/auth/register", newUser); 
            dispatch(authActions.register(res.data.message));
            toast.success("We sent to you an email, please verify your email address ")
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }
}


export function verifyEmail(userId,token){
    return async (dispatch)=>{
        try {
            await request.get(`/api/auth/${userId}/verify/${token}`)
            dispatch(authActions.setIsEmailVerified());
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }

    }
}

export function addUser(newUser) {
    return async (dispatch,getState) => {
        try {
            const res = await request.post("/api/auth/addUser", newUser , {
                headers:{
                    Authorization: "Bearer " + getState().auth.user.token
                }
            }); 
            dispatch(authActions.setAddedUser(res.data));
            toast.success("User added successfully");
        } catch (error) {
            const errorMessage = error?.response?.data?.message || "An error occurred";
            toast.error(errorMessage);
        }
    }
}

export function generateEmailForUser(username) {
    const domain = "e-learning.com";
    const cleanedUsername = username.replace(/\s+/g, '').toLowerCase(); 
    return `${cleanedUsername}@${domain}`;
};

