import { AxiosError, InternalAxiosRequestConfig } from "axios";
import { parseCookies } from "nookies";

export function axiosRequestInterceptor(config: InternalAxiosRequestConfig) {
  const cookies = parseCookies();
  if (cookies["userData"]) {
    const token = JSON.parse(cookies["userData"]).accessToken;
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
}

export function axiosRequestErrorInterceptor(
  error: AxiosError
): Promise<never> {
  console.log("Error Occurred");
  return Promise.reject(error);
}
