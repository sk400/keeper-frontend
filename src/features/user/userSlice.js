import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    logIn(state, action) {
      state.user = action.payload;
    },
  },
});

export const { logIn } = userSlice.actions;

export const userInfo = (state) => state.user.user;

export default userSlice.reducer;
