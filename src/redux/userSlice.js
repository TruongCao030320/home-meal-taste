import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: {},
};
const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    getUserInfor: (state, action) => {
      state.user = action.payload;
    },
  },
});
export const { getUserInfor } = userSlice.actions;
export default userSlice.reducer;
