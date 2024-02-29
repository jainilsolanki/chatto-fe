"use client";

import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import { userData } from "../data/utils";
export let socket: any;
const SocketConnection = () => {
  useEffect(() => {
    if (userData?.accessToken)
      socket = io(socketURL, {
        query: {
          token: userData?.accessToken,
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
