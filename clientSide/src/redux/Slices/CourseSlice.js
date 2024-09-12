import { createSlice } from "@reduxjs/toolkit";

const courseSlice = createSlice({
    name: "course",
    initialState: {
        course:null,
        courseCount:null,
        courses:[],
        courseById:null,
        isCourseDeleted:false,
        updatedCourse:null,
        courseUsers:null,
        task:null,
        comment:null,
        editedTask:null,
        editedComment:null,
        isCommentDeleted:false,
        isTaskDeleted:false,
        taskById:null
    },
    reducers: {
        setCourseCount(state,action){
            state.courseCount=action.payload;
        },
        setCourse(state,action){
            state.course=action.payload;
        },
        setCourses(state,action){
            state.courses=action.payload;
        },
        setCourseById(state,action){
            state.courseById=action.payload;
        },
        setIsCourseDeleted(state){
            state.isCourseDeleted=true;
        },
        setUpdatedCourse(state,action){
            state.updatedCourse=action.payload;
        },
        setCourseUsers(state,action){
            state.courseUsers=action.payload;
        },
        setTask(state,action){
            state.task=action.payload;
        },
        setComment(state,action){
            state.comment=action.payload;
        },
        setEditedTask(state,action){
            state.editedTask=action.payload;
        },
        setEditedComment(state,action){
            state.editedComment=action.payload;
        },
        setisCommentDeleted(state){
            state.isCommentDeleted=true;
        },
        setisTaskDeleted(state){
            state.isTaskDeleted=true;
        },
        settaskById(state,action){
            state.taskById=action.payload;
        }

    }
});

const courseReducer = courseSlice.reducer;
const courseActions = courseSlice.actions;

export { courseReducer, courseActions };
