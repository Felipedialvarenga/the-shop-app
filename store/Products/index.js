import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

import PRODUCTS from "../../data/dummy-data";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, thunkAPI) => {
    const response = await fetch(
      "https://projetomobile-cf839-default-rtdb.firebaseio.com/products.json",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product }),
      }
    );

    const data = await response.json();
    console.log(data);
    if (response.ok) {
      thunkAPI.dispatch(
        createProduct({
          id: data.name,
          ownerId: "u1",
          title: product.title,
          imageUrl: product.imageUrl,
          description: product.description,
          price: +product.price,
        })
      );
    }
  }
);

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async () => {
    const response = await fetch(
      "https://projetomobile-cf839-default-rtdb.firebaseio.com/products.json"
    );
    const data = await response.json();
    const loadedProducts = [];
    for (const key in data) {
      loadedProducts.push({
        ...data[key],
        ownerId: "u1",
        id: key,
        price: +data[key].price,
      });
    }
    return loadedProducts;
  }
);

const initialState = {
  availableProducts: [],
  userProducts: [],
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
      state.userProducts = [...state.userProducts, payload];
      state.availableProducts = [...state.availableProducts, payload];
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
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.availableProducts = [...payload];
      state.userProducts = payload.filter((prod) => prod.ownerId === "u1");
    },
  },
});

export const { deleteProduct, createProduct, updateProduct } =
  productsSlice.actions;
