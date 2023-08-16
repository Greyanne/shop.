import { configureStore } from "@reduxjs/toolkit";
import storeReducer from "./features/store/storeSlice";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";

const store = configureStore({
  reducer: {
    shop: storeReducer,
    cart: cartReducer,
    checkout: checkoutReducer,
  },
//   middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(logger),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch
export default store;

