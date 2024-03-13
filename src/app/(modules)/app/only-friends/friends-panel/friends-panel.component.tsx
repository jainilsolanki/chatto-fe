"use client";
import { VOID } from "@/app/data/assets-data";
import { getTimeDifference } from "@/app/data/utils";
import { Avatar, Badge, Box, Stack, Typography } from "@mui/material";
import FriendOptions from "./components/friend-options.component";
import { useState } from "react";
import PanelHeader from "../../components/panel-header/panel-header.component";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { useDispatch } from "react-redux";
import { saveOnGoingChatData } from "@/app/services/redux/slices/ongoing-chat-data.slice";
export default function FriendsPanel({ friendsList }) {
  const [currentFriend, setCurrentFriend] = useState<any>(null);
  const dispatch = useDispatch();
  const startMessaging = async (data) => {
    try {
      const response = await FriendAPI.getSingleChatData(data);
      console.log("outside start msg function", response);
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
      {/* Panel Header */}
      <PanelHeader title={"Only Friends"} />
      {/* Chat List */}
      <Stack
        height={"calc(80vh - 40px)"}
        sx={{
          overflow: "auto",
        }}
        p={1}
      >
        {friendsList.length !== 0 ? (
          friendsList.map((friend) => (
            <Box
              key={friend.user.id}
              display="flex"
              alignItems="center"
              py={1}
              px={1}
              sx={{
                borderRadius: 5,
                background:
                  friendsList.length !== 0 &&
                  currentFriend &&
                  friend.user.id === currentFriend.user.id
                    ? "#d3eae8"
                    : "unset",
                "& .MuiSvgIcon-root": {
                  display:
                    friendsList.length !== 0 &&
                    currentFriend &&
                    friend.user.id === currentFriend.user.id
                      ? "block"
                      : "none",
                },
                cursor: "pointer",
              }}
              onMouseOver={() => setCurrentFriend(friend)}
              onMouseOut={() => setCurrentFriend(null)}
              onClick={(e) => {
                e.stopPropagation();
                startMessaging(friend.conversation_id);
              }}
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
                  src={friend.user.profile_picture}
                  alt={"No Image"}
                >
                  {friend.user.first_name.charAt(0).toUpperCase() +
                    friend.user.last_name.charAt(0).toUpperCase()}
                </Avatar>
              </Badge>
              <Box flexGrow={1}>
                <Typography variant="body1" fontWeight={"bold"}>
                  {friend.user.first_name} {friend.user.last_name}
                </Typography>
                <Typography variant="body2" color="textSecondary">
                  Friend since {getTimeDifference(friend.createdAt)}
                </Typography>
              </Box>
              <FriendOptions currentFriend={currentFriend} />
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
              alt="You have no friends yet ! Start adding some"
              style={{ maxWidth: 120, maxHeight: 120 }}
            />
            <Typography variant="body1" fontSize={18}>
              You have no friends yet ! Start adding some already
            </Typography>
          </Stack>
        )}
      </Stack>
    </>
  );
}
