import { baseURL } from "@/app/data/constants-data";
import axios from "axios";
import {
  axiosRequestErrorInterceptor,
  axiosRequestInterceptor,
} from "./interceptors/request.interceptor";
import {
  axiosResponseErrorInterceptor,
  axiosResponseInterceptor,
} from "./interceptors/response.interceptor";

export const GlobalInstance = axios.create({
  baseURL: baseURL,
  headers: {
    Accept: "application/json",
  },
});

GlobalInstance.interceptors.request.use(
  axiosRequestInterceptor,
  axiosRequestErrorInterceptor
);

GlobalInstance.interceptors.response.use(
  axiosResponseInterceptor,
  axiosResponseErrorInterceptor
);
