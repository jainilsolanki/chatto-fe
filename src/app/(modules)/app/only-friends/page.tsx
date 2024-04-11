import AppWrapper from "@/app/wrappers/app.wrapper";
import React from "react";
import AppLayout from "@/app/components/layouts/app.layout";
import dynamic from "next/dynamic";

const FriendsPanel = dynamic(
  () => import("./friends-panel/friends-panel.component"),
  {
    ssr: false,
  }
);

const ChatContentPanel = dynamic(
  () => import("../components/chat-content/chat-content-panel.component"),
  { ssr: false }
);

export default function Friends() {
  return (
    <AppWrapper>
      <AppLayout
        leftPanel={<FriendsPanel />}
        rightPanel={<ChatContentPanel />}
      />
    </AppWrapper>
  );
}
