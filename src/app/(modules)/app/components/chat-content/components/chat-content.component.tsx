"use client";
import {
  Avatar,
  Box,
  Chip,
  CircularProgress,
  Divider,
  Skeleton,
  Stack,
  Tooltip,
  Typography,
  useTheme,
} from "@mui/material";
import ChatContentHeader from "./chat-content-header.component";
import moment from "moment";
import EmptyChat from "./empty-chat.component";
import useUserData from "@/app/hooks/useUserData";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/app/components/socket.connection";
import CryptoJS from "crypto-js";
import MessageField from "../message-field/message-field.component";
import ReactQuill from "react-quill";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import ScrollToBottom from "./scroll-to-bottom.component";
import { useSocketEmit } from "@/app/hooks/useSocketEmit";
import useLoader from "@/app/hooks/useLoaders";
export default function ChatContent({ conversationId }) {
  const [onGoingChatData, setOnGoingChatData] = useState<any>({
    chatList: [],
    messageReceiver: {},
    totalChatCount: 0,
    unreadMessagesCount: 0,
  });
  const { userData } = useUserData();
  const chatRefs = useRef<any>({});
  const [chatLoader, setChatLoader] = useState<null | boolean>(false);
  const [newMessage, setNewMessage] = useState(null);
  const theme = useTheme();
  const [showScrollToBottom, setShowScrollToBottom] = useState(false);
  const { emitEvent } = useSocketEmit();
  const { isLoading, showLoader, hideLoader } = useLoader(true);
  // useeffect for socket listner for new messages
  useEffect(() => {
    async function onMessages(value: any) {
      const { last_chat, unread_messages_count } = value;
      await setOnGoingChatData((prevState) => ({
        ...prevState,
        chatList: [...prevState.chatList, last_chat],
        unreadMessagesCount: unread_messages_count,
      }));

      await setNewMessage((prev) => (prev === null ? true : !prev));
    }

    getSingleChatData();
    socket?.on(`last-chat-${conversationId}`, onMessages);

    return () => {
      socket?.off(`last-chat-${conversationId}`, onMessages);
    };
  }, []);

  // useffect for scrolling into bottom initially and when new message appears
  useEffect(() => {
    const scrollContainer = document.getElementById(
      "chat-scrollable-container"
    );
    if (!showScrollToBottom) {
      scrollContainer.scrollTo({
        top: scrollContainer.scrollHeight,
        behavior: newMessage === null ? "instant" : "smooth",
      });
    }

    //read messages when there is no scrollbar
    if (scrollContainer.scrollHeight === scrollContainer.clientHeight) {
      emitEvent("read-chat", {
        conversationId: conversationId,
      });
      setOnGoingChatData((prevState) => ({
        ...prevState,
        unreadMessagesCount: 0, // Update unreadMessagesCount to 0
      }));
    }
  }, [newMessage, showScrollToBottom, isLoading]);

  // useeffect to keep track of scroll position for loading more chats
  useEffect(() => {
    const scrollContainer = document.getElementById(
      "chat-scrollable-container"
    );

    const handleScroll = () => {
      if (
        scrollContainer.scrollTop === 0 &&
        !chatLoader &&
        onGoingChatData.chatList.length !== onGoingChatData.totalChatCount
      ) {
        setChatLoader(true);
        loadMoreChats();
      }

      const isAtBottom =
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight + 200;

      const isAtBottomZero =
        scrollContainer.scrollHeight - scrollContainer.scrollTop <=
        scrollContainer.clientHeight;

      //read messages when scroll at bottom
      if (isAtBottomZero && onGoingChatData.unreadMessagesCount > 0) {
        emitEvent("read-chat", {
          conversationId: conversationId,
        });
        setOnGoingChatData((prevState) => ({
          ...prevState,
          unreadMessagesCount: 0, // Update unreadMessagesCount to 0
        }));
      }

      // if current state value is same as new value return and don't update
      if (showScrollToBottom === !isAtBottom) return;

      setShowScrollToBottom(!isAtBottom);
    };

    scrollContainer.addEventListener("scroll", handleScroll);

    return () => {
      scrollContainer.removeEventListener("scroll", handleScroll);
    };
  }, [chatLoader, showScrollToBottom, onGoingChatData.unreadMessagesCount]);

  // useeffect for adjusting scrolling when loading new chats
  useEffect(() => {
    const totalChats = Object.keys(chatRefs.current).length;
    let startIndex = 0;

    if (totalChats > 30) {
      const remainder = totalChats % 30;
      if (remainder !== 0) {
        startIndex = remainder;
      } else {
        startIndex = 30;
      }
    }

    const firstChatId = Object.keys(chatRefs.current)[startIndex];
    const firstChatElement = chatRefs.current[firstChatId];
    if (!chatLoader && firstChatElement) {
      document.getElementById("chat-scrollable-container").scrollTo({
        top: firstChatElement.getBoundingClientRect().top - 150,
        behavior: "instant",
      });
    }
  }, [chatLoader]);

  const decryptMessage = (encryptedMessage: string | undefined) => {
    if (!encryptedMessage) return ""; // Check if encryptedMessage is undefined or falsy

    const bytes = CryptoJS.AES.decrypt(
      encryptedMessage,
      String(conversationId)
    );
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  };

  function groupChatsByDate() {
    const groupedChats: { [key: string]: any[] } = {};

    const sortedChats = [...onGoingChatData.chatList].sort(
      (a: any, b: any) =>
        new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
    );

    sortedChats.forEach((chat: any) => {
      const date = new Date(chat.createdAt).toISOString().split("T")[0];
      if (!groupedChats[date]) {
        groupedChats[date] = [];
      }
      groupedChats[date].push(chat);
    });

    return groupedChats;
  }

  const loadMoreChats = async () => {
    try {
      const response = await FriendAPI.getSingleChatData(
        conversationId,
        onGoingChatData.chatList.length
      );
      if (response.status) {
        const updatedChatList = [
          ...response.chatList,
          ...onGoingChatData.chatList,
        ];

        await setOnGoingChatData((prevState) => ({
          ...prevState,
          chatList: updatedChatList,
        }));
        setChatLoader(false);
      }
    } catch (e) {
      setChatLoader(false);
      console.error(e);
    }
  };

  const getSingleChatData = async () => {
    try {
      const response = await FriendAPI.getSingleChatData(conversationId, 0);
      hideLoader();
      setOnGoingChatData({
        conversationId: Number(response.conversationId),
        chatList: response.chatList,
        messageReceiver: response.messageReceiver,
        totalChatCount: response.totalChatCount,
        unreadMessagesCount: 0,
      });
    } catch (e) {
      console.error(e);
      hideLoader();
    }
  };
  const groupedChats = groupChatsByDate();

  return (
    <>
      {/* Ongoing Chat Header */}
      <ChatContentHeader
        messageReceiver={onGoingChatData.messageReceiver}
        isLoading={isLoading}
        setOnGoingChatData={setOnGoingChatData}
      />
      <Divider />
      {/* Chat List */}
      <Stack
        height={"92vh"}
        // mt={2}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack overflow={"auto"} id="chat-scrollable-container">
          {chatLoader && (
            <Stack sx={{ position: "absolute" }} alignSelf={"center"} mt={10}>
              <CircularProgress size={30} />
            </Stack>
          )}
          {isLoading ? (
            [...Array(4)].map((_, index) => (
              <Box key={index}>
                <Box
                  p={1}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: index % 2 === 0 ? "flex-start" : "flex-end",
                  }}
                >
                  <Typography variant="h3" width={300}>
                    <Skeleton sx={{ borderRadius: 4 }} animation="wave" />
                  </Typography>
                </Box>
                <Box
                  p={1}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent: index % 2 !== 0 ? "flex-start" : "flex-end",
                  }}
                >
                  <Typography variant="h3" width={300}>
                    <Skeleton sx={{ borderRadius: 4 }} animation="wave" />
                  </Typography>
                </Box>
              </Box>
            ))
          ) : onGoingChatData.chatList.length !== 0 ? (
            Object.entries(groupedChats).map(
              ([date, chats]: [date: any, chats: any], index: number) => {
                let dayLabel = moment(date).calendar(null, {
                  sameDay: "[Today]",
                  lastDay: "[Yesterday]",
                  lastWeek: "[Last] dddd",
                  sameElse: "MMMM D, YYYY",
                });
                return (
                  <Box key={date}>
                    {index !== 0 && <Divider sx={{ my: 4 }} />}

                    <Box
                      sx={{
                        position: "sticky",
                        top: 16,
                        zIndex: 1,
                        textAlign: "center",
                        marginTop: "-50px",
                      }}
                    >
                      <Chip
                        label={dayLabel}
                        variant="outlined"
                        sx={{
                          background:
                            theme.palette.mode === "light"
                              ? "#fafafa"
                              : "#000000",
                        }}
                      />
                    </Box>

                    {chats.map((chat: any, index: any) => {
                      const isDifferentSender =
                        index === 0 ||
                        chat.sender.id !== chats[index - 1].sender.id;
                      const isCurrentUser = chat.sender.id === userData?.id;

                      return (
                        <Box
                          key={chat.id}
                          p={1}
                          ref={(el: any) => {
                            return (chatRefs.current[chat.id] = el);
                          }}
                        >
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent:
                                chat.sender.id === userData?.id
                                  ? "flex-end"
                                  : "flex-start",
                              gap: { xs: 0, sm: 0, md: 1, lg: 1, xl: 1 },
                            }}
                          >
                            <Avatar
                              sx={{
                                width: {
                                  xs: 20,
                                  sm: 20,
                                  md: 40,
                                  lg: 40,
                                  xl: 40,
                                },
                                height: {
                                  xs: 20,
                                  sm: 20,
                                  md: 40,
                                  lg: 40,
                                  xl: 40,
                                },
                                borderRadius: 4,
                                visibility:
                                  !isCurrentUser && isDifferentSender
                                    ? "visible"
                                    : "hidden",
                              }}
                              src={
                                onGoingChatData.messageReceiver.profile_picture
                              }
                              alt={"No Image"}
                            >
                              {onGoingChatData.messageReceiver.first_name
                                .charAt(0)
                                .toUpperCase() +
                                onGoingChatData.messageReceiver.last_name
                                  .charAt(0)
                                  .toUpperCase()}
                            </Avatar>
                            <Box
                              sx={{
                                wordBreak: "break-all",
                                margin: "8px",
                                borderRadius: 4,
                                textAlign: isCurrentUser ? "right" : "left",
                                backgroundColor: isCurrentUser
                                  ? theme.palette.mode === "light"
                                    ? theme.palette.primary.light
                                    : theme.palette.primary.main
                                  : theme.palette.mode === "light"
                                  ? "#F6F6F6"
                                  : theme.palette.primary.dark,
                                color: isCurrentUser ? "#FFFFFF" : "#333333",
                                padding: "10px 15px",
                                display: "flex",
                                justifyContent: isCurrentUser
                                  ? "flex-end"
                                  : "flex-start",
                                position: "relative",
                                flexDirection: "column",
                                alignItems: isCurrentUser
                                  ? "flex-end"
                                  : "flex-start",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{
                                  color:
                                    theme.palette.mode === "light"
                                      ? "#333"
                                      : "#fff",
                                }}
                              >
                                <ReactQuill
                                  value={decryptMessage(chat.content)}
                                  readOnly
                                  theme="bubble"
                                  className="contentReactQuill"
                                />
                              </Typography>

                              <Tooltip
                                leaveTouchDelay={3000}
                                enterTouchDelay={1000}
                                title={moment(chat.createdAt).calendar(null, {
                                  sameDay: "[Today] hh:mm A",
                                  lastDay: "[Yesterday] hh:mm A",
                                  lastWeek: "dddd D, hh:mm A",
                                  sameElse: "dddd, MMMM D, YYYY hh:mm A",
                                })}
                                arrow
                              >
                                <Typography
                                  variant="caption"
                                  sx={{
                                    color:
                                      theme.palette.mode === "light"
                                        ? "#888"
                                        : "#fff",
                                    opacity: 1,
                                    "&:hover": {
                                      opacity: 0.7,
                                    },
                                  }}
                                >
                                  {moment(chat.createdAt).format("hh:mm A")}
                                </Typography>
                              </Tooltip>
                            </Box>
                            <Avatar
                              sx={{
                                // bgcolor: getRandomColor(),
                                width: {
                                  xs: 20,
                                  sm: 20,
                                  md: 40,
                                  lg: 40,
                                  xl: 40,
                                },
                                height: {
                                  xs: 20,
                                  sm: 20,
                                  md: 40,
                                  lg: 40,
                                  xl: 40,
                                },
                                borderRadius: 4,
                                visibility:
                                  isCurrentUser && isDifferentSender
                                    ? "visible"
                                    : "hidden",
                              }}
                              src={
                                "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                              }
                              alt={"No Image"}
                            >
                              {userData?.first_name?.charAt(0)?.toUpperCase() +
                                userData?.last_name?.charAt(0)?.toUpperCase()}
                            </Avatar>
                          </Box>
                        </Box>
                      );
                    })}
                  </Box>
                );
              }
            )
          ) : (
            <EmptyChat />
          )}
        </Stack>
        {/* Message Textfield */}
        {isLoading ? (
          <Skeleton sx={{ py: 10, mx: 1, borderRadius: 4 }} animation="wave" />
        ) : (
          <MessageField conversationId={conversationId} />
        )}
        {onGoingChatData.unreadMessagesCount > 0 && showScrollToBottom && (
          <ScrollToBottom
            unreadMessagesCount={onGoingChatData.unreadMessagesCount}
            conversationId={conversationId}
            setOnGoingChatData={setOnGoingChatData}
          />
        )}
      </Stack>
    </>
  );
}
