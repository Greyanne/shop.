import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import { CardDetails, CheckoutState, ContactDetails } from "../../../types";

const initialContactState = {
  name: "",
  email: "",
  phone: "",
  address: {
    city: "",
    country: "",
  },
};

const initialCardState = {
  cvv: '',
  expirationDate: '',
  cardNumber: '',
  cardHolderName: '',
};

export const initialState = {
  contact: initialContactState, //as ContactDetails ,//initialContactState,
  card: initialCardState,
  hasContact: false,
  hasCard: false,
  loading: false,
  error: "",
} as CheckoutState;

const CheckoutSlice = createSlice({
  name: "Checkout",
  initialState,
  reducers: {
    addContactDetails: (state, action: PayloadAction<ContactDetails>) => {
      state.contact = action.payload;
      state.hasContact = true;
    },
    addCardDetails: (state, action: PayloadAction<CardDetails>) => {
      state.card = action.payload;
      state.hasCard = true;
    },
    removeContactDetails: (state) => {
      state.contact = initialContactState
      state.hasContact = false;
    },
    removeCardDetails: (state) => {
      state.card = initialCardState
      state.hasCard = false;
    },
  },
});

export const {
  addCardDetails,
  addContactDetails,
  removeContactDetails,
  removeCardDetails,
} = CheckoutSlice.actions;

export default CheckoutSlice.reducer;
