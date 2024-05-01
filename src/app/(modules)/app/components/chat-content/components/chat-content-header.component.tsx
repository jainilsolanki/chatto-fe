import {
  Avatar,
  Box,
  Button,
  IconButton,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CallIcon from "@mui/icons-material/Call";
import { useEffect } from "react";
import { socket } from "@/app/components/socket.connection";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import { useRouter } from "next/navigation";
export default function ChatContentHeader({
  messageReceiver,
  isLoading,
  setOnGoingChatData,
}) {
  const router = useRouter();
  function updateUserActivity(user: any) {
    if (Number(user.user_id) === Number(messageReceiver.id)) {
      setOnGoingChatData((prevState) => ({
        ...prevState,
        messageReceiver: {
          ...prevState.messageReceiver,
          status: user.online,
        },
      }));
    }
  }
  useEffect(() => {
    socket?.on("activity-changes", updateUserActivity);

    return () => {
      socket?.off("activity-changes", updateUserActivity);
    };
  }, [messageReceiver.status]);

  return (
    <Stack
      justifyContent={"space-evenly"}
      flexDirection={"column"}
      p={1}
      height={60}
      gap={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <ArrowBackIosNewTwoToneIcon
            sx={{
              display: {
                xs: "block",
                sm: "block",
                md: "none",
                lg: "none",
                xl: "none",
              },
            }}
            onClick={() => {
              router.back();
            }}
          />
          {isLoading ? (
            <Skeleton
              sx={{
                // bgcolor: getRandomColor(),
                width: 45,
                height: 75,
                borderRadius: 4,
              }}
              animation="wave"
            />
          ) : (
            <Avatar
              sx={{
                // bgcolor: getRandomColor(),
                width: 45,
                height: 45,
                borderRadius: 4,
              }}
              src={messageReceiver.profile_picture}
              alt={"No Image"}
            >
              {messageReceiver.first_name.charAt(0).toUpperCase() +
                messageReceiver.last_name.charAt(0).toUpperCase()}
            </Avatar>
          )}
          <Stack>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontSize={18}
              lineHeight={"normal"}
            >
              {isLoading ? (
                <Skeleton width={160} animation="wave" />
              ) : (
                messageReceiver.first_name + " " + messageReceiver.last_name
              )}
            </Typography>
            {isLoading ? (
              <Skeleton width={80} animation="wave" />
            ) : messageReceiver.status === "active" ? (
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Box
                  sx={{
                    background: "#44b700",
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography variant="body1">Online</Typography>
              </Stack>
            ) : (
              <Stack direction={"row"} alignItems={"center"} gap={1}>
                <Box
                  sx={{
                    background: "#616161",
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                  }}
                ></Box>
                <Typography variant="body1">Offline</Typography>
              </Stack>
            )}
          </Stack>
        </Stack>
        {isLoading ? (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <Skeleton
                width={80}
                height={30}
                variant="rounded"
                sx={{ borderRadius: 3 }}
                animation="wave"
              />
              <Skeleton
                width={80}
                height={30}
                variant="rounded"
                sx={{ borderRadius: 3 }}
                animation="wave"
              />
            </Stack>
            <IconButton>
              <Skeleton
                variant="circular"
                width={40}
                height={40}
                animation="wave"
              />
            </IconButton>
          </Stack>
        ) : (
          <Stack direction={"row"} alignItems={"center"} gap={1}>
            <Stack
              direction={"row"}
              alignItems={"center"}
              gap={1}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "flex",
                  lg: "flex",
                  xl: "flex",
                },
              }}
            >
              <Button
                variant="outlined"
                startIcon={<SportsEsportsIcon />}
                sx={{ borderRadius: 3 }}
                size="small"
              >
                Games
              </Button>
              <Button
                variant="outlined"
                startIcon={<CallIcon />}
                sx={{ borderRadius: 3 }}
                size="small"
              >
                Call
              </Button>
            </Stack>
            <IconButton>
              <MoreHorizIcon />
            </IconButton>
          </Stack>
        )}
      </Stack>
    </Stack>
  );
}
