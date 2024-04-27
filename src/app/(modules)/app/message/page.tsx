import { Hidden } from "@mui/material";
import NoActiveChat from "../components/chat-content/components/no-active-chat.component";
import ChatPanel from "./chat-panel.component";

export default function Message() {
  return (
    <>
      <Hidden mdDown>
        <NoActiveChat />
      </Hidden>

      <Hidden lgUp>
        <ChatPanel />
      </Hidden>
    </>
  );
}
