import { baseURL } from "@/app/data/constants-data";
import { GlobalInstance } from "..";

export const AuthAPI = {
  //fetch because running on server side
  login: async (email, password) => {
    const request = await fetch(`${baseURL}/api/login`, {
      headers: {
        "Content-type": "application/json",
      },
      method: "POST",
      body: JSON.stringify({
        email,
        password,
      }),
    });
    const response = await request.json();
    return response;
  },
  signup: async (data: any) => {
    const request = await GlobalInstance.request({
      url: "/api/signup",
      method: "POST",
      data: data,
    });
    const response = await request.data;
    return response;
  },
};
