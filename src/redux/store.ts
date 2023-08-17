import { combineReducers, configureStore, getDefaultMiddleware } from "@reduxjs/toolkit";
import storeReducer from "./features/store/storeSlice";
import cartReducer from "./features/cart/cartSlice";
import checkoutReducer from "./features/checkout/checkoutSlice";
import storage from "redux-persist/lib/storage";
import { persistReducer, persistStore } from "redux-persist";

const persistConfig = {
  key: "root",
  storage,
};

const rootReducer = {
  shop: storeReducer,
  cart: cartReducer,
  checkout: checkoutReducer,
};

const persistedStoreReducer = persistReducer(
  persistConfig,
  combineReducers(rootReducer)
);

const store = configureStore({
  reducer: persistedStoreReducer,
   middleware: (getDefaultMiddleware)=>getDefaultMiddleware({
    serializableCheck: false,
  }),
});

export const persistor = persistStore(store);

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;
