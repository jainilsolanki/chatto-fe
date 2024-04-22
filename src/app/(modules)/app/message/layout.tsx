import AppLayout from "@/app/components/layouts/app.layout";
import ChatPanel from "./chat-panel.component";

export default function ActiveChatLayout({ children }) {
  return <AppLayout leftPanel={<ChatPanel />} rightPanel={children} />;
}
