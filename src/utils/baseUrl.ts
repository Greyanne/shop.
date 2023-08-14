import axios from "axios";
import { API_ENDPOINT } from "./constants";

const baseUrl = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 15000,
//   headers: {
//     Authorization: `Bearer ${token}`,
//   },
});

// baseUrl.interceptors.request.use(
//   (req) => {
//     req.headers.authorization = `Bearer ${getUserToken()}`;
//     return req;
//   },
//   (err) => {
//     if (err.response.status === 404) {
//       throw new Error(`${err.config.url} not found`);
//     }
//     throw err;
//   }
// );

export default baseUrl;
