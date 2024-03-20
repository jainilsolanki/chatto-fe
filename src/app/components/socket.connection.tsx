"use client";
import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
import { FriendAPI } from "../services/axios/apis/friend.api";
import { useDispatch } from "react-redux";
import { saveOnGoingChatData } from "../services/redux/slices/ongoing-chat-data.slice";
export let socket: any;
const SocketConnection = () => {
  const { userData } = useUserData();
  const accessToken = userData ? userData.accessToken : null;
  const dispatch = useDispatch();
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
      const notification = new Notification(
        `New message from ${message.username}`,
        {
          body: `${content}`,
          icon: "/assets/logos/logo.png",
          silent: false,
        }
      );
      new Audio(
        "https://www.soundhelix.com/examples/mp3/SoundHelix-Song-1.mp3"
      ).play();
      notification.onclick = () => {
        window && window.focus();
        getSingleChatData(message.conversationId);
      };
    }

    socket?.on("message-notification", onMessageNotification);

    return () => {
      socket?.off("message-notification", onMessageNotification);
    };
  }, [userData]);
  return <></>;
};
export default SocketConnection;
