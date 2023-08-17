import baseUrl from "./baseUrl";

const productApi = {
  fetchById: (id: string | number) => baseUrl.get(`/products/${id}`),
};

export default productApi;
