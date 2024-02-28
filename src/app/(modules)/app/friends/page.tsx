import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import AppWrapper from "@/app/wrappers/app.wrapper";
import React from "react";

function getAllfriends() {
  const response = FriendAPI.getAllFriends();

  return response;
}
export default async function Friends() {
  const data = await getAllfriends();

  console.log(data);
  return (
    <AppWrapper>
      <h1 style={{ margin: "auto", textAlign: "center" }}>Only Friends</h1>
    </AppWrapper>
  );
}
