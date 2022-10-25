import request from "axios"
import store from "@/store/store";

const api = request.create({
  baseURL: process.env.VUE_APP_API
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + store.state.ADAU.state.adminToken
  };
  return config;
});

api.interceptors.response.use((result) => {
  return result;
});


export default api;