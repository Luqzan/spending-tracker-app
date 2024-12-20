import axios from "axios";

const instance = axios.create({
  baseURL: "http://localhost:8000/api",
  validateStatus: false,
  withCredentials: true,
});

axios.defaults.headers.post["Content-Type"] =
  "application/x-www-form-urlencoded";

export default instance;
