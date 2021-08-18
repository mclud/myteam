import { createSlice } from "@reduxjs/toolkit";

export const slice = createSlice({
    name: "navlayer",
    initialState : {
        open: false,
    },
    reducers:  {
        toggle : (state) => {
            state.open = !state.open
        }
    }
});

export const { toggle } = slice.actions;

export const selectNavLayer = state => state.navlayer;

export default slice.reducer;