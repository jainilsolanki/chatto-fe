import AppWrapper from "@/app/wrappers/app.wrapper";
import AppLayout from "@/app/components/layouts/app.layout";
import dynamic from "next/dynamic";

const ChatPanel = dynamic(() => import("./chat-panel.component"), {
  ssr: false,
});

const ChatContentPanel = dynamic(
  () => import("../components/chat-content/chat-content-panel.component"),
  { ssr: false }
);

export default function Message() {
  return (
    <>
      <AppWrapper>
        <AppLayout
          leftPanel={<ChatPanel />}
          rightPanel={<ChatContentPanel />}
        />
      </AppWrapper>
    </>
  );
}
