import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    addNote: (state, action) => {
      state.notes = [...state.notes, action.payload];
    },
  },
});

export const { addNote } = notesSlice.actions;

export const notes = (state) => state.notes.notes;

export default notesSlice.reducer;
