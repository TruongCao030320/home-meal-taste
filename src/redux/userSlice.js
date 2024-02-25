import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserInforAction: (state, action) => {
      console.log("action payload lấy đc", action.payload);
      state.user = action.payload;
      console.log("State sauupdate la", state.user);
    },
  },
});
export const { getUserInforAction } = userSlice.actions;
export default userSlice.reducer;
