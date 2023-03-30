import { configureStore } from "@reduxjs/toolkit";
import notesReducer from "../features/notes/notesSlice";
import userReducer from "../features/user/userSlice";
import labelReducer from "../features/labels/labelSlice";

export const store = configureStore({
  reducer: {
    notes: notesReducer,
    user: userReducer,
    labels: labelReducer,
  },
});
