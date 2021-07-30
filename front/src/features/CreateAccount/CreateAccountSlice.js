import { createSlice } from "@reduxjs/toolkit";


export const slice = createSlice({
    name : "postnews",
    initialState : {
        title : "Put your title here",
        content : "Put your content here",
    },
    reducers : {
        updateTitle : (state, action) => state.title = action.payload,
        updateBody : (state, action) => state.content = action.payload,
    }
});

export const { title, content } = slice.actions;

export const selectPostNews = state => state.postnews;

export default slice.reducer;