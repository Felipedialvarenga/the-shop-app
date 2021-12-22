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
    removeFromCart: (state, { payload }) => {
      const currentQty = state.items[payload].quantity;

      if (currentQty > 1) {
        state.items[payload].quantity--;
        state.items[payload].sum -= state.items[payload].productPrice;
        state.totalAmount -= state.items[payload].productPrice;
      } else {
        state.totalAmount -= state.items[payload].productPrice;
        delete state.items[payload];
      }
    },
    clearCart: (state) => {
      state.items = {};
      state.totalAmount = 0;
    },
    deleteCartProduct: (state, { payload }) => {
      if (state.items[payload]) {
        state.totalAmount -= state.items[payload].sum;
        delete state.items[payload];
      }
    },
  },
});

export const { addToCart, removeFromCart, clearCart, deleteCartProduct } =
  cartSlice.actions;
