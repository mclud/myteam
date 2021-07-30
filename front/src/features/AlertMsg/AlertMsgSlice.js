import { createSlice } from '@reduxjs/toolkit';

export const slice = createSlice({
  name: 'alertMsg',
  initialState: {
    visible: false,
    msg: "Default message",
    msgType : "default",
    msgClass : "alertmsg"
  },
  reducers: {
    valid: (state, action) => {
      // Redux Toolkit allows us to write "mutating" logic in reducers. It
      // doesn't actually mutate the state because it uses the immer library,
      // which detects changes to a "draft state" and produces a brand new
      // immutable state based off those changes
      state.visible = true;
      state.msg = action.payload.msg;
      state.msgType = "valid";
      state.msgClass = "alertmsg alertmsg-valid";
    },
    invalid: (state, action) => {
      state.visible = true;
      state.msg = action.payload.msg;
      state.msgType = "invalid";
      state.msgClass = "alertmsg alertmsg-invalid"
    },
    origin: state => {
      state.visible = false;
      state.msg = "Default message";
      state.msgType = "default";
      state.msgClass = "alertmsg";
    }
  },
});

export const { valid, invalid, origin } = slice.actions;

// The function below is called a selector and allows us to select a value from
// the state. Selectors can also be defined inline where they're used instead of
// in the slice file. For example: `useSelector((state) => state.counter.value)`
export const selectAlertMsg = state => state.alertMsg;

export default slice.reducer;
