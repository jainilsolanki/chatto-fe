// useSocketEmit.js
import { useCallback, useContext } from "react";
import { socket } from "../components/socket.connection";

export function useSocketEmit() {
  const emitEvent = useCallback(
    (eventType, data) => {
      socket?.emit(eventType, data);
    },
    [socket]
  );

  return {
    emitEvent,
  };
}
