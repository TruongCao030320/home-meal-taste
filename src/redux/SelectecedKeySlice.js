import { createSlice } from "@reduxjs/toolkit";
import { produce } from "immer";
const initialState = {
  areaKeys: [],
};

const selectedSlice = createSlice({
  name: "selected",
  initialState: { areaKeys: [] },
  reducers: {
    setSelectedKey: (state, action) => {
      state.areaKeys = state.areaKeys || [];
      state.areaKeys.push(action.payload);
      console.log("Sau khi push là", state.areaKeys);
    },
    removeSelectedKey: (state, action) => {
      console.log("Khi gọi hàm xóa", action.payload);
      console.log("trước khi xóa là", state.areaKeys.flat());

      const elementToRemove = action.payload;
      state.areaKeys = state.areaKeys.flat();
      state.areaKeys = state.areaKeys.filter(
        (element) => element !== elementToRemove
      );
      // state.areaKeys = state.areaKeys || [];
      // state.areaKeys.flat() = produce(state.areaKeys, (draft) => {
      //   return draft.filter((element) => element !== elementToRemove);
      // });
    },
    resetAreaKey: (state, action) => {
      state.areaKeys = [];
    },
  },
});

export const { setSelectedKey, removeSelectedKey, resetAreaKey } =
  selectedSlice.actions;
export default selectedSlice.reducer;
