import { baseURL } from "@/app/data/constants-data";
import AppWrapper from "@/app/wrappers/app.wrapper";
import { cookies } from "next/headers";
import React from "react";

import AppLayout from "@/app/components/layouts/app.layout";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { VOID } from "@/app/data/assets-data";

import { getTimeDifference } from "@/app/data/utils";
import FriendsPanel from "./friends-panel/friends-panel.component";
import ChatContent from "../message/chat-content/chat-content.component";
async function getAllFriendsList(token) {
  try {
    const request = await fetch(`${baseURL}/friend/list`, {
      headers: {
        "Content-type": "application/json",
        Authorization: `Bearer ${token}`,
      },
    });

    const response = await request.json();
    return response;
  } catch (e) {
    console.log(e);
  }
}
export default async function Friends() {
  const data = await getAllFriendsList(
    JSON.parse(cookies().get("userData").value).accessToken
  );
  const friendsList = data.friends;
  return (
    <AppWrapper>
      <AppLayout
        leftPanel={<FriendsPanel friendsList={friendsList} />}
        rightPanel={<ChatContent />}
      />
    </AppWrapper>
  );
}
