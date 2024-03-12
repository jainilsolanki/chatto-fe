"use client";

import { useEffect } from "react";
import { socketURL } from "../data/constants-data";
import { io } from "socket.io-client";
import { parseCookies } from "nookies";
export let socket: any;
const SocketConnection = () => {
  const cookies = parseCookies();
  const accessToken = JSON.parse(cookies["userData"] ?? null).accessToken;
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
  }, [accessToken]);
  return <></>;
};
export default SocketConnection;
