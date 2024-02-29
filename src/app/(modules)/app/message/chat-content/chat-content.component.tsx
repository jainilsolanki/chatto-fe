"use client";
import {
  Avatar,
  Box,
  Chip,
  Divider,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import ChatContentHeader from "./components/chat-content-header.component";
import EmptyChat from "./components/empty-chat.component";
import NoActiveChat from "./components/no-active-chat.component";
import { useDispatch, useSelector } from "react-redux";
import { useSocketEmit } from "@/app/hooks/useSocketEmit";
import { useEffect, useRef, useState } from "react";
import { socket } from "@/app/components/socket.connection";
import { updateOnGoingChatList } from "@/app/services/redux/slices/ongoing-chat-data.slice";

const ChatContent = () => {
  const { emitEvent } = useSocketEmit();
  const dispatch = useDispatch();
  const ref = useRef<HTMLDivElement>(null);
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);
  const userData = useSelector((state: any) => state.userData);
  const [messageToSend, setMessageToSend] = useState("");
  const [initialLoading, setInitialLoading] = useState(true);
  useEffect(() => {
    function onMessages(value: any) {
      const { chat } = value;
      dispatch(updateOnGoingChatList(chat));
      if (initialLoading) setInitialLoading(false);
    }

    socket?.on("chat-list", onMessages);

    return () => {
      socket?.off("chat-list", onMessages);
    };
  }, []);

  useEffect(() => {
    if (onGoingChatData?.chatList?.length) {
      ref.current?.scrollIntoView({
        behavior: initialLoading ? "instant" : "smooth",
        block: "end",
      });
    }
  }, [onGoingChatData?.chatList?.length]);

  const sendMessage = () => {
    if (messageToSend.trim().length === 0) return;
    emitEvent("message", {
      message: messageToSend.trim(),
      conversationId: onGoingChatData.conversationId,
    });

    setMessageToSend("");
  };

  return onGoingChatData ? (
    <>
      {/* Ongoing Chat Header */}
      <ChatContentHeader messageReceiver={onGoingChatData.messageReceiver} />
      <Divider />
      {/* Chat List */}
      <Stack
        height={"92vh"}
        mt={2}
        sx={{
          justifyContent: "space-between",
        }}
        p={1}
      >
        <Stack overflow={"auto"}>
          {onGoingChatData.chatList.length !== 0 ? (
            onGoingChatData.chatList.map((chat: any, index: any) => {
              const prevChat = onGoingChatData.chatList[index - 1];
              const isDifferentSender =
                index === 0 ||
                chat.sender.id !==
                  onGoingChatData.chatList[index - 1].sender.id;
              const isCurrentUser = chat.sender.id === userData.id;
              const isDifferentDay =
                !prevChat ||
                !moment(chat.createdAt).isSame(prevChat.createdAt, "day");
              let dayLabel = moment(chat.createdAt).calendar(null, {
                sameDay: "[Today]",
                lastDay: "[Yesterday]",
                lastWeek: "[Last] dddd",
                sameElse: "MMMM D, YYYY",
              });
              return (
                <Box key={index}>
                  {isDifferentDay && (
                    <Divider
                      sx={{
                        position: "sticky",
                        top: 0,
                        zIndex: 1,
                        padding: "8px",
                        textAlign: "center",
                        background: "#fafafa",
                      }}
                    >
                      <Chip label={dayLabel} variant="outlined" />
                    </Divider>
                  )}
                  <Box
                    sx={{
                      alignItems: "center",
                      display: "flex",
                      justifyContent:
                        chat.sender.id === userData.id
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
                      src={onGoingChatData.messageReceiver.profile_picture}
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
                        backgroundColor: isCurrentUser ? "#d3eae8" : "#F6F6F6",
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
                      <Typography variant="body1" sx={{ color: "#333" }}>
                        {chat.content}
                      </Typography>
                      <Typography variant="caption" sx={{ color: "#888" }}>
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
                      {userData.first_name.charAt(0).toUpperCase() +
                        userData.last_name.charAt(0).toUpperCase()}
                    </Avatar>
                  </Box>
                </Box>
              );
            })
          ) : (
            <EmptyChat />
          )}
          <div ref={ref} />
        </Stack>
        {/* Message Textfield */}
        <Box
          sx={{
            position: "relative",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              background: "#FFF",
              p: 3,
              gap: 1,
              borderRadius: "15px",
              width: "100%",
            }}
          >
            <TextField
              inputRef={
                messageToSend === ""
                  ? (input) => input && input.focus()
                  : undefined
              }
              autoComplete="off"
              value={messageToSend}
              variant="standard"
              fullWidth
              placeholder="Type something..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        mt: 1,
                      }}
                      onClick={sendMessage}
                    >
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g filter="url(#filter0_b_534_3915)">
                            <rect
                              width="40"
                              height="40"
                              rx="20"
                              fill={
                                messageToSend.trim().length !== 0
                                  ? "#21978B"
                                  : "gray"
                              }
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_b_534_3915"
                              x="-7"
                              y="-7"
                              width="64"
                              height="64"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feGaussianBlur
                                in="BackgroundImageFix"
                                stdDeviation="3.5"
                              />
                              <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_534_3915"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_backgroundBlur_534_3915"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </Box>
                      <Box sx={{ position: "absolute" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            d="M9.2501 7.90019L19.8626 4.36269C24.6251 2.77519 27.2126 5.37519 25.6376 10.1377L22.1001 20.7502C19.7251 27.8877 15.8251 27.8877 13.4501 20.7502L12.4001 17.6002L9.2501 16.5502C2.1126 14.1752 2.1126 10.2877 9.2501 7.90019Z"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.6377 17.0627L17.1127 12.5752"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Box>
                  </InputAdornment>
                ),
                disableUnderline: true,
              }}
              sx={{
                color: "#8D8F98",
                borderRadius: 4,
                background: "#F6F6F6",
                p: "10px 8px",
              }}
              onChange={(e) => setMessageToSend(e.target.value)}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  sendMessage();
                }
              }}
            />
          </Box>
        </Box>
      </Stack>
    </>
  ) : (
    //No Active Chat Message
    <NoActiveChat />
  );
};
export default ChatContent;
