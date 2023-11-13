import { configureStore } from "@reduxjs/toolkit";

import ToggleDrawerReducer from "./ToggleDrawerSlice";

const store = configureStore({
  reducer: {
    drawer: ToggleDrawerReducer,
  },
});
export default store;
