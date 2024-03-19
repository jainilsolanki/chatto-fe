"use client";
import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
import addNotification from "react-push-notification";
import { FriendAPI } from "../services/axios/apis/friend.api";
import { useDispatch, useSelector } from "react-redux";
import { saveOnGoingChatData } from "../services/redux/slices/ongoing-chat-data.slice";
export let socket: any;
const SocketConnection = () => {
  const { userData } = useUserData();
  const accessToken = userData ? userData.accessToken : null;
  const dispatch = useDispatch();
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);
  useEffect(() => {
    if (accessToken)
      socket = io(socketURL, {
        query: {
          token: accessToken,
        },
        transports: ["websocket", "polling"],
      });
    return () => {
      socket?.disconnect();
    };
  }, [userData]);

  const getSingleChatData = async (data) => {
    try {
      const response = await FriendAPI.getSingleChatData(data);
      console.log(response);
      dispatch(
        saveOnGoingChatData({
          conversationId: Number(response.conversationId),
          chatList: response.chatList,
          messageReceiver: response.messageReceiver,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    function onMessageNotification(value: any) {
      const { message } = value;
      console.log("onMessageNotification", message);
      const content = message.content.replace(/(<([^>]+)>)/gi, "");
      if (message.conversationId !== onGoingChatData.conversationId) {
        addNotification({
          title: `New message from ${message.username}`,
          message: content,
          theme: "darkblue",
          native: true,
          icon: "/assets/logos/logo.png",
          onClick: () => {
            window && window.focus();
            getSingleChatData(message.conversationId);
          },
          vibrate: [100000],
        });
      }
    }

    socket?.on("message-notification", onMessageNotification);

    return () => {
      socket?.off("message-notification", onMessageNotification);
    };
  }, [userData]);
  return <></>;
};
export default SocketConnection;
