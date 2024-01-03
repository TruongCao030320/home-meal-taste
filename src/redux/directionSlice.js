import { createSlice } from "@reduxjs/toolkit";

const initial = {
  currentSession: null,
  currentArea: null,
};
const directionSlice = createSlice({
  name: "direction",
  initialState: initial,
  reducers: {
    setCurrentSession: (state, action) => {
      state.currentSession = action.payload;
    },
    setCurrentArea: (state, action) => {
      state.currentArea = action.payload;
    },
  },
});
export const { setCurrentArea, setCurrentSession } = directionSlice.actions;
export default directionSlice.reducer;
