import axios from "axios";
import store from "@/store/store";

const api = axios.create({
  baseURL: "http://localhost:8000",
  timeout: 3000,
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + store.state.user.token,
  };
  console.log(config.headers); 
  return config;
});

api.interceptors.response.use((result) => {
  return result;
});

export default api;

