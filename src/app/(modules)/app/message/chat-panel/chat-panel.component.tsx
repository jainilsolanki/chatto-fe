"use client";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import React, { useEffect, useState } from "react";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { getTimeDifference } from "@/app/data/utils";
import { VOID } from "@/app/data/assets-data";
import { socket } from "@/app/components/socket.connection";
import { useDispatch } from "react-redux";
import { handleAddFriendDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { NotificationBell } from "./components/pending-friends-list.component";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { saveOnGoingChatData } from "@/app/services/redux/slices/ongoing-chat-data.slice";

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
  const openAddFriendDialog = () => {
    dispatch(handleAddFriendDialogState(true));
  };

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
  return (
    <>
      <Stack
        justifyContent={"space-evenly"}
        flexDirection={"column"}
        p={1}
        height={"fit-content"}
        gap={2}
      >
        <Stack
          direction={"row"}
          alignItems={"center"}
          justifyContent={"space-between"}
        >
          <Typography variant="h5" fontWeight={"bold"}>
            Messages
          </Typography>
          <Stack direction={"row"}>
            <NotificationBell />
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={openAddFriendDialog}>
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
          </Stack>
        </Stack>
        {/* <Divider /> */}
        {/* <TextField
        placeholder="Search people or message"
        InputProps={{
          sx: { borderRadius: 5, height: 35 },
          startAdornment: (
            <InputAdornment position="start">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
        sx={{ width: "100%" }}
      /> */}
      </Stack>
      <Divider />
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
                  {user.chats.content}
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
