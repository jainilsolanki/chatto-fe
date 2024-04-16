export type OnGoinghatData = {
  conversationId: number;
  chatList: Chat[];
  messageReceiver: ChatReceiver | {};
  totalChatCount: number;
  unreadMessagesCount: number;
} | null;

export type Chat = {
  content: string;
  createdAt: string;
  sender: ChatSender;
};

type ChatSender = {
  first_name: string;
  last_name: string;
  id: number;
};

type ChatReceiver = ChatSender;
