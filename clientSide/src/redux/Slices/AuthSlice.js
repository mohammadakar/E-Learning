import { createSlice } from "@reduxjs/toolkit";

const authSlice = createSlice({
    name: "auth",
    initialState: {
        user: localStorage.getItem("userinfo") ? JSON.parse(localStorage.getItem("userinfo")) : null,
        newUser: null,
        isEmailVerified:false,
        addedUser:null
    },
    reducers: {
        login(state, action) {
            state.user = action.payload;
            localStorage.setItem("userinfo", JSON.stringify(state.user));
        },
        logout(state) {
            state.user = null;
            localStorage.removeItem("userinfo");
        },
        register(state, action) {
            state.newUser = action.payload;
        },
        setUserPhoto(state, action) {
            if (state.user) {
                state.user.profilePhoto = action.payload;
            }
        },
        setIsEmailVerified(state){
            state.isEmailVerified=true;
            state.newUser=null;
        },
        setAddedUser(state,action){
            state.addedUser=action.payload;
        }
    }
});

const authReducer = authSlice.reducer;
const authActions = authSlice.actions;

export { authActions, authReducer };
