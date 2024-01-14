import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  areaKeys: [],
};

const selectedSlice = createSlice({
  name: "selected",
  initialState: initialState,
  reducers: {
    setSelectedKey: (state, action) => {
      state.areaKeys.push(action.payload);
    },
    removeSelectedKey: (state, action) => {
      const elementToRemove = action.payload;
      state.areaKeys = state.areaKeys.filter(
        (element) => element !== elementToRemove
      );
    },
    resetAreaKey: (state, action) => {
      state.areaKeys = [];
    },
  },
});

export const { setSelectedKey, removeSelectedKey, resetAreaKey } =
  selectedSlice.actions;
export default selectedSlice.reducer;
