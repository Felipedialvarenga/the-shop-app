import { createSlice } from "@reduxjs/toolkit";

import PRODUCTS from "../../data/dummy-data";

const initialState = {
  availableProducts: PRODUCTS,
  userProducts: PRODUCTS.filter((prod) => prod.ownerId === "u1"),
};

export const productsSlice = createSlice({
  name: "products",
  initialState,
  reducers: {
    deleteProduct: (state, { payload }) => {
      state.availableProducts = state.availableProducts.filter(
        (prod) => prod.id !== payload
      );
      state.userProducts = state.userProducts.filter(
        (prod) => prod.id !== payload
      );
    },
  },
});

export const { deleteProduct } = productsSlice.actions;
