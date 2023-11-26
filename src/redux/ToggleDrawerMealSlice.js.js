import { createSlice } from "@reduxjs/toolkit";
import { getSingleMealSessionById } from "../API/Admin";

const initialState = {
  visible: false,
  mealId: null,
  refresh: false,
};
const drawerMeal = createSlice({
  name: "mealDrawer",
  initialState,
  reducers: {
    showDrawer: (state, action) => {
      state.mealId = action.payload;
      state.visible = true;
    },
    hideDrawer: (state) => {
      state.visible = false;
    },
    refresh: (state) => {
      state.refresh = !state.refresh;
    },
  },
});
export const { showDrawer, hideDrawer, refresh } = drawerMeal.actions;
export default drawerMeal.reducer;
