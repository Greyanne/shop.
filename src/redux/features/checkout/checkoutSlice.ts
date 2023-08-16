import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface Card {
  cvv: string;
  expiryMonth: string | null;
  expiryYear: string | null;
  cardNumber: string;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone: number|string;
  address: {
    city: string;
    country: string;
  };
}

export interface CheckoutState {
  contact: ContactDetails | null;
  card: Card | null;
  loading: false;
  error: "";
}

export const initialState = {
  contact: null,
  card: null,
  loading: false,
  error: "",
} as CheckoutState;

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    addContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.contact = action.payload;
    },
    addCardDetails: (state, action: PayloadAction<Card>) => {
      state.card = action.payload;
    },
  },
});

export const {addCardDetails, addContactDetails} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
