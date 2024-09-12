import { createSlice } from "@reduxjs/toolkit";

const majorSlice = createSlice({
    name: "major",
    initialState: {
        newMajor:null,
        allMajors:null
    },
    reducers: {
        setNewMajor(state,action){
            state.newMajor=action.payload;
        },
        setAllMajors(state,action){
            state.allMajors=action.payload;
        },
    },
    
});

const majorReducer = majorSlice.reducer;
const majorActions = majorSlice.actions;

export { majorReducer, majorActions };
