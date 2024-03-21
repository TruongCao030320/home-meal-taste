import { createSlice } from "@reduxjs/toolkit";

const initital = [
  //   {
  //     id: "",
  //     imageUrl: "",
  //     title: "",
  //     price: 0,
  //     quantity: 0,
  //   },
];
const productSlice = createSlice({
  name: "product",
  initialState: initital,
  reducers: {
    addItemToCart: (state, action) => {
      const existedItem = state.find((item) => item.id === action.payload?.id);
      if (existedItem) {
        return state.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: item.quantity + 1 }
            : item
        );
      } else {
        return [
          ...state,
          {
            id: action.payload.id,
            imageUrl: action.payload.thumbnail,
            title: action.payload.title,
            price: action.payload.price,
            quantity: 1,
          },
        ];
      }
    },
    minusItem: (state, action) => {
      const newItem = action.payload;
      const existingItem = state.find((item) => item.id === newItem.id);
      if (existingItem.quantity === 1) {
        return (state = state.filter((item) => item.id !== newItem.id));
      } else {
        existingItem.quantity--;
      }
    },
    removeItem: (state, action) => {
      const newItem = action.payload;
      return (state = state.filter((item) => item?.id !== newItem?.id));
    },
    deleteAllItems: (state, action) => {
      return (state = []);
    },
  },
});
export const { addItemToCart, minusItem, removeItem, deleteAllItems } =
  productSlice.actions;
export default productSlice.reducer;
