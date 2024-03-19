"use client";
import { Avatar, Box, Chip, Divider, Stack, Typography } from "@mui/material";
import ChatContentHeader from "./chat-content-header.component";
import moment from "moment";
import EmptyChat from "./empty-chat.component";
import { useDispatch, useSelector } from "react-redux";
import useUserData from "@/app/hooks/useUserData";
import { useEffect, useRef, useState } from "react";
import { updateOnGoingChatList } from "@/app/services/redux/slices/ongoing-chat-data.slice";
import { socket } from "@/app/components/socket.connection";
import CryptoJS from "crypto-js";
import MessageField from "../message-field/message-field.component";
import ReactQuill from "react-quill";
export default function ChatContent() {
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);
  const { userData } = useUserData();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const [initialLoading, setInitialLoading] = useState(true);

  useEffect(() => {
    function onMessages(value: any) {
      const { chat } = value;
      console.log("received chat socket");
      dispatch(updateOnGoingChatList(chat));
      if (initialLoading) setInitialLoading(false);
    }

    socket?.on("chat-list", onMessages);

    return () => {
      socket?.off("chat-list", onMessages);
    };
  }, [onGoingChatData]);

  useEffect(() => {
    if (onGoingChatData?.chatList?.length) {
      ref.current?.scrollIntoView({
        behavior: initialLoading ? "instant" : "smooth",
        block: "end",
      });
    }
  }, [onGoingChatData?.chatList?.length]);

  const decryptMessage = (encryptedMessage: string | undefined) => {
    if (!encryptedMessage) return ""; // Check if encryptedMessage is undefined or falsy

    const bytes = CryptoJS.AES.decrypt(
      encryptedMessage,
      String(onGoingChatData.conversationId)
    );
    const decryptedMessage = bytes.toString(CryptoJS.enc.Utf8);
    return decryptedMessage;
  };

  function groupChatsByDate() {
    const groupedChats = {};

    onGoingChatData.chatList.forEach((chat) => {
      const date = new Date(chat.createdAt).toISOString().split("T")[0];
      if (!groupedChats[date]) {
        groupedChats[date] = [];
      }
      groupedChats[date].push(chat);
    });

    return groupedChats;
  }

  const groupedChats = groupChatsByDate();
  return (
    <>
      {/* Ongoing Chat Header */}
      <ChatContentHeader messageReceiver={onGoingChatData.messageReceiver} />
      <Divider />
      {/* Chat List */}
      <Stack
        height={"92vh"}
        // mt={2}
        sx={{
          justifyContent: "space-between",
        }}
      >
        <Stack overflow={"auto"}>
          {onGoingChatData.chatList.length !== 0 ? (
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
                    {index !== 0 && <Divider></Divider>}

                    <Box
                      sx={{
                        position: "sticky",
                        top: 16,
                        zIndex: 1,
                        textAlign: "center",
                        marginTop: "-18px",
                      }}
                    >
                      <Chip
                        label={dayLabel}
                        variant="outlined"
                        // size="small"
                        // sx={{ fontSize: 12 }}

                        sx={{ background: "#fafafa" }}
                      />
                    </Box>

                    {chats.map((chat: any, index: any) => {
                      const isDifferentSender =
                        index === 0 ||
                        chat.sender.id !== chats[index - 1].sender.id;
                      const isCurrentUser = chat.sender.id === userData?.id;

                      return (
                        <Box key={index} p={1}>
                          <Box
                            sx={{
                              alignItems: "center",
                              display: "flex",
                              justifyContent:
                                chat.sender.id === userData?.id
                                  ? "flex-end"
                                  : "flex-start",
                              gap: 1,
                            }}
                          >
                            <Avatar
                              sx={{
                                // bgcolor: getRandomColor(),
                                width: 40,
                                height: 40,
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
                                  ? "#d3eae8"
                                  : "#F6F6F6",
                                color: isCurrentUser ? "#FFFFFF" : "#333333",
                                padding: "10px 15px",
                                display: "flex",
                                justifyContent: isCurrentUser
                                  ? "flex-end"
                                  : "flex-start",
                                position: "relative",
                                flexDirection: "column",
                              }}
                            >
                              <Typography
                                variant="body1"
                                sx={{ color: "#333" }}
                              >
                                <ReactQuill
                                  value={decryptMessage(chat.content)}
                                  readOnly
                                  theme="bubble"
                                  className="contentReactQuill"
                                />
                              </Typography>

                              <Typography
                                variant="caption"
                                sx={{ color: "#888" }}
                              >
                                {moment(chat.createdAt).format("hh:mm A")}
                              </Typography>
                            </Box>
                            <Avatar
                              sx={{
                                // bgcolor: getRandomColor(),
                                width: 40,
                                height: 40,
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
                    <div ref={ref} />
                  </Box>
                );
              }
            )
          ) : (
            <EmptyChat />
          )}
        </Stack>
        {/* Message Textfield */}
        <MessageField />
      </Stack>
    </>
  );
}
