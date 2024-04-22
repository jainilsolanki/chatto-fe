import { AccessTime } from "@mui/icons-material";
import {
  Avatar,
  Badge,
  Box,
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Popover,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import CheckIcon from "@mui/icons-material/Check";
import { useEffect, useState } from "react";
import { NO_PENDING_REQUESTS } from "@/app/data/assets-data";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import GroupIcon from "@mui/icons-material/Group";
import { getTimeDifference } from "@/app/data/utils";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch } from "react-redux";
import { handleBeginConversationDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { updateConversationId } from "@/app/services/redux/slices/temp-data.slice";
import { socket } from "@/app/components/socket.connection";
const FriendItem = ({
  friend,
  handleClosePop,
  getFriendsList,
  dataLength,
}: any) => {
  const dispatch = useDispatch();
  const theme = useTheme();
  const handleNotificationClick = (notification: any) => {
    handleClosePop();
  };
  const acceptFriendRequest = async (id) => {
    try {
      const response = await FriendAPI.sendFriendRequestResponse({
        id,
        status: "accepted",
      });
      if (response.status) {
        if (dataLength === 1) {
          handleClosePop();
        }
        dispatch(handleBeginConversationDialogState(true));
        dispatch(updateConversationId(response.conversationId));
        getFriendsList();
      }
    } catch (e) {
      console.error(e);
    }
  };
  const rejectFriendRequest = async (id) => {
    try {
      const response = await FriendAPI.sendFriendRequestResponse({
        id,
        status: "rejected",
      });
      if (response.status) {
        if (dataLength === 1) {
          handleClosePop();
        }
        setTimeout(() => {
          getFriendsList();
        }, 500);
      }
    } catch (e) {
      console.error(e);
    }
  };
  return (
    <>
      <ListItem
        alignItems="flex-start"
        sx={{
          cursor: "pointer",
          transition: "background 0.2s ease-in-out",
          display: "flex",
          alignItems: "center",
          "& .MuiListItemText-primary": {
            fontWeight: "bold",
          },
          "& .MuiListItemText-secondary": {
            fontWeight: "light",
            fontSize: "0.75rem",
          },
          "& .MuiListItemAvatar-root": {
            margin: "auto",
          },
          "&:hover": {
            background: theme.palette.mode === "light" ? "#F6F6F6" : "#323232",
          },
        }}
      >
        <ListItemAvatar>
          <Avatar
            sx={{
              // bgcolor: getRandomColor(),
              width: 45,
              height: 45,
              borderRadius: 4,
            }}
            src={friend.req_from.profile_picture}
            alt={"No Image"}
          >
            {friend.req_from.first_name.charAt(0).toUpperCase() +
              friend.req_from.last_name.charAt(0).toUpperCase()}
          </Avatar>
        </ListItemAvatar>

        <ListItemText
          primary={
            <Typography fontWeight={"bold"}>
              {friend.req_from.first_name} {friend.req_from.last_name}{" "}
              <span style={{ fontWeight: "normal" }}>
                has requested to be your friend
              </span>
            </Typography>
          }
          secondary={
            <Stack alignItems="center" direction={"row"} gap={0.5}>
              <AccessTime sx={{ fontSize: "1rem" }} />
              {/* {moment(friend.updated_at).format("hh:mm:ss A DD-MM-YYYY")} */}
              {getTimeDifference(friend.updatedAt)}
            </Stack>
          }
        />
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <IconButton
            sx={{ color: "red" }}
            size="small"
            onClick={() => rejectFriendRequest(friend.id)}
          >
            <CloseIcon />
          </IconButton>
          <IconButton
            sx={{ color: "green" }}
            size="small"
            onClick={() => acceptFriendRequest(friend.id)}
          >
            <CheckIcon />
          </IconButton>
        </Stack>
      </ListItem>
      <Divider />
    </>
  );
};

export const FriendsList = ({
  friendsListData,
  handleClosePop,
  getFriendsList,
}: any) => {
  return (
    <Paper
      sx={{
        width: 500,
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        flexDirection: "column",
        gap: 3,
      }}
    >
      {friendsListData.length !== 0 ? (
        <List
          sx={{
            width: "100%",
            maxWidth: 500,
            maxHeight: 300,
            overflowY: "auto",
          }}
        >
          {friendsListData.map((friend: any) => (
            <FriendItem
              key={friend.from_user_id}
              friend={friend}
              handleClosePop={handleClosePop}
              getFriendsList={getFriendsList}
              dataLength={friendsListData.length}
            />
          ))}
        </List>
      ) : (
        <Box p={3}>
          <img
            loading="lazy"
            src={NO_PENDING_REQUESTS}
            alt="NO_NOTIFICATIONS_BANNER"
            width={"100%"}
            style={{ maxWidth: 200, margin: "auto" }}
          />
          <Typography sx={{ textAlign: "center", marginTop: 2 }}>
            No pending friend requests.
          </Typography>
        </Box>
      )}
    </Paper>
  );
};

export const NotificationBell = () => {
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );

  const [friendsListData, setFriendsListData] = useState([]);
  const getFriendsList = async () => {
    try {
      const response = await FriendAPI.getFriendsList();
      setFriendsListData(response.friends);
    } catch (e) {
      console.error(e);
    }
  };
  useEffect(() => {
    getFriendsList();
    function onNewFriendRequest(value: any) {
      getFriendsList();
    }

    socket?.on("friends-count", onNewFriendRequest);

    return () => {
      socket?.off("friends-count", onNewFriendRequest);
    };
  }, []);
  function notificationsLabel(count: number) {
    if (count === 0) {
      return "no notifications";
    }
    if (count > 99) {
      return "more than 99 notifications";
    }
    return `${count} notifications`;
  }

  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };

  const openPop = Boolean(anchorElPop);
  const id = openPop ? "simple-popover" : undefined;
  return (
    <>
      <IconButton onClick={(e) => handleClickPop(e)}>
        <Badge
          badgeContent={friendsListData.length}
          color="error"
          invisible={friendsListData.length !== 0 ? false : true}
        >
          <GroupIcon />
        </Badge>
      </IconButton>

      <Popover
        id={id}
        open={openPop}
        anchorEl={anchorElPop}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
      >
        <FriendsList
          friendsListData={friendsListData}
          handleClosePop={handleClosePop}
          getFriendsList={getFriendsList}
        />
      </Popover>
    </>
  );
};
