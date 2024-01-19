import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  mealSessionKeys: [],
};

const selectedMealSessionSlice = createSlice({
  name: "selectedMeal",
  initialState: initialState,
  reducers: {
    setSelectedMealSessionKey: (state, action) => {
      state.mealSessionKeys.push(action.payload);
    },
    removeSelectedMealSessionKey: (state, action) => {
      const elementToRemove = action.payload;
      state.mealSessionKeys = state.mealSessionKeys.filter(
        (element) => element !== elementToRemove
      );
    },
    resetMealSessionKey: (state, action) => {
      state.mealSessionKeys = [];
    },
  },
});

export const {
  setSelectedMealSessionKey,
  removeSelectedMealSessionKey,
  resetMealSessionKey,
} = selectedMealSessionSlice.actions;
export default selectedMealSessionSlice.reducer;
