import axios from "axios";

const api = axios.create({
  baseURL: "http://74.225.166.12/api/",
  withCredentials: true,
});

export default api;