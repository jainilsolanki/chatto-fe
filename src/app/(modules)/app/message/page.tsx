import AppWrapper from "@/app/wrappers/app.wrapper";
import AppLayout from "@/app/components/layouts/app.layout";
import ChatPanel from "./chat-panel.component";
import ChatContentPanel from "../components/chat-content/chat-content-panel.component";

export default function Message() {
  return (
    <>
      <AppWrapper>
        <AppLayout leftPanel={<ChatPanel />} rightPanel={<ChatContentPanel />} />
      </AppWrapper>
    </>
  );
}
