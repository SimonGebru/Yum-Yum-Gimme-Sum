// store.js
import { configureStore } from "@reduxjs/toolkit";
import menuReducer from "./menuSlice";
import cartReducer from "./cartSlice";
import orderReducer from "./orderSlice";


const preloadedState = {
  cart: JSON.parse(localStorage.getItem("cart")) || { items: [], total: 0 },
  order: JSON.parse(localStorage.getItem("order")) || { orderNumber: null, eta: null, status: "idle", error: null },
};

export const store = configureStore({
  reducer: {
    menu: menuReducer,
    cart: cartReducer,
    order: orderReducer,
  },
  preloadedState,
});


store.subscribe(() => {
  localStorage.setItem("cart", JSON.stringify(store.getState().cart));
  localStorage.setItem("order", JSON.stringify(store.getState().order));
});

export default store;