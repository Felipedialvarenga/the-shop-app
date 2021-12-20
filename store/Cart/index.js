import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  items: {},
  totalAmount: 0,
};

export const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {
    addToCart: (state, { payload }) => {
      const addedProduct = payload;

      if (state.items[addedProduct.id]) {
        state.items[addedProduct.id].quantity++;
        state.items[addedProduct.id].productTitle = addedProduct.title;
        state.items[addedProduct.id].sum += addedProduct.price;
      } else {
        const newCartItem = {
          quantity: 1,
          productPrice: addedProduct.price,
          productTitle: addedProduct.title,
          sum: addedProduct.price,
        };
        state.items = { ...state.items, [addedProduct.id]: newCartItem };
      }
      state.totalAmount += addedProduct.price;
    },
  },
});

export const { addToCart } = cartSlice.actions;
