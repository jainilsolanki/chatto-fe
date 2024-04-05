import { NUMBER_OF_CHATS_PER_PAGE_LIMIT } from "@/app/data/constants-data";
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
  getSingleChatData: async (conversationId: any, skip: any) => {
    const request = await GlobalInstance.request({
      url: `/chat/list?conversationId=${conversationId}&skip=${skip}&limit=${NUMBER_OF_CHATS_PER_PAGE_LIMIT}`,
      method: "GET",
    });
    const response = await request.data;
    return response;
  },
  getAllFriends: async () => {
    const request = await GlobalInstance.request({
      url: `/friend/list`,
      method: "GET",
    });
    const response = await request.data;
    return response;
  },
  createGroup: async (data: any) => {
    const request = await GlobalInstance.request({
      url: "/chat/group/create",
      method: "POST",
      data,
    });
    const response = await request.data;
    return response;
  },
};
