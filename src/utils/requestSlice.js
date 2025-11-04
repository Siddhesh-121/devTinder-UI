import { createSlice } from "@reduxjs/toolkit";

const requestSlice = createSlice({
  name: "request",
  initialState: null,
  reducers: {
    addRequest: (state, action) => {
      return action.payload;
    },
    removeRequest: (state, action) => {
      return null;
    },
    removeRequestById: (state, action) => {
      const arr = state.filter((req) => {
        req._id !== action.payload;
      });
      return arr;
    },
  },
});

export default requestSlice.reducer;

export const { addRequest, removeRequest, removeRequestById } =
  requestSlice.actions;
