import {
  ADD_TO_CART,
  CLEAR_CART,
  DECREMENT_CART_ITEM,
  REMOVE_CART_ITEM,
  SET_CART_ITEMS,
} from "../actions/cartActions";
import { CartState, InitialCartState } from "../state/cartState";
const CLEAR_ERROR = "CLEAR_ERROR";

interface Action {
  type: string;
  payload?: any;
}

const cart_reducer = (state: CartState, action: Action): CartState => {
  switch (action.type) {
    case SET_CART_ITEMS: {
      return {
        ...state,
        products: action.payload,
      };
    }

    case ADD_TO_CART: {
      const existingProduct = state.products.find(
        (product) => product.id === action.payload.id
      );

      if (existingProduct) {
        // If the product already exists in the cart, increment its count
        const updatedProducts = state.products.map((product) => {
          if (product.id === existingProduct.id) {
            return {
              ...product,
              count: product.count + 1,
            };
          }
          return product;
        });

        return {
          ...state,
          products: updatedProducts,
          count: state.count + 1,
        };
      } else {
        // If the product is not in the cart, add it with a count of 1
        const newProduct = {
          ...action.payload,
          count: 1,
        };

        return {
          ...state,
          products: [...state.products, newProduct],
          count: state.count + 1,
        };
      }
    }

    case REMOVE_CART_ITEM: {
      const product = state.products.find((v) => v.id == action.payload);
      return {
        ...state,
        products: [...state.products.filter((v) => v.id != action.payload)],
        count: state.count - product.count,
      };
    }

    case DECREMENT_CART_ITEM: {
      const existingProduct = state.products.find(
        (product) => product.id == action.payload
      );

      if (existingProduct) {
        // If the product already exists in the cart, increment its count
        const updatedProducts = state.products.map((product) => {
          if (product.id === existingProduct.id) {
            return {
              ...product,
              count: product.count - 1,
            };
          }
          return product;
        });

        return {
          ...state,
          products: updatedProducts,
          count: state.count - 1,
        };
      }
    }

    
    case CLEAR_CART: {
      return InitialCartState;
    }

    default:
      return state;
  }
};

export default cart_reducer;
