import {
  FETCH_PRODUCTS,
  FETCH_PRODUCTS_ERROR,
  FETCH_PRODUCTS_SUCCESS,
} from "../actions/storeActions";
import { StoreState } from "../state/storeState";
const CLEAR_ERROR = "CLEAR_ERROR";

interface Action {
  type: string;
  payload?: any;
}

const store_reducer = (state: StoreState, action: Action): StoreState => {
  switch (action.type) {
    case FETCH_PRODUCTS: {
      return { ...state, loading: true };
    }
    case FETCH_PRODUCTS_SUCCESS: {
      return {
        ...state,
        loading: false,
        products: action.payload,
      };
    }
    case FETCH_PRODUCTS_ERROR: {
      return {
        ...state,
        loading: false,
        error: action.payload,
      };
    }

    default:
      return state;
  }
};

export default store_reducer;
