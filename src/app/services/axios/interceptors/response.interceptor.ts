import axios, { AxiosError, AxiosResponse } from "axios";

export function axiosResponseInterceptor(config: AxiosResponse) {
  // console.log("Response Received");

  return config;
}

export async function axiosResponseErrorInterceptor(
  error: any
): Promise<never> {
  if (error.code) {
    const statusCode = error.response?.status;
    const statusText = error.response?.statusText;
    const errorMessage = error.response?.data?.message;
    // || error.response?.data?.message?.values((data:any)=> console.log(data));

    const originalRequest = error.config;
    if (statusCode === 401) {
    }
    // enqueueSnackbar(errorMessage, { variant: "error" });
  }

  return Promise.reject(error);
}
