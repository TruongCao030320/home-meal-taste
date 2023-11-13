import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  visible: false,
  title: "",
  content: "",
};
const modalSlice = createSlice({
  name: "modal",
  initialState,
  reducers: {
    showModal: (state, action) => {
      state.visible = true;
      state.title = action.payload;
      state.content = action.payload;
    },
  },
});
