import AppLayout from "@/app/components/layouts/app.layout";
import AppWrapper from "@/app/wrappers/app.wrapper";
import ChatPanel from "./chat-panel.component";

export default function ActiveChatLayout({ children }) {
  return (
    <AppWrapper>
      <AppLayout leftPanel={<ChatPanel />} rightPanel={children} />
    </AppWrapper>
  );
}
