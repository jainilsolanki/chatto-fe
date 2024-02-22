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
import { NotificationBell } from "./friendslist.component";

const userMessageData = [
  {
    first_name: "Pragnesh",
    last_name: "Prajapati",
    user_id: 1,
    conversation_id: 1,
    last_chat: "Yo",
    last_chat_time: "2024-02-08 05:22:39",
    is_online: true,
    profile_picture:
      "https://plus.unsplash.com/premium_photo-1707403865913-d8ca5c2962dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    first_name: "Bhavin",
    last_name: "Bhuva",
    user_id: 2,
    conversation_id: 2,
    last_chat: "Hello",
    last_chat_time: "2024-02-12 11:22:39",
    is_online: false,
    profile_picture:
      "https://plus.unsplash.com/premium_photo-1683842190286-204c3d93a5f6?q=80&w=1984&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    first_name: "Jainil",
    last_name: "Solanki",
    user_id: 3,
    conversation_id: 3,
    last_chat: "Hi !",
    last_chat_time: "2024-02-12 13:22:39",
    is_online: true,
    profile_picture: "",
  },
  {
    first_name: "Darshan",
    last_name: "Patel",
    user_id: 4,
    conversation_id: 4,
    last_chat: "Lmao !",
    last_chat_time: "2024-01-12 13:22:39",
    is_online: true,
    profile_picture:
      "https://images.unsplash.com/photo-1586182987320-4f376d39d787?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  },
  {
    first_name: "Mit",
    last_name: "Kathrotiya",
    user_id: 5,
    conversation_id: 5,
    last_chat: "Hooo hooo hooo",
    last_chat_time: "2024-02-01 13:22:39",
    is_online: false,
    profile_picture: "",
  },
];
const ChatPanel = () => {
  const dispatch = useDispatch();
  const [friendsList, setFriendsList] = useState([]);
  useEffect(() => {
    function onFriendsList(value: any) {
      // setFooEvents(fooEvents.concat(value));
      const { conversationList } = value;
      console.log("value: ", value.conversationList);
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
        mt={2}
        sx={{
          overflow: "auto",
          "& :hover": {
            background: userMessageData.length !== 0 ? "#d3eae8" : "unset",
            cursor: "pointer",
          },
        }}
        p={1}
      >
        {userMessageData.length !== 0 ? (
          userMessageData.map((user) => (
            <Box
              key={user.user_id}
              display="flex"
              alignItems="center"
              py={1}
              px={1}
              sx={{
                borderRadius: 5,
              }}
            >
              <Badge
                overlap="circular"
                // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
                variant="dot"
                invisible={!user.is_online}
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
                  {user.first_name.charAt(0) + user.last_name.charAt(0)}
                </Avatar>
              </Badge>
              <Box flexGrow={1}>
                <Typography variant="body1" fontWeight={"bold"}>
                  {user.first_name} {user.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  {user.last_chat}
                </Typography>
              </Box>
              <Typography
                variant="body2"
                color="textSecondary"
                alignSelf={"flex-start"}
              >
                {getTimeDifference(user.last_chat_time)}
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
