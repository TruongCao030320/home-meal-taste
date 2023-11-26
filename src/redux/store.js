import { configureStore } from "@reduxjs/toolkit";

import ToggleDrawerSessionReducer from "./ToggleDrawerSessionSlice";
import ToggleDrawerMealReducer from "./ToggleDrawerMealSlice.js";

const store = configureStore({
  reducer: {
    sessionDrawer: ToggleDrawerSessionReducer,
    mealDrawer: ToggleDrawerMealReducer,
  },
});
export default store;
