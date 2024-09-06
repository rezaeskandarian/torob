import { configureStore } from "@reduxjs/toolkit";
import checkUserSlice from "./features/auth/checkUserSlice";
import productSlice from "./features/product/productSlice";

const store = configureStore({
  reducer: { auth: checkUserSlice, products: productSlice },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export default store;
