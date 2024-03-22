"use client";
import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
import { FriendAPI } from "../services/axios/apis/friend.api";
import { useDispatch } from "react-redux";
import { saveOnGoingChatData } from "../services/redux/slices/ongoing-chat-data.slice";
import store from "../services/redux";
export let socket: any;
let preventNotification = false;
let lastNotification: any = null;
const SocketConnection = () => {
  const { userData } = useUserData();
  const accessToken = userData ? userData.accessToken : null;
  const dispatch = useDispatch();
  const requestNotificationPermission = async () => {
    try {
      await Notification.requestPermission();
    } catch (error) {
      console.error("Failed to request notification permission:", error);
    }
  };
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
    if (data === store?.getState()?.onGoingChatData?.conversationId) return;
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
    requestNotificationPermission();
    function onMessageNotification(value: any) {
      const { message } = value;
      console.log(
        "onMessageNotification",
        message,
        "store?.getState()?.onGoingChatData?.conversationId",
        store?.getState()?.onGoingChatData?.conversationId
      );
      //code for checking notification access
      if (
        message.conversationId ===
          store?.getState()?.onGoingChatData?.conversationId &&
        document.visibilityState === "visible"
      )
        return;

      const content = message.content.replace(/(<([^>]+)>)/gi, "");
      if (preventNotification) {
        lastNotification = value;
        return;
      }

      const notification = new Notification(
        `New message from ${message.username}`,
        {
          body: `${content}`,
          icon: "/assets/logos/logo.png",
          silent: false,
        }
      );
      let aud = new Audio("/assets/notifications/notification.mp3");
      preventNotification = true;
      lastNotification = null;
      aud.play().catch(() => {
        preventNotification = false;
        lastNotification !== null && onMessageNotification(lastNotification);
      });
      aud.onended = () => {
        preventNotification = false;
        lastNotification !== null && onMessageNotification(lastNotification);
      };

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
