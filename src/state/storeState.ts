export interface StoreState {
  products: any[];
  loading: boolean;
  error: string;
}

export interface IStoreContext extends StoreState {
  fetchSingleProduct: (id: number) => Promise<any>
}

export const InitialStoreState = {
  products: [],
  loading: false,
  error: "",
};
