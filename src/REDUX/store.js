import { configureStore } from "@reduxjs/toolkit";
import cartReducer from "../features/cartSlice";
import ProductReducer from "../features/productSlice";
export const store = configureStore({
  reducer: {
    cart: cartReducer,
    products: ProductReducer,
  },
});

store.subscribe(() => {
  const state = store.getState();

  localStorage.setItem("myCart", JSON.stringify(state.cart.items));
});
