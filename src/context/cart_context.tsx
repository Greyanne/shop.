import React, {
  PropsWithChildren,
  useContext,
  useEffect,
  useState,
} from "react";
import { Storage } from "@ionic/storage";
import { InitialCartState, CartState, ICartContext } from "../state/cartState";
import cart_reducer from "../reducers/cart_reducer";
import baseUrl from "../utils/baseUrl";
import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_CART_ITEMS,
} from "../actions/cartActions";
import { StoreContext, store } from "./store_context";

const CartContext = React.createContext<ICartContext>({
  ...InitialCartState,
  addToCart: () => {},
  decrementCartItem: () => {},
  removeCartItem: () => {},
  clearCart: () => {},
});

const CartProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [state, dispatch] = React.useReducer(cart_reducer, InitialCartState);
  const { products } = useContext(StoreContext);

  const addToCart = (id: number) => {
    const product = products.find((v) => v.id == id);
    dispatch({ type: ADD_TO_CART, payload: product });
  };

  const decrementCartItem = (id: number) => {
    dispatch({ type: DECREMENT_CART_ITEM, payload: id });
  };

  const removeCartItem = (id: number) => {
    dispatch({ type: REMOVE_CART_ITEM, payload: id });
  };

  const clearCart = () => {
    dispatch({ type: CLEAR_CART });
  };

  const loadCartFromStorage = async () => {
    const products = await store.get("@cart");
    console.log({ cartItems: products });
    dispatch({
      type: SET_CART_ITEMS,
      payload: JSON.parse(products),
    });
  };

  useEffect(() => {
    console.log({ cart: state.products });
    store.set("@cart", JSON.stringify(state.products));
  }, [state.products]);

  useEffect(() => {
    loadCartFromStorage();
  }, []);

  return (
    <CartContext.Provider
      value={{
        ...state,
        addToCart,
        decrementCartItem,
        removeCartItem,
        clearCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export { CartContext, CartProvider };
