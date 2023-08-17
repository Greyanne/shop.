import axios from "axios";
import { API_ENDPOINT } from "./constants";

const baseUrl = axios.create({
  baseURL: API_ENDPOINT,
  timeout: 15000,
});

export default baseUrl;
