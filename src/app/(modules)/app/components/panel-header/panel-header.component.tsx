"use client";
import {
  Divider,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import { handleAddFriendDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import AddFriendDialog from "./components/add-friend-dialog.component";
import SearchIcon from "@mui/icons-material/Search";
import { NotificationBell } from "./components/pending-friends-list.component";
import StartConversationConfirmationDialog from "./components/start-converstation.dialog";
import { useState } from "react";
import PersonAddAlt1TwoToneIcon from "@mui/icons-material/PersonAddAlt1TwoTone";
import GroupAddTwoToneIcon from "@mui/icons-material/GroupAddTwoTone";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
export default function PanelHeader({ title }: { title: string }) {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "simple-popover" : undefined;
  function handleClickPop(event: React.MouseEvent<HTMLButtonElement>) {
    event.stopPropagation();
    setAnchorElPop(event.currentTarget);
  }
  function handleClosePop() {
    setAnchorElPop(null);
  }
  const openAddFriendDialog = () => {
    dispatch(handleAddFriendDialogState(true));
    handleClosePop();
  };

  const addOptions = [
    {
      key: "send_friend_request",
      optionName: "Send friend request",
      icon: <PersonAddAlt1TwoToneIcon sx={{ fontSize: 20 }} />,
      onClick: () => {
        openAddFriendDialog();
      },
    },
    {
      key: "create_new_group",
      optionName: "Create new group",
      icon: <GroupAddTwoToneIcon sx={{ fontSize: 20 }} />,
      onClick: () => {
        setAnchorElPop(null);
        return;
      },
    },
  ];
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
            {title}
          </Typography>
          <Stack direction={"row"} alignItems={"center"}>
            <NotificationBell />
            <IconButton>
              <SearchIcon />
            </IconButton>
            <IconButton onClick={handleClickPop}>
              <MoreHorizIcon />
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
            {addOptions.map((option) => {
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
      {dialogConfig.addFriendDialogState && <AddFriendDialog />}
      {dialogConfig.beginConversationDialogState && (
        <StartConversationConfirmationDialog />
      )}
    </>
  );
}
