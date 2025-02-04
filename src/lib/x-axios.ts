import axios from "axios";

export const baseURL = "http://localhost:8888";
export const xAxsios = axios.create({
  baseURL,
});

xAxsios.interceptors.response.use(
  (response: any) => {
    if (response && response.data.data) {
      return response.data;
    }
    return response;
  },
  (error) => {
    return Promise.reject(error);
  },
);
