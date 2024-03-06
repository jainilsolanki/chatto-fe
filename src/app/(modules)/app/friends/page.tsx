import { baseURL } from "@/app/data/constants-data";
import AppWrapper from "@/app/wrappers/app.wrapper";
import { cookies } from "next/headers";
import React from "react";
import FriendItem from "./components/friend-item";

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
  return (
    <AppWrapper>
      {/* <h1 style={{ margin: "auto", textAlign: "center" }}>Only Friends</h1> */}
      {data.friends.map((friend) => {
        console.log("friend", friend);
        return <FriendItem key={friend.id} />;
      })}
    </AppWrapper>
  );
}
