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
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
export default function FriendOptions({ currentFriend }) {
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const router = useRouter();
  const dispatch = useDispatch();
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "simple-popover" : undefined;
  function handleClickPop(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setAnchorElPop(event.currentTarget);
  }
  function handleClosePop(e: any) {
    e.stopPropagation();
    setAnchorElPop(null);
  }

  const options = [
    {
      key: "message",
      optionName: "Message",
      icon: <ReviewsOutlinedIcon sx={{ fontSize: 20 }} />,
      onClick: () => {
        setAnchorElPop(null);
        router.push(`/app/only-friends/${currentFriend.conversation_id}`);
      },
    },
    {
      key: "remove_friend",
      optionName: "Remove Friend",
      icon: <PersonRemoveAlt1OutlinedIcon sx={{ fontSize: 20 }} />,
      onClick: () => {
        setAnchorElPop(null);
        return;
      },
    },
  ];
  return (
    <>
      <MoreHorizIcon
        sx={{
          fontSize: 24,
          alignSelf: "flex-start",
          padding: 0.4,
          "&:hover": {
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
          },
          background: anchorElPop ? "rgba(0, 0, 0, 0.1)" : "transparent",
          borderRadius: "50%",
          zIndex: 10000,
        }}
        onClick={(e: any) => {
          e.stopPropagation();
          handleClickPop(e);
        }}
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
            {options.map((option) => {
              return (
                <ListItem
                  key={option.key}
                  disablePadding
                  sx={{ display: "block" }}
                >
                  <ListItemButton
                    dense
                    onClick={(e) => {
                      e.stopPropagation();
                      e.preventDefault();
                      option.onClick();
                    }}
                  >
                    <ListItemIcon>{option.icon}</ListItemIcon>
                    <ListItemText primary={option.optionName} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </Popover>
    </>
  );
}
