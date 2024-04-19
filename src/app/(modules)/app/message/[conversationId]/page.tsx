import ChatContent from "../../components/chat-content/components/chat-content.component";
import ActiveChatLayout from "../layout";

export default function ActiveChat({ params }: any) {
  return (
    <>
      <ChatContent conversationId={Number(params.conversationId)} />
    </>
  );
}
