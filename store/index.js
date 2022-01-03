import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { AuthSlice } from "./Auth";
import { cartSlice } from "./Cart";
import { ordersSlice } from "./Orders";
import { productsSlice } from "./Products";

export const store = configureStore({
  reducer: {
    products: productsSlice.reducer,
    cart: cartSlice.reducer,
    orders: ordersSlice.reducer,
    auth: AuthSlice.reducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
