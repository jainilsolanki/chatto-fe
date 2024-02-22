import { GlobalInstance } from "..";

export const AuthAPI = {
  login: async (data: any) => {
    const request = await GlobalInstance.request({
      url: "/api/login",
      method: "POST",
      data: data,
    });
    const response = await request.data;
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
