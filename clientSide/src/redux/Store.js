import {configureStore} from "@reduxjs/toolkit";
import { authReducer } from "./Slices/AuthSlice";
import { userReducer } from "./Slices/UserSlice";
import { courseReducer } from "./Slices/CourseSlice";
import { majorReducer } from "./Slices/MajorSlice";

const store = configureStore({
    reducer:{
        auth:authReducer,
        user:userReducer,
        course:courseReducer,
        major:majorReducer
    }
});

export default store;