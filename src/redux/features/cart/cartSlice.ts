import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import productApi from "../../../utils/productApi";
import axios from "axios";
import { Product } from "../../../types";
import { RootState } from "../../store";

export interface CartState {
  products: any[];
  count: number;
  loading: boolean;
  error: string;
}

export const initialState = {
  products: [],
  count: 0,
  loading: false,
  error: "",
} as CartState;

// // First, create the thunk
export const addItem = createAsyncThunk(
  "cart/addItem",
  async (productId: number, { getState }) => {
    const state = getState() as RootState;
    const { products } = state.cart;
    const existingProduct = products?.find(
      (product) => product.id === productId
    );

    if (existingProduct) {
      console.log('Found existing product')
      return existingProduct;
    } else {
      console.log('Creating a new product')
      return await baseUrl
        .get(`${productId}`)
        .then((response) => response.data);
    }
  }
);

const cartSlice = createSlice({
  name: "cart",
  initialState,
  reducers: {

    'decrementItem': (state, action: PayloadAction<number>) => {
      const existingProduct = state.products.find(
        (product) => product.id == action.payload
      );
      if (existingProduct) {
        //if item count is just one, return a filter of the cart and remove the item
        if (existingProduct.count === 1) {
          const updatedProducts = state.products.filter(
            (product) => product.id !== existingProduct.id
          );
          state.products = [...updatedProducts];
        } else {
          // If the item exists in the cart but count/quantity is greater than 1, reduce by 1
          const updatedProducts = state.products.map((product) => {
            if (product.id === existingProduct.id) {
              return {
                ...product,
                count: product.count - 1,
              };
            }
            return product;
          });

          state.products = updatedProducts;
        }

        state.count -= 1;
      }
    },
    'deleteItem': (state, action: PayloadAction<number>) => {
      const product = state.products.find((v) => v.id == action.payload);
      state.products = state.products.filter((v) => v.id !== product.id);
      state.count -= product.count;
    },
    'clearCart': (state) => {
      state.products = [];
      state.count = 0;
    },
  },
  extraReducers: (builder) => {
    builder.addCase(addItem.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(addItem.fulfilled, (state, action) => {
      //
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );
      //check if product already exists in cart and increment count
      //or add a new product if product is not in cart
      if (existingProduct) {
        const updatedProducts = state.products.map((product) => {
          if (product.id === existingProduct.id) {
            return {
              ...product,
              count: product.count + 1,
            };
          }
          return product;
        });

        state.products = updatedProducts;
      } else {
        const newProduct = {
          ...action.payload,
          count: 1,
        };

        state.products.push(newProduct);
      }
      state.loading = false;
      state.error = "";
      state.count++;
    });
    builder.addCase(addItem.rejected, (state, action) => {
      state.loading = false;
      state.error = action.error.message || "error fetching product";
    });
  },
});

export const { decrementItem, deleteItem, clearCart } =
  cartSlice.actions;
export default cartSlice.reducer;
