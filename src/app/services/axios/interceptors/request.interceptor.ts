import { AxiosError, InternalAxiosRequestConfig } from "axios";
import store from "../../redux";

export function axiosRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = store.getState().userData.accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

export function axiosRequestErrorInterceptor(
  error: AxiosError
): Promise<never> {
  console.log("Error Occurred");
  return Promise.reject(error);
}
