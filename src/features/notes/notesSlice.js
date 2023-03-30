import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notes: [],
};

export const notesSlice = createSlice({
  name: "notes",
  initialState,

  reducers: {
    addNote(state, action) {
      state.notes = [...state.notes, action.payload];
    },
    setNotes(state, action) {
      state.notes = [...action.payload];
    },
    archiveNote(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = true;
        note.deleted = false;
        note.pinned = false;
      }
    },
    unArchiveNote(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = false;
        note.deleted = false;
        note.pinned = false;
      }
    },
    pinNote(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = false;
        note.deleted = false;
        note.pinned = true;
      }
    },
    unPinNote(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = false;
        note.deleted = false;
        note.pinned = false;
      }
    },
    addToBin(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = false;
        note.deleted = true;
        note.pinned = false;
      }
    },
    removeFromBin(state, action) {
      let note = state.notes.find((item) => item?._id === action.payload);
      if (note) {
        note.archived = false;
        note.deleted = false;
        note.pinned = false;
      }
    },
    emptyBin(state) {
      state.notes = state.notes.filter((item) => item?.deleted === false);
    },
  },
});

export const {
  addNote,
  setNotes,
  archiveNote,
  emptyBin,
  pinNote,
  addToBin,
  unArchiveNote,
  unPinNote,
  removeFromBin,
} = notesSlice.actions;

export const notesInfo = (state) => state.notes.notes;

export default notesSlice.reducer;
