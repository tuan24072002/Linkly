import axios from "axios";

export const axiosIntance = axios.create({
  baseURL: `${import.meta.env.VITE_BACKEND_URL}/api`,
  withCredentials: true, // send coookies with requests
  timeout: 10000,
});
