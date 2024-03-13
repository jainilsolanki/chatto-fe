"use client";
import ChatContent from "./components/chat-content.components";
import NoActiveChat from "./components/no-active-chat.component";
import { useSelector } from "react-redux";

const ChatContentPanel = () => {
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);

  return onGoingChatData ? (
    <ChatContent />
  ) : (
    //No Active Chat Message
    <NoActiveChat />
  );
};
export default ChatContentPanel;
