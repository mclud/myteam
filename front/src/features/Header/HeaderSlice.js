import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'header',
  initialState: {
    position: "initial",
    size: "normal",
  },
  reducers: {
    sticky: state => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.position = "sticky";
      state.size = "mini";
    },
    origin: state => {
      state.position = "initial";
    },
    minify: state => {
      state.size = "small";
    },
    normalSize: state => {
      state.size = "normal";
    }
  },
});

export const { sticky, minify, origin, normalSize } = slice.actions;

//Selector
export const selectHeader = state => state.header;

export default slice.reducer;
