import axios from "axios";
import Cookies from "js-cookie"; // Ensure js-cookie is installed
const apiUrl = "http://192.168.123.152:8000/api/v1/guest";

const GuestAxios = axios.create({
  baseURL: apiUrl,
  headers: {
    Accept: "application/json",
  },
});

// Get the token from cookies
let UUID = Cookies.get("guestUUID");

// Add a request interceptor
GuestAxios.interceptors.request.use(
  (config) => {
    // Check if UUID exists and then add it to the headers
    if (UUID) {
      config.headers['guest-uuid'] = UUID; // or any header key your backend expects
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default GuestAxios;