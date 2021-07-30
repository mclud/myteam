import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "news",
    initialState : {
        read: false,
    },
    reducers:  {
        read: state => {
            state.read = true;
        }
    }
});

export const { read } = slice.actions;

export const selectNews = state => state.news;

export default slice.reducer;