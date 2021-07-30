import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "appwrap",
    initialState : {
        logged: false,
    },
    reducers:  {
        logged: state => {
            state.logged = true;
        }
    }
});

export const { logged } = slice.actions;

export const selectAppWrap = state => state.appwrap;

export default slice.reducer;