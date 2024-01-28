import axios from "axios";
// const token = localStorage.getItem("token");
export const baseURL = `http://system.ajoyib-fastfood.uz`;

const axiosInstance = axios.create({
  baseURL: baseURL,
});

export default axiosInstance;
