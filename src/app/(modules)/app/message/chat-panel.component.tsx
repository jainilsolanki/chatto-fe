"use client";
import { Avatar, Badge, Box, Stack, Typography, useTheme } from "@mui/material";
import React, { useEffect, useRef, useState } from "react";
import { getTimeDifference } from "@/app/data/utils";
import { VOID } from "@/app/data/assets-data";
import { socket } from "@/app/components/socket.connection";
import PanelHeader from "../components/panel-header/panel-header.component";
import CryptoJS from "crypto-js";
import useLoader from "@/app/hooks/useLoaders";
import PanelListSkeletons from "../components/panel-list-skeletons.component";
import UserActivityBadge from "../components/user-activity-badge.component";
import { useParams, useRouter } from "next/navigation";
import { motion } from "framer-motion";
const ChatPanel = () => {
  const router = useRouter();
  const { conversationId } = useParams();
  const [friendsList, setFriendsList] = useState([]);
  const { hideLoader, isLoading } = useLoader(true);
  const theme = useTheme();
  const [activeChatConversationId, setActiveChatConversationId] =
    useState(null);
  const [width, setWidth] = useState(0);
  const containerRef = useRef(null);

  useEffect(() => {
    const updateWidth = () => {
      if (containerRef.current) {
        setWidth(containerRef.current.clientWidth);
      }
    };

    updateWidth(); // Call it once to get the initial width
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, [containerRef, isLoading]);

  function updateLastMessage(value: any) {
    const { message } = value;
    let updatedFriendsList = [...friendsList];
    updatedFriendsList = updatedFriendsList.map((friend: any) => {
      if (friend.user.id === message.senderId) {
        return {
          ...friend,
          chats: {
            ...friend.chats,
            content: message.content,
            createdAt: message.createdAt,
          },
          unreadMessages: message.unread_messages_count,
        };
      } else {
        return friend;
      }
    });
    setFriendsList(updatedFriendsList);

    if (
      conversationId &&
      Number(message.conversationId) === Number(conversationId)
    ) {
      setActiveChatConversationId(message.senderId);
    }
  }

  function updateUserActivity(user: any) {
    let updatedFriendsList = [...friendsList];
    updatedFriendsList = updatedFriendsList.map((friend: any) => {
      if (Number(friend.user.id) === Number(user.user_id)) {
        return {
          ...friend,
          user: {
            ...friend.user,
            status: user.online,
          },
        };
      } else {
        return friend;
      }
    });
    setFriendsList(updatedFriendsList);
  }

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
    socket?.on("message-notification", updateLastMessage);
    socket?.on("activity-changes", updateUserActivity);
    document.addEventListener("message-notification-clicked", (e: any) => {
      const { senderId } = e.detail;
      setActiveChatConversationId(senderId);
    });

    return () => {
      socket?.off("message-notification", updateLastMessage);
      socket?.off("activity-changes", updateUserActivity);
    };
  }, [friendsList, conversationId]);

  useEffect(() => {
    if (activeChatConversationId)
      setTimeout(() => {
        let updatedFriendsList = [...friendsList];
        updatedFriendsList = updatedFriendsList.map((friend: any) => {
          if (friend.user.id === activeChatConversationId) {
            return {
              ...friend,
              unreadMessages: 0,
            };
          } else {
            return friend;
          }
        });
        setFriendsList(updatedFriendsList);
        setActiveChatConversationId(null);
      }, 1000);
  }, [activeChatConversationId]);

  const getSingleChatData = async (conversationId, senderId) => {
    router.push(`/app/message/${conversationId}`);
    try {
      let updatedFriendsList = [...friendsList];
      updatedFriendsList = updatedFriendsList.map((friend: any) => {
        if (friend.user.id === senderId) {
          return {
            ...friend,
            unreadMessages: 0,
          };
        } else {
          return friend;
        }
      });
      setFriendsList(updatedFriendsList);
    } catch (e) {
      console.error(e);
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
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Panel Header */}
        <PanelHeader title={"Messages"} showOptions={true} />
        {/* Chat List */}
        {isLoading ? (
          <PanelListSkeletons />
        ) : (
          <Stack
            ref={containerRef}
            sx={{
              height: {
                xs: "calc(100vh - 124px)",
                sm: "calc(100vh - 124px)",
                md: "calc(100vh - 124px)",
                lg: "95vh",
                xl: "95vh",
              },
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
                    overflow: "hidden",
                  }}
                  onClick={() =>
                    getSingleChatData(user.conversationDetails.id, user.user.id)
                  }
                >
                  <UserActivityBadge
                    status={(user.conversationDetails.id, user.user.status)}
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
                  </UserActivityBadge>
                  <Stack width={"100%"}>
                    <Stack
                      flexGrow={1}
                      justifyContent={"space-between"}
                      direction={"row"}
                    >
                      <Typography
                        variant="body1"
                        fontWeight={"bold"}
                        noWrap
                        sx={{
                          width: "100%",
                          maxWidth: {
                            xs: `calc(${width}px / 2)`,
                            sm: `calc(${width}px / 2)`,
                            md: `calc(${width}px / 2)`,
                            lg: `calc(${width}px / 3)`,
                            xl: `calc(${width}px / 3)`,
                          },
                        }}
                      >
                        {user.user.first_name} {user.user.last_name}
                      </Typography>
                      <Typography
                        variant="body2"
                        color="textSecondary"
                        alignSelf={"flex-start"}
                        noWrap
                      >
                        {getTimeDifference(user.chats.createdAt)}
                      </Typography>
                    </Stack>
                    <Stack
                      direction={"row"}
                      alignItems={"center"}
                      justifyContent={"space-between"}
                    >
                      <Box
                        sx={{
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          width: "100%",
                          maxWidth: `calc(${width}px - 120px)`,
                        }}
                      >
                        <Typography
                          variant="body2"
                          color="textSecondary"
                          noWrap
                          fontWeight={
                            user.unreadMessages > 0 ? "800" : "medium"
                          }
                        >
                          {decryptMessage(
                            user.chats.content,
                            user.conversationDetails.id
                          )}
                        </Typography>
                      </Box>

                      <Badge
                        badgeContent={user.unreadMessages}
                        color="primary"
                        max={9}
                        sx={{
                          mx: 1.2,
                          "& :hover": {
                            background: theme.palette.primary.main,
                          },
                        }}
                      />
                    </Stack>
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
                  loading="lazy"
                  src={VOID}
                  alt="NO_PENDING_MESSAGES_OR_CHATS_BANNER"
                  style={{ maxWidth: 120, maxHeight: 120 }}
                />
                <Typography variant="body1" fontSize={18}>
                  No messages found
                </Typography>
              </Stack>
            )}
          </Stack>
        )}
      </motion.div>
    </>
  );
};

export default ChatPanel;
