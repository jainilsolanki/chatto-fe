import { userData } from "@/app/data/utils";
import { AxiosError, InternalAxiosRequestConfig } from "axios";

export function axiosRequestInterceptor(config: InternalAxiosRequestConfig) {
  const token = userData?.accessToken;
  config.headers.Authorization = `Bearer ${token}`;

  return config;
}

export function axiosRequestErrorInterceptor(
  error: AxiosError
): Promise<never> {
  console.log("Error Occurred");
  return Promise.reject(error);
}
