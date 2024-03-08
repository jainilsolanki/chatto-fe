"use client";
import { VOID } from "@/app/data/assets-data";
import { getTimeDifference } from "@/app/data/utils";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { NotificationBell } from "../../message/chat-panel/components/pending-friends-list.component";
import FriendOptions from "./components/friend-options.component";
import { useState } from "react";
export default function FriendsPanel({ friendsList }) {
  const [currentFriend, setCurrentFriend] = useState<any>(null);

  return (
    <>
      <Stack
        justifyContent={"center"}
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
            Only Friends
          </Typography>
          <Stack direction={"row"}>
            <NotificationBell />
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton>
              <AddCircleOutlineTwoToneIcon />
            </IconButton>
          </Stack>
        </Stack>
      </Stack>
      <Divider />
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
              }}
              onMouseOver={() => setCurrentFriend(friend)}
              onMouseOut={() => setCurrentFriend(null)}
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
              <FriendOptions setCurrentFriend={setCurrentFriend} />
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
