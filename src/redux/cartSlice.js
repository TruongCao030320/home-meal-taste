import { createSlice } from "@reduxjs/toolkit";

const initial = {
  isOpen: false,
};
const cartSlice = createSlice({
  name: "cart",
  initialState: initial,
  reducers: {
    openCart: (state, action) => {
      console.log("Open cart");
      state.isOpen = true;
    },
    closeCart: (state, action) => {
      console.log("Close Cart");
      state.isOpen = false;
    },
  },
});
export const { openCart, closeCart } = cartSlice.actions;
export default cartSlice.reducer;
