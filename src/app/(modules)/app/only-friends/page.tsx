import React from "react";
import NoActiveChat from "../components/chat-content/components/no-active-chat.component";
import FriendsPanel from "./friends-panel/friends-panel.component";
import { Hidden } from "@mui/material";

export default function Friends() {
  return (
    <>
      <Hidden mdDown>
        <NoActiveChat />
      </Hidden>

      <Hidden lgUp>
        <FriendsPanel />
      </Hidden>
    </>
  );
}
