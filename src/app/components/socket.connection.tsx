"use client";

import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import store from "../services/redux";
export let socket: any;
const SocketConnection = () => {
  useEffect(() => {
    if (store.getState().userData.accessToken)
      socket = io(socketURL, {
        query: {
          token: store.getState().userData.accessToken,
        },
        transports: ["websocket", "polling"],
      });
    return () => {
      socket?.disconnect();
    };
  }, []);
  return <></>;
};
export default SocketConnection;
