import { configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import { cartSlice } from "./Cart";
import { productsSlice } from "./Products";

export const store = configureStore({
  reducer: { products: productsSlice.reducer, cart: cartSlice.reducer },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ serializableCheck: false }),
});
