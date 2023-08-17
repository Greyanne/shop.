export interface Product {
  title: string;
  image: string;
  price: string;
  description: string;
  id: number;
  category: string;
  count?:number
}

export interface Alert {
  show: boolean;
  message?: string;
  key?: string;
}

export interface CardDetails {
  cvv: string;
  expirationDate: string;
  cardNumber: string|number;
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


