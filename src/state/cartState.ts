import { Product } from "../components/ProductsContainer";

export interface CartState {
  products: any[];
  count: number;
  loading: boolean;
  error: string;
}

export interface ICartContext extends CartState {
  addToCart: (id:number) => void;
  decrementCartItem: (id:number) => void;
  removeCartItem: (id:number) => void;
  clearCart: () => void;
}

export const InitialCartState = {
  products: [],
  count: 0,
  loading: false,
  error: "",
};
