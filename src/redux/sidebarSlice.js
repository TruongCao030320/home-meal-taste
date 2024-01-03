import { createSlice } from "@reduxjs/toolkit";

const initial = {
  visible: false,
};

const sidebarSlice = createSlice({
  name: "sidebar",
  initialState: initial,
  reducers: {
    showSidebar: (state, action) => {
      state.visible = true;
    },
    hiddenSidebar: (state, action) => {
      state.visible = false;
    },
  },
});
export const { showSidebar, hiddenSidebar } = sidebarSlice.actions;
export default sidebarSlice.reducer;
