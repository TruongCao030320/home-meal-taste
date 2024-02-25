import { configureStore, applyMiddleware } from "@reduxjs/toolkit";
import ToggleDrawerSessionReducer from "./ToggleDrawerSessionSlice";
import ToggleDrawerMealReducer from "./ToggleDrawerMealSlice.js";
import userSlice from "./userSlice.js";
import sidebarSlice from "./sidebarSlice.js";
import directionSlice from "./directionSlice.js";
import selectedSlice from "./SelectecedKeySlice.js";
import SelectecedMealSessionKeySlice from "./SelectecedMealSessionKeySlice.js";
import createSagaMiddleware from "redux-saga";
import rootSaga from "../saga/saga.js";
const sagaMiddleware = createSagaMiddleware();
const store = configureStore({
  reducer: {
    sessionDrawer: ToggleDrawerSessionReducer,
    mealDrawer: ToggleDrawerMealReducer,
    userSlice: userSlice,
    sidebarSlice: sidebarSlice,
    directionSlice: directionSlice,
    selectedSlice: selectedSlice,
    selectedMealSessionSlice: SelectecedMealSessionKeySlice,
  },
  middleware: [sagaMiddleware],
});
sagaMiddleware.run(rootSaga);
export default store;
