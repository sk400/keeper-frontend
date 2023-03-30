import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  labels: [],
};

export const labelSlice = createSlice({
  name: "labels",
  initialState,

  reducers: {
    addLabel(state, action) {
      state.labels = [...state.labels, action.payload];
    },
    setLabels(state, action) {
      state.labels = [...action.payload];
    },
    deleteALabel(state, action) {
      state.labels = state.labels.filter(
        (label) => label?._id !== action.payload
      );
    },
  },
});

export const { addLabel, setLabels, deleteALabel } = labelSlice.actions;

export const labelsInfo = (state) => state.labels.labels;

export default labelSlice.reducer;
