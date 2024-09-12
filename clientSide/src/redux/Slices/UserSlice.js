import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
    name: "user",
    initialState: {
        profilePhoto: null,
        updatedProfile:null,
        isProfileDeleted:false,
        usersCount:null,
        course:[],
        userCourses:null,
        isCourseDeleted:false,
        instructors:null,
        instructorsCount:null,
        allUsers:null,
        isUserDeleted:false,
        isinstructor:false
    },
    reducers: {
        setProfilePhoto(state, action) {
            state.profilePhoto = action.payload;
        },
        setIsProfileDelete(state){
            state.isProfileDeleted=true;
        },
        setUpdatedProfile(state,action){
            state.updatedProfile=action.payload;
        },
        setUsersCount(state,action){
            state.usersCount=action.payload;
        },
        setCourse(state,action){
            state.course.push(action.payload);
        },
        setUsersCourses(state,action){
            state.userCourses=action.payload
        },
        setIsCourseDeleted(state){
            state.isCourseDeleted=true;
        },
        setInstructors(state,action){
            state.instructors=action.payload;
        },
        setInstructorsCount(state,action){
            state.instructorsCount=action.payload;
        },
        setAllUsers(state,action){
            state.allUsers=action.payload;
        },
        setIsUserDeleted(state){
            state.isUserDeleted=true;
        },
        setIsInstructor(state){
            state.isinstructor=true;
        },

    }
});

const userReducer = userSlice.reducer;
const userActions = userSlice.actions;

export { userReducer, userActions };
