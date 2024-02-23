import AppWrapper from "@/app/wrappers/app.wrapper";
import AppLayout from "@/app/components/app.layout";
import ChatPanel from "./chat-panel/chat-panel.component";
import ChatContent from "./chat-content/chat-content.component";
import AddFriendDialog from "./components/add-friend-dialog.component";
import StartConversationConfirmationDialog from "./components/start-converstation.dialog";

export default function Message() {
  return (
    <>
      <AppWrapper>
        <AppLayout leftPanel={<ChatPanel />} rightPanel={<ChatContent />} />
      </AppWrapper>
      <AddFriendDialog />
      <StartConversationConfirmationDialog />
    </>
  );
}
