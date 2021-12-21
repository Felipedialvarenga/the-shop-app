import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  orders: [],
};

// const Order = {
//   id,
//   items,
//   totalAmount,
//   date,
// };

export const ordersSlice = createSlice({
  name: "orders",
  initialState,
  reducers: {
    addOrder: (state, { payload }) => {
      const newOrder = {
        ...payload,
        id: new Date().toString(),
        date: new Date(),
      };

      state.orders = [...state.orders, newOrder];
    },
  },
});

export const { addOrder } = ordersSlice.actions;
