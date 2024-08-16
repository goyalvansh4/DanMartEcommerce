import axios from "axios";
import Cookies from "js-cookie"; // Make sure you have this package installed
const apiUrl = "http://192.168.123.152:8000/api/v1/user";

const GlobalAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

// Get the token from cookies
let token = Cookies.get("authToken");
// Add a request interceptor
GlobalAxios.interceptors.request.use(
  (config) => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default GlobalAxios;
