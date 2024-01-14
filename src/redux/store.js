import { configureStore } from "@reduxjs/toolkit";

import ToggleDrawerSessionReducer from "./ToggleDrawerSessionSlice";
import ToggleDrawerMealReducer from "./ToggleDrawerMealSlice.js";
import userSlice from "./userSlice.js";
import sidebarSlice from "./sidebarSlice.js";
import directionSlice from "./directionSlice.js";
import selectedSlice from "./SelectecedKeySlice.js";

const store = configureStore({
  reducer: {
    sessionDrawer: ToggleDrawerSessionReducer,
    mealDrawer: ToggleDrawerMealReducer,
    userSlice: userSlice,
    sidebarSlice: sidebarSlice,
    directionSlice: directionSlice,
    selectedSlice: selectedSlice,
  },
});
export default store;
