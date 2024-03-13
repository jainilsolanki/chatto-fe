"use client";

import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import useUserData from "../hooks/useUserData";
export let socket: any;
const SocketConnection = () => {
  const { userData } = useUserData();
  const accessToken = userData ? userData.accessToken : null;
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
  return <></>;
};
export default SocketConnection;
