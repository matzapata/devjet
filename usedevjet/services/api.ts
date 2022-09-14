import axios, { HeadersDefaults } from "axios";

export interface AxiosDefaultHeaders extends HeadersDefaults {
  Authorization?: string;
}

const api = axios.create({
  baseURL: process.env.NEXT_PUBLIC_API_URL,
});

export default api;
