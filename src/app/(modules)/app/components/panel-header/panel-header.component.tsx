"use client";
import { Divider, IconButton, Stack, Typography } from "@mui/material";
import { useDispatch } from "react-redux";
import { handleAddFriendDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import AddFriendDialog from "./components/add-friend-dialog.component";
import SearchIcon from "@mui/icons-material/Search";
import AddCircleOutlineTwoToneIcon from "@mui/icons-material/AddCircleOutlineTwoTone";
import { NotificationBell } from "./components/pending-friends-list.component";
import StartConversationConfirmationDialog from "./components/start-converstation.dialog";
export default function PanelHeader({ title }: { title: string }) {
  const dispatch = useDispatch();
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
            {title}
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
      <AddFriendDialog />
      <StartConversationConfirmationDialog />
    </>
  );
}
