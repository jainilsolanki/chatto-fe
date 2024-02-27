import { GlobalInstance } from "..";

export const FriendAPI = {
  sendFriendRequest: async (data: any) => {
    const request = await GlobalInstance.request({
      url: "/friend/req",
      method: "POST",
      data,
    });
    const response = await request.data;
    return response;
  },
  getFriendsList: async () => {
    const request = await GlobalInstance.request({
      url: "/friend/req/list",
      method: "GET",
    });
    const response = await request.data;
    return response;
  },
  sendFriendRequestResponse: async ({ id, status }: any) => {
    const request = await GlobalInstance.request({
      url: `/friend/req/response/${id}`,
      method: "PUT",
      data: { status: status },
    });
    const response = await request.data;
    return response;
  },
  getSingleChatData: async (data: any) => {
    const request = await GlobalInstance.request({
      url: `/chat/list?conversationId=${data}`,
      method: "GET",
    });
    const response = await request.data;
    return response;
  },
};
