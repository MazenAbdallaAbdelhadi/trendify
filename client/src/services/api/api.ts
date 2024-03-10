import axios from "axios";

const BASE_URL = "http://localhost:3000/api";

export const apiInstance = axios.create({ baseURL: BASE_URL });

export const privateInstance = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
});
