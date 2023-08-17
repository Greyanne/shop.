import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";

export interface CardDetails {
  cvv: string;
  expirationDate: string;
  cardNumber: string;
  cardHolderName: string;
}

export interface ContactDetails {
  name: string;
  email: string;
  phone: number | string;
  address: {
    city: string;
    country: string;
  };
}

export interface CheckoutState {
  contact: ContactDetails;
  card: CardDetails;
  hasContact: boolean;
  hasCard: boolean;
  loading: boolean;
  error: string;
}

const initialContactState = {
  name: "Fav",
  email: "example@gmail.com",
  phone: "123",
  address: {
    city: "Enugu",
    country: "Nigeria",
  },
};

// const initialCardState = {
//   cvv: "",
//   expiryMonth: "",
//   expiryYear: "",
//   cardNumber: "",
// };

export const initialState = {
  contact: { ...initialContactState }, //as ContactDetails ,//initialContactState,
  card: {}, //initialCardState,
  hasContact: false,
  hasCard: false,
  loading: false,
  error: "",
} as CheckoutState;

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    'addContactDetails': (state, action: PayloadAction<ContactDetails>) => {
      state.contact = action.payload;
      state.hasContact = true;
      console.log("Adding contact details::: ", action.payload);
    },
    'addCardDetails': (state, action: PayloadAction<CardDetails>) => {
      console.log("Adding card details::: ", action.payload);
      state.card = action.payload;
      state.hasCard = true;
    },
  },
});

export const { addCardDetails, addContactDetails } = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
