"use client";
import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
import { FriendAPI } from "../services/axios/apis/friend.api";
import { useDispatch, useSelector } from "react-redux";
import { saveOnGoingChatData } from "../services/redux/slices/ongoing-chat-data.slice";
import store from "../services/redux";
import { usePathname, useRouter } from "next/navigation";
import { updateSelectedSection } from "../services/redux/slices/temp-data.slice";
export let socket: any;
let preventNotification = false;
let lastNotification: any = null;
const SocketConnection = () => {
  const appData = useSelector((store: any) => store.appData);
  const { notificationSettings } = appData;
  const { appLockSettings } = appData;
  const { userData } = useUserData();
  const accessToken = userData ? userData.accessToken : null;
  const dispatch = useDispatch();
  const router = useRouter();
  const currentPath = usePathname();
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

  const getSingleChatData = async (conversationId) => {
    if (conversationId === store?.getState()?.onGoingChatData?.conversationId)
      return;
    try {
      const response = await FriendAPI.getSingleChatData(conversationId, 0);
      console.log(response);
      if (currentPath !== "/app/message") {
        router.push("/app/message");
        dispatch(updateSelectedSection(3));
      }
      dispatch(
        saveOnGoingChatData({
          conversationId: Number(response.conversationId),
          chatList: response.chatList,
          messageReceiver: response.messageReceiver,
          totalChatCount: response.totalChatCount,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    //code for checking notification access
    requestNotificationPermission();
    function onMessageNotification(value: any) {
      const { message } = value;
      console.log(
        "onMessageNotification",
        message,
        "store?.getState()?.onGoingChatData?.conversationId",
        store?.getState()?.onGoingChatData?.conversationId
      );

      // don't send notification if notifications are paused or app is locked
      if (notificationSettings.paused === "yes" || appLockSettings.lockState)
        return;

      // don't send notification of person who the user is currently interacting with
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
          requireInteraction:
            notificationSettings.autohide === "yes" ? false : true,
        }
      );
      let aud = new Audio(
        notificationSettings.notification ??
          "/assets/notifications/default-notification.mp3"
      );
      aud.muted = notificationSettings.muted === "yes" ? true : false;
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
  }, [userData, appData]);
  return <></>;
};
export default SocketConnection;
