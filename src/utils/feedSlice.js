import { createSlice } from "@reduxjs/toolkit";

const feedSlice = createSlice({
  name: "feed",
  initialState: null,
  reducers: {
    addFeed: (state, action) => action.payload,
    removeFeed: (state, action) => null,
    removeFeedById: (state, action) => {
      const arr = state.filter((item) => item._id !== action.payload);
      return arr;
    },
  },
});

export default feedSlice.reducer;

export const { addFeed, removeFeed, removeFeedById } = feedSlice.actions;
