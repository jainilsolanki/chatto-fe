"use client";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTimeDifference } from "@/app/data/utils";
import { VOID } from "@/app/data/assets-data";
import { socket } from "@/app/components/socket.connection";
import { useDispatch } from "react-redux";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { saveOnGoingChatData } from "@/app/services/redux/slices/ongoing-chat-data.slice";
import PanelHeader from "../components/panel-header/panel-header.component";
import CryptoJS from "crypto-js";
const ChatPanel = () => {
  const dispatch = useDispatch();
  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    function onFriendsList(value: any) {
      // setFooEvents(fooEvents.concat(value));
      const { conversationList } = value;
      console.log("list value: ", value.conversationList);
      setFriendsList(conversationList);
    }

    socket?.on("conversation-list", onFriendsList);

    return () => {
      socket?.off("conversation-list", onFriendsList);
    };
  }, []);

  const getSingleChatData = async (data) => {
    try {
      const response = await FriendAPI.getSingleChatData(data);
      console.log(response);
      dispatch(
        saveOnGoingChatData({
          conversationId: Number(response.conversationId),
          chatList: response.chatList,
          messageReceiver: response.messageReceiver,
        })
      );
    } catch (e) {
      console.log(e);
    }
  };

  const decryptMessage = (
    encryptedMessage: string | undefined,
    conversationId: string
  ) => {
    if (!encryptedMessage) return ""; // Check if encryptedMessage is undefined or falsy

    const bytes = CryptoJS.AES.decrypt(
      encryptedMessage,
      String(conversationId)
    );
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  };
  return (
    <>
      {/* Panel Header */}
      <PanelHeader title={"Messages"} />
      {/* Chat List */}
      <Stack
        height={"calc(80vh - 40px)"}
        sx={{
          overflow: "auto",
          "& :hover": {
            background: friendsList.length !== 0 ? "#d3eae8" : "unset",
            cursor: "pointer",
          },
        }}
        p={1}
      >
        {friendsList.length !== 0 ? (
          friendsList.map((user) => (
            <Box
              key={user.user.id}
              display="flex"
              alignItems="center"
              py={1}
              px={1}
              sx={{
                borderRadius: 5,
              }}
              onClick={() => getSingleChatData(user.conversationDetails.id)}
            >
              <Badge
                overlap="circular"
                // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                // invisible={!user.is_online}
                sx={{
                  marginRight: "10px",

                  "& .MuiBadge-badge": {
                    backgroundColor: "#44b700",
                    color: "#44b700",
                    // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
                    "&::after": {
                      position: "absolute",
                      top: 0,
                      left: 0,
                      width: "100%",
                      height: "100%",
                      borderRadius: "50%",
                      animation: "ripple 1.2s infinite ease-in-out",
                      border: "1px solid currentColor",
                      content: '""',
                    },
                  },
                  "@keyframes ripple": {
                    "0%": {
                      transform: "scale(.8)",
                      opacity: 1,
                    },
                    "100%": {
                      transform: "scale(2.4)",
                      opacity: 0,
                    },
                  },
                }}
              >
                <Avatar
                  sx={{
                    // bgcolor: getRandomColor(),
                    width: 45,
                    height: 45,
                    borderRadius: 4,
                  }}
                  src={user.profile_picture}
                  alt={"No Image"}
                >
                  {user.user.first_name.charAt(0).toUpperCase() +
                    user.user.last_name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              <Box flexGrow={1}>
                <Typography variant="body1" fontWeight={"bold"}>
                  {user.user.first_name} {user.user.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {decryptMessage(
                    user.chats.content,
                    user.conversationDetails.id
                  )}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                alignSelf={"flex-start"}
              >
                {getTimeDifference(user.chats.createdAt)}
              </Typography>
            </Box>
          ))
        ) : (
          <Stack
            alignItems={"center"}
            justifyContent={"center"}
            height={"100%"}
            gap={2}
          >
            <img
              src={VOID}
              alt="No Pending messages or chats"
              style={{ maxWidth: 120, maxHeight: 120 }}
            />
            <Typography variant="body1" fontSize={18}>
              No messages found
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
};

export default ChatPanel;
