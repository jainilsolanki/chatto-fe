"use client";

import { handleCreateGroupDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import {
  Avatar,
  Button,
  Checkbox,
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
import { useEffect, useMemo, useState } from "react";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import SearchIcon from "@mui/icons-material/Search";
import SearchOffIcon from "@mui/icons-material/SearchOff";
import ClearAllIcon from "@mui/icons-material/ClearAll";
import { NO_FRIENDS } from "@/app/data/assets-data";
export default function CreateGroupDialog() {
  const dispatch = useDispatch();
  const [allFriends, setAllFriends] = useState([]);
  const [searchData, setSearchData] = useState({
    searchVisible: false,
    searchQuery: "",
  });
  const [groupData, setGroupData] = useState({
    groupName: "",
    description: "",
    participants: [],
  });
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const handleClose = () => {
    dispatch(handleCreateGroupDialogState(false));
  };
  const getAllFriendsList = async () => {
    try {
      const response = await FriendAPI.getAllFriends();

      console.log("all friends", response);
      setAllFriends(response.friends);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getAllFriendsList();
  }, []);

  // Function to add friend to the group
  const addFriend = (friendId: number) => {
    setGroupData((prev) => {
      return {
        ...prev,
        participants: [...prev.participants, friendId],
      };
    });
  };
  // Function to remove friend from the group
  const removeFriend = (friendId) => {
    setGroupData((prev) => ({
      ...prev,
      participants: prev.participants.filter((id) => id !== friendId),
    }));
  };

  const filteredFriends = useMemo(() => {
    return allFriends.filter((friend) => {
      const user = friend.user;
      const queryToSearch = searchData.searchQuery.trim().toLowerCase();
      return (
        user.first_name.toLowerCase().includes(queryToSearch) ||
        user.last_name.toLowerCase().includes(queryToSearch) ||
        user.user_code.toLowerCase().includes(queryToSearch)
      );
    });
  }, [allFriends, searchData.searchQuery]);

  const createGroup = async () => {
    try {
      const response = await FriendAPI.createGroup({ ...groupData });

      console.log("group response ", response);
      handleClose();
    } catch (e) {
      console.log(e);
    }
  };
  console.log("group Data", groupData);
  return (
    <>
      <Dialog
        open={dialogConfig.createGroupDialogState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            minWidth: 500,
            maxWidth: 700,
            height: "80vh",
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
          <Stack gap={2}>
            <Stack gap={0.5}>
              <Typography variant="body1">Your Awesome group's name</Typography>
              <TextField
                placeholder="Group name"
                variant="outlined"
                size="small"
                autoFocus
                autoComplete="off"
                onChange={(e) =>
                  setGroupData((prev) => {
                    return { ...prev, groupName: e.target.value };
                  })
                }
              />
            </Stack>
            <Stack gap={0.5}>
              <Typography variant="body1">
                Your Awesome group's description
              </Typography>
              <TextField
                placeholder="Group description"
                variant="outlined"
                multiline
                maxRows={3}
                size="small"
                autoComplete="off"
                onChange={(e) =>
                  setGroupData((prev) => {
                    return { ...prev, description: e.target.value };
                  })
                }
              />
            </Stack>
            <List
              subheader={
                <ListSubheader
                  component={"div"}
                  sx={{
                    px: 0,
                    width: "100%",
                    display: "flex",
                    flexDirection: "column",
                    gap: 0.5,
                    background:"transparent"
                  }}
                >
                  <Stack
                    direction={"row"}
                    alignItems={"center"}
                    justifyContent={"space-between"}
                  >
                    <Typography variant="body1">
                      Add friends to your groups
                    </Typography>
                    <IconButton
                      size="small"
                      onClick={() => {
                        setSearchData((prev) => {
                          return {
                            ...prev,
                            searchQuery: "",
                            searchVisible: !prev.searchVisible,
                          };
                        });
                      }}
                    >
                      {searchData.searchVisible ? (
                        <SearchOffIcon />
                      ) : (
                        <SearchIcon />
                      )}
                    </IconButton>
                  </Stack>
                  {searchData.searchVisible && (
                    <TextField
                      variant="outlined"
                      placeholder="Search Friends"
                      fullWidth
                      size="small"
                      autoFocus
                      autoComplete="off"
                      value={searchData.searchQuery}
                      onChange={(e) =>
                        setSearchData((prev) => {
                          return { ...prev, searchQuery: e.target.value };
                        })
                      }
                      InputProps={{
                        startAdornment: (
                          <IconButton sx={{ pl: 0 }}>
                            <SearchIcon />
                          </IconButton>
                        ),
                        endAdornment: (
                          <Button
                            variant="outlined"
                            size="small"
                            sx={{
                              p: 0,
                              fontSize: 10,
                              display:
                                searchData.searchQuery.trim().length > 0
                                  ? "block"
                                  : "none",
                            }}
                            onClick={() =>
                              setSearchData((prev) => {
                                return { ...prev, searchQuery: "" };
                              })
                            }
                          >
                            Clear
                          </Button>
                        ),
                      }}
                    />
                  )}
                </ListSubheader>
              }
            >
              {filteredFriends.length > 0 ? (
                filteredFriends.map((friend) => {
                  return (
                    <ListItem sx={{ px: 0 }} key={friend.user.id}>
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
                        secondary={`#${friend.user.user_code}`}
                      />

                      {/* {groupData.participants.includes(friend.user.id) ? (
                        <Button
                          size="small"
                          color="error"
                          onClick={() => removeFriend(friend.user.id)}
                          variant="outlined"
                        >
                          Remove
                        </Button>
                      ) : (
                        <Button
                          size="small"
                          onClick={() => addFriend(friend.user.id)}
                          variant="outlined"
                        >
                          Add
                        </Button>
                      )} */}
                      <Checkbox
                        checked={groupData.participants.includes(
                          friend.user.id
                        )}
                        onChange={() => {
                          if (groupData.participants.includes(friend.user.id)) {
                            removeFriend(friend.user.id);
                          } else {
                            addFriend(friend.user.id);
                          }
                        }}
                      />
                    </ListItem>
                  );
                })
              ) : (
                <>
                  <Stack
                    m={4}
                    justifyContent={"center"}
                    alignItems={"center"}
                    gap={2}
                  >
                    <img
                      src={NO_FRIENDS}
                      alt="no friends found"
                      width={"100%"}
                      style={{ maxWidth: "150px" }}
                    />
                    <Typography variant="body1">No friends found</Typography>
                  </Stack>
                </>
              )}
            </List>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={createGroup}
          >
            Create Group
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
