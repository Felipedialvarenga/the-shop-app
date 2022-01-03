import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const addProduct = createAsyncThunk(
  "products/addProduct",
  async (product, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const userId = thunkAPI.getState().auth.userId;
    const response = await fetch(
      `https://projetomobile-cf839-default-rtdb.firebaseio.com/products.json?auth=${token}`,
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...product, ownerId: userId }),
      }
    );

    const data = await response.json();
    if (response.ok) {
      thunkAPI.dispatch(
        createProduct({
          id: data.name,
          ownerId: userId,
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
  async (userId) => {
    try {
      const response = await fetch(
        "https://projetomobile-cf839-default-rtdb.firebaseio.com/products.json"
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const loadedProducts = [];
      for (const key in data) {
        loadedProducts.push({
          ...data[key],
          id: key,
          price: +data[key].price,
        });
      }
      return { products: loadedProducts, userId };
    } catch (err) {
      return err;
    }
  }
);

export const updateProduct = createAsyncThunk(
  "products/updateProducts",
  async (productData, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch(
      `https://projetomobile-cf839-default-rtdb.firebaseio.com/products/${productData.id}.json?auth=${token}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          title: productData.title,
          description: productData.description,
          imageUrl: productData.imageUrl,
        }),
      }
    );

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(errorInfo.error);
    }
    return productData;
  }
);

export const deleteProduct = createAsyncThunk(
  "products/deleteProducts",
  async (productId, thunkAPI) => {
    const token = thunkAPI.getState().auth.token;
    const response = await fetch(
      `https://projetomobile-cf839-default-rtdb.firebaseio.com/products/${productId}.json?auth=${token}`,
      {
        method: "DELETE",
      }
    );

    if (!response.ok) {
      const errorInfo = await response.json();
      throw new Error(errorInfo.error);
    }

    return productId;
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
    createProduct: (state, { payload }) => {
      state.userProducts = [...state.userProducts, payload];
      state.availableProducts = [...state.availableProducts, payload];
    },
  },
  extraReducers: {
    [getProducts.fulfilled]: (state, { payload }) => {
      state.availableProducts = [...payload.products];
      state.userProducts = payload.products.filter(
        (prod) => prod.ownerId === payload.userId
      );
    },
    [updateProduct.fulfilled]: (state, { payload }) => {
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
    [updateProduct.rejected]: (state, action) => {
      throw new Error(action.error.message);
    },
    [deleteProduct.fulfilled]: (state, { payload }) => {
      state.availableProducts = state.availableProducts.filter(
        (prod) => prod.id !== payload
      );
      state.userProducts = state.userProducts.filter(
        (prod) => prod.id !== payload
      );
    },
    [deleteProduct.rejected]: () => {
      throw new Error(action.error.message);
    },
  },
});

export const { createProduct } = productsSlice.actions;
