"use client";
import {
  Avatar,
  Badge,
  Box,
  Skeleton,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import { getTimeDifference } from "@/app/data/utils";
import { VOID } from "@/app/data/assets-data";
import { socket } from "@/app/components/socket.connection";
import { useDispatch } from "react-redux";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { saveOnGoingChatData } from "@/app/services/redux/slices/ongoing-chat-data.slice";
import PanelHeader from "../components/panel-header/panel-header.component";
import CryptoJS from "crypto-js";
import useLoader from "@/app/hooks/useLoaders";
import PanelListSkeletons from "../components/panel-list-skeletons.component";
const ChatPanel = () => {
  const dispatch = useDispatch();
  const [friendsList, setFriendsList] = useState([]);
  const { hideLoader, isLoading } = useLoader(true);
  const theme = useTheme();
  useEffect(() => {
    function onFriendsList(value: any) {
      hideLoader();
      const { conversationList } = value;
      setFriendsList(conversationList);
    }

    socket?.on("conversation-list", onFriendsList);

    return () => {
      socket?.off("conversation-list", onFriendsList);
    };
  }, []);

  useEffect(() => {
    function updateLastMessage(value: any) {
      const { message } = value;
      let updatedFriendsList = [...friendsList];

      updatedFriendsList = updatedFriendsList.map((friend: any) => {
        if (friend.user.id === message.senderId) {
          return {
            ...friend,
            chats: { ...friend.chats, content: message.content },
          };
        } else {
          return friend;
        }
      });

      setFriendsList(updatedFriendsList);
    }
    socket?.on("message-notification", updateLastMessage);

    return () => {
      socket?.off("message-notification", updateLastMessage);
    };
  }, [friendsList]);

  const getSingleChatData = async (conversationId) => {
    try {
      const response = await FriendAPI.getSingleChatData(conversationId, 0);
      dispatch(
        saveOnGoingChatData({
          conversationId: Number(response.conversationId),
          chatList: response.chatList,
          messageReceiver: response.messageReceiver,
          totalChatCount: response.totalChatCount,
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
    //removed all html and kept only normal texts
    const content = decryptedMessage.replace(/(<([^>]+)>)/gi, "");
    return content;
  };
  return (
    <>
      {/* Panel Header */}
      <PanelHeader title={"Messages"} showOptions={true}/>
      {/* Chat List */}
      {isLoading ? (
        <PanelListSkeletons />
      ) : (
        <Stack
          height={"calc(80vh - 40px)"}
          sx={{
            overflow: "auto",
            "& :hover": {
              background:
                friendsList.length !== 0
                  ? theme.palette.mode === "light"
                    ? theme.palette.primary.light
                    : theme.palette.primary.main
                  : "unset",
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
                <Stack width={"100%"}>
                  <Stack
                    flexGrow={1}
                    justifyContent={"space-between"}
                    direction={"row"}
                  >
                    <Typography variant="body1" fontWeight={"bold"}>
                      {user.user.first_name} {user.user.last_name}
                    </Typography>
                    <Typography
                      variant="body2"
                      color="textSecondary"
                      alignSelf={"flex-start"}
                    >
                      {getTimeDifference(user.chats.createdAt)}
                    </Typography>
                  </Stack>
                  <Box
                    sx={{
                      overflow: "hidden",
                      textOverflow: "ellipsis",
                      width: "15vw",
                    }}
                  >
                    <Typography variant="body2" color="textSecondary" noWrap>
                      {decryptMessage(
                        user.chats.content,
                        user.conversationDetails.id
                      )}
                    </Typography>
                  </Box>
                </Stack>
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
      )}
    </>
  );
};

export default ChatPanel;
