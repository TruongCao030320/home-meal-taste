import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
};
const drawerSession = createSlice({
  name: "sessionDrawer",
  initialState,
  reducers: {
    showDrawer: (state, action) => {
      console.log("vào đc redux không");
      state.visible = true;
    },
    hideDrawer: (state) => {
      state.visible = false;
    },
  },
});
export const { showDrawer, hideDrawer } = drawerSession.actions;
export default drawerSession.reducer;
