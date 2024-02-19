//@flow
import axios from "axios";
import { baseURL } from "./apiConstants";

const axiosData = {
  baseURL,
  timeout: 120000,
  headers: {
    Accept: "application/json",
    "Content-Type": "application/json",
    // 'x-testing-platform': 'web',
    // 'x-testing-version': '1.0.0',
    "accept-language": "en",
  },
};

var instance = axios.create(axiosData);
// Add a request interceptor
instance.interceptors.request.use(
  async (config) => {
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// Add a response interceptor
instance.interceptors.response.use(
  function (response) {
    return response;
  },
  function (error) {
    // console.log('error', error);
    return Promise.reject(error);
  }
);

export default instance;
