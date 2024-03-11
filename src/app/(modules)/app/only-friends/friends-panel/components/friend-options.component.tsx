"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { useDispatch } from "react-redux";
import { saveOnGoingChatData } from "@/app/services/redux/slices/ongoing-chat-data.slice";
export default function FriendOptions({ currentFriend }) {
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const dispatch = useDispatch();
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "simple-popover" : undefined;
  function handleClickPop(event: React.MouseEvent<HTMLButtonElement>) {
    console.log("open caled");
    event.stopPropagation();
    setAnchorElPop(event.currentTarget);
  }
  function handleClosePop() {
    setAnchorElPop(null);
    console.log("close caled");
  }

  const startMessaging = async (data) => {
    try {
      const response = await FriendAPI.getSingleChatData(data);
      console.log(response);
      handleClosePop();
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
      <MoreHorizIcon
        sx={{
          fontSize: 24,
          alignSelf: "flex-start",
          padding: 0.4,
          cursor: "pointer",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
          },
          background: anchorElPop ? "rgba(0, 0, 0, 0.1)" : "transparent",
          borderRadius: "50%",
        }}
        onClick={(e: any) => handleClickPop(e)}
      />

      <Popover
        id={popOverId}
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
        sx={{ width: 300 }}
      >
        <Stack width={300}>
          <Divider />
          <List
            sx={{
              "& .MuiListItemIcon-root": {
                minWidth: 30,
              },
            }}
          >
            <ListItem key={"Profile"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                dense
                onClick={() => startMessaging(currentFriend.conversation_id)}
              >
                <ListItemIcon>
                  <ReviewsOutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary={"Message"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Status"} disablePadding sx={{ display: "block" }}>
              <ListItemButton dense>
                <ListItemIcon>
                  <PersonRemoveAlt1OutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary={"Remove friend"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Popover>
    </>
  );
}
