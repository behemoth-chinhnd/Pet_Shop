import request from "axios"
import store from "@/store/store";

const api = request.create({
  baseURL: process.env.VUE_APP_API
});

api.interceptors.request.use((config) => {
  config.headers = {
    Authorization: "Bearer " + store.state.AUTH.state.userToken,
  };
  // console.log(config.headers); 
  return config;
});

api.interceptors.response.use((result) => {
  return result;
});


export default api;

