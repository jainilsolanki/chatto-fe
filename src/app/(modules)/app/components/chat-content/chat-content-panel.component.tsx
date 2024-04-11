"use client";
import ChatContent from "./components/chat-content.component";
import NoActiveChat from "./components/no-active-chat.component";
import { useSelector } from "react-redux";

const ChatContentPanel = () => {
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);

  return onGoingChatData ? (
    <ChatContent key={onGoingChatData?.conversationId} />
  ) : (
    //No Active Chat Message
    <NoActiveChat />
  );
};
export default ChatContentPanel;
