"use client";
import { VOID } from "@/app/data/assets-data";
import { getTimeDifference } from "@/app/data/utils";
import { Avatar, Box, Stack, Typography, useTheme } from "@mui/material";
import FriendOptions from "./components/friend-options.component";
import { useEffect, useRef, useState } from "react";
import PanelHeader from "../../components/panel-header/panel-header.component";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import useLoader from "@/app/hooks/useLoaders";
import PanelListSkeletons from "../../components/panel-list-skeletons.component";
import { socket } from "@/app/components/socket.connection";
import UserActivityBadge from "../../components/user-activity-badge.component";
import { useRouter } from "next/navigation";
export default function FriendsPanel() {
  const [currentFriend, setCurrentFriend] = useState<any>(null);
  const theme = useTheme();
  const { hideLoader, isLoading } = useLoader(true);
  const [friendsList, setFriendsList] = useState([]);
  const router = useRouter();
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
  const getAllFriends = async () => {
    try {
      const response = await FriendAPI.getAllFriends();
      hideLoader();
      if (response.status) {
        setFriendsList(response.friends);
      }
    } catch (e) {
      hideLoader();
      console.error(e);
    }
  };

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

  const navigateToConversation = (conversationId: number) => {
    router.push(`/app/friends/${conversationId}`);
  };
  useEffect(() => {
    getAllFriends();
  }, []);

  useEffect(() => {
    socket?.on("activity-changes", updateUserActivity);

    return () => {
      socket?.off("activity-changes", updateUserActivity);
    };
  }, [friendsList]);

  return (
    <>
      {/* Panel Header */}
      <PanelHeader title={"Friends"} showOptions={true} />
      {/* Friends List */}
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
                      ? theme.palette.mode === "light"
                        ? theme.palette.primary.light
                        : theme.palette.primary.main
                      : "unset",
                  "& .MuiSvgIcon-root": {
                    display: {
                      xl:
                        friendsList.length !== 0 &&
                        currentFriend &&
                        friend.user.id === currentFriend.user.id
                          ? "block"
                          : "none",
                    },
                  },
                  cursor: "pointer",
                }}
                onMouseOver={() => setCurrentFriend(friend)}
                onMouseOut={() => setCurrentFriend(null)}
                onClick={(e) => {
                  e.stopPropagation();
                  navigateToConversation(friend.conversation_id);
                }}
              >
                <UserActivityBadge status={friend.user.status}>
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
                </UserActivityBadge>
                <Box flexGrow={1}>
                  <Typography
                    variant="body1"
                    fontWeight={"bold"}
                    noWrap
                    sx={{ maxWidth: `calc(${width}px - 100px)` }}
                  >
                    {friend.user.first_name} {friend.user.last_name}
                  </Typography>
                  <Typography
                    variant="body2"
                    color="textSecondary"
                    noWrap
                    sx={{ maxWidth: `calc(${width}px - 100px)` }}
                  >
                    Friends since {getTimeDifference(friend.createdAt)}
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
                loading="lazy"
                src={VOID}
                alt="You have no friends yet ! Start adding some"
                style={{ maxWidth: 120, maxHeight: 120 }}
              />
              <Typography variant="body1" fontSize={18} textAlign={"center"}>
                You have no friends yet ! Start adding some already
              </Typography>
            </Stack>
          )}
        </Stack>
      )}
    </>
  );
}
