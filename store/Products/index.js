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
    createProduct: (state, { payload }) => {
      const newProduct = {
        id: new Date().toString(),
        ownerId: "u1",
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
        price: +payload.price,
      };
      state.userProducts = [...state.userProducts, newProduct];
      state.availableProducts = [...state.availableProducts, newProduct];
    },
    updateProduct: (state, { payload }) => {
      const userProdIdx = state.userProducts.findIndex(
        (prod) => prod.id === payload.id
      );

      const availableProdIdx = state.availableProducts.findIndex(
        (prod) => prod.id === payload.id
      );

      const updatedProdData = {
        title: payload.title,
        imageUrl: payload.imageUrl,
        description: payload.description,
      };

      state.userProducts[userProdIdx] = {
        ...state.userProducts[userProdIdx],
        ...updatedProdData,
      };

      state.availableProducts[availableProdIdx] = {
        ...state.userProducts[userProdIdx],
      };
    },
  },
});

export const { deleteProduct, createProduct, updateProduct } =
  productsSlice.actions;
