import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import baseUrl from "../../../utils/baseUrl";
import productApi from "../../../utils/productApi";

export interface StoreState {
  products: any[];
  wishlist: any[];
  loading: boolean;
  error: string;
}

export const initialState = {
  products: [],
  wishlist: [],
  loading: false,
  error: "",
} as StoreState;

// First, create the thunk
export const fetchProducts = createAsyncThunk(
  "store/fetchProducts",
  async (thunkAPI) => {
    const response = await baseUrl.get("");
    return response.data;
  }
);

const storeSlice = createSlice({
  name: "store",
  initialState,
  reducers: {
    toggleWishlist: (state, action: PayloadAction<number>) => {
      if (!state.wishlist.find((product) => product.id == action.payload)) {
        const product = state.products.find(
          (product) => product.id === action.payload
        );
        state.wishlist = [...state.wishlist, product];
      } else {
        console.log('remove item')
        state.wishlist = [
          ...state.wishlist.filter((product) => product.id !== action.payload),
        ];
      }
    },
    clearWishlist: (state) => {
      state.wishlist = [];
    },
  },
  extraReducers: (builder) => {
    builder.addCase(fetchProducts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(fetchProducts.fulfilled, (state, action) => {
      state.loading = false;
      state.products = action.payload;
      state.error = "";
    });
    builder.addCase(fetchProducts.rejected, (state, action) => {
      const error = action.error.message?.match(/network|timeout/)
        ? "There a network error, please check your connection and try again"
        : action.error.message;
      state.loading = false;
      state.error = error || "Error getting products";
    });
  },
});

export const { toggleWishlist, clearWishlist } = storeSlice.actions;

export default storeSlice.reducer;
