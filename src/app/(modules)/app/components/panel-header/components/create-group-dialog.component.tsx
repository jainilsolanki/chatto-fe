"use client";

import { handleCreateGroupDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import {
  Avatar,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  List,
  ListItem,
  ListItemAvatar,
  ListItemButton,
  ListItemSecondaryAction,
  ListItemText,
  ListSubheader,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import PinInput from "react-pin-input";
import { useEffect, useState } from "react";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
export default function CreateGroupDialog() {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const [allFriends, setAllFriends] = useState([]);
  const handleClose = () => {
    dispatch(handleCreateGroupDialogState(false));
  };
  const getAllFriendsList = async () => {
    try {
      const response = await FriendAPI.getAllFriends();

      console.log("all friends", response);
      setAllFriends([
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
        ...response.friends,
      ]);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllFriendsList();
  }, []);
  return (
    <>
      <Dialog
        open={dialogConfig.createGroupDialogState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: 700,
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Create new group
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack>
            <TextField
              placeholder="Group name"
              variant="outlined"
              label="Your Awesome group's name"
            />
            <TextField
              placeholder="Group description"
              variant="outlined"
              label="Your Awesome group's description"
              multiline
              maxRows={3}
            />
            <Typography>Add friends to your groups</Typography>
            <List subheader={<ListSubheader>Search</ListSubheader>}>
              {allFriends.map((friend) => {
                return (
                  <ListItem>
                    <ListItemAvatar>
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
                    </ListItemAvatar>
                    <ListItemText
                      primary={
                        friend.user.first_name + " " + friend.user.last_name
                      }
                      secondary={friend.user.user_code}
                    />
                    <ListItemButton>Add</ListItemButton>
                  </ListItem>
                );
              })}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button variant="contained" sx={{ width: "100%" }}>
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
