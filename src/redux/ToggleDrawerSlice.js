import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  productId: null,
  type: null,
};
const drawerSlice = createSlice({
  name: "drawer",
  initialState,
  reducers: {
    showDrawer: (state, action) => {
      state.visible = true;
      state.productId = action.payload;
      state.type = action.payload;
    },
    hideDrawer: (state) => {
      state.visible = false;
    },
  },
});
export const { showDrawer, hideDrawer } = drawerSlice.actions;
export default drawerSlice.reducer;
