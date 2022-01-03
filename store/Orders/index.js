import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const addOrder = createAsyncThunk(
  "orders/addOrder",
  async (orderData, thunkAPI) => {
    const orderDate = new Date();
    const token = thunkAPI.getState().auth.token;
    const userId = thunkAPI.getState().auth.userId;
    try {
      const response = await fetch(
        `https://projetomobile-cf839-default-rtdb.firebaseio.com/orders/${userId}.json?auth=${token}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ ...orderData, date: orderDate.toISOString() }),
        }
      );

      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const newOrder = {
        id: data.name,
        ...orderData,
        date: orderDate,
      };

      return newOrder;
    } catch (err) {
      return thunkAPI.rejectWithValue();
    }
  }
);

export const getOrders = createAsyncThunk(
  "orders/getOrders",
  async (userId) => {
    try {
      const response = await fetch(
        `https://projetomobile-cf839-default-rtdb.firebaseio.com/orders/${userId}.json`
      );
      const data = await response.json();
      if (!response.ok) {
        throw new Error("Something went wrong!");
      }

      const loadedOrders = [];
      for (const key in data) {
        loadedOrders.push({
          ...data[key],
          date: new Date(data[key].date),
          id: key,
        });
      }
      return loadedOrders;
    } catch (err) {
      return err;
    }
  }
);

const initialState = {
  orders: [],
};

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  extraReducers: {
    [addOrder.fulfilled]: (state, { payload }) => {
      state.orders = [...state.orders, payload];
    },
    [addOrder.rejected]: () => {
      throw new Error("Something went wrong!");
    },
    [getOrders.fulfilled]: (state, { payload }) => {
      state.orders = [...payload];
    },
  },
});
