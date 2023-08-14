import React, { PropsWithChildren, useEffect, useState } from "react";
import { Storage } from "@ionic/storage";
import {
  IStoreContext,
  InitialStoreState,
  StoreState,
} from "../state/storeState";
import store_reducer from "../reducers/store_reducer";
import baseUrl from "../utils/baseUrl";
import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
} from "../actions/storeActions";

export const store = new Storage();

const initStorage = async () => {
  await store.create();
};

initStorage();

const StoreContext = React.createContext<IStoreContext>({
  ...InitialStoreState,
  fetchSingleProduct: async () => null,
});

const StoreProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(store_reducer, InitialStoreState);

  const fetchProducts = async () => {
    dispatch({ type: FETCH_PRODUCTS });
    try {
      const response = await baseUrl.get("/products");
      if (response) {
        console.log({ response });
        console.log(response.data);
        await store.set("@products", JSON.stringify(response.data));
        dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: response.data });
      }
    } catch (error) {
      console.log("Fetching products error...");
      console.log("Error fetching products::: ", error);
      dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error });
    }
  };

  const fetchSingleProduct = async (id: number) => {
    try {
      const response = await baseUrl.get(`/products/${id}`);
      if (response) {
        return response.data;
      }
    } catch (error) {
      console.log("error fetching product");
    }
  };

  const loadProductsFromStorage = async () => {
    dispatch({ type: FETCH_PRODUCTS });
    try {
      const products = await store.get("@products");
      dispatch({ type: FETCH_PRODUCTS_SUCCESS, payload: JSON.parse(products) });
    } catch (error) {
      console.log("Fetching products error...");
      console.log("Error fetching products from storage::: ", error);
      dispatch({ type: FETCH_PRODUCTS_ERROR, payload: error });
    }
  };

  // useEffect(() => {
  //   const initStorage = async () => {
  //     await store.create();
  //   };

  //   initStorage();
  // }, []);

  useEffect(() => {
    loadProductsFromStorage();
  }, []);

  useEffect(() => {
    if (state.products.length <= 0) {
      fetchProducts();
    }
  }, [state.products]);

  return (
    <StoreContext.Provider value={{ ...state, fetchSingleProduct }}>
      {children}
    </StoreContext.Provider>
  );
};

export { StoreContext, StoreProvider };
