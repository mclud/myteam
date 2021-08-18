import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "appwrap",
    initialState : {
        logged: false,
        user : [],
    },
    reducers:  {
        logged: (state, {payload}) => {
            state.logged = true;
            state.user = payload.user;
        },
        defaultUser: (state) => {
            state.logged = false;
            state.user = []; 
        }
    }
});

export const { logged, defaultUser } = slice.actions;

export const selectAppWrap = state => state.appwrap;

export default slice.reducer;