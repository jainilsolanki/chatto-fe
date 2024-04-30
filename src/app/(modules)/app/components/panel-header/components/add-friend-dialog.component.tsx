"use client";
import { ADD_FRIEND } from "@/app/data/assets-data";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { handleAddFriendDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Theme,
  Typography,
  useMediaQuery,
} from "@mui/material";
import { enqueueSnackbar } from "notistack";
import { useState } from "react";
import PinInput from "react-pin-input";
import { useDispatch, useSelector } from "react-redux";

export default function AddFriendDialog() {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.up("md"));
  const dispatch = useDispatch();
  const [userCode, setUserCode] = useState<string>("");
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const [error, setError] = useState(false);
  const handleClose = () => {
    dispatch(handleAddFriendDialogState(false));
    setError(false);
  };
  const sendFriendRequest = async () => {
    if (userCode.length === 6) {
      setError(false);
      try {
        const response = await FriendAPI.sendFriendRequest({
          user_code: userCode.toLowerCase(),
        });
        handleClose();

        enqueueSnackbar(response.message, { variant: "success" });
      } catch (e: any) {
        enqueueSnackbar(e.response.data.message, { variant: "error" });
        console.error(e);
      }
    } else {
      setError(true);
    }
  };
  return (
    <>
      <Dialog
        open={dialogConfig.addFriendDialogState}
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
          Add a new friend
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={4}
          >
            <Stack gap={2}>
              <Typography fontSize={18} fontWeight={"medium"}>
                Enter your friend's user code
              </Typography>
              <Stack
                onKeyDown={(ev) => {
                  if (ev.key === "Enter") {
                    ev.preventDefault();
                    sendFriendRequest();
                  }
                }}
              >
                <PinInput
                  length={6}
                  focus
                  type="custom"
                  placeholder="U"
                  style={{ display: "flex", justifyContent: "space-between" }}
                  inputStyle={{
                    borderRadius: 4,
                    background: "#F6F6F6",
                    border: "none",
                    fontSize: 16,
                    width: matches ? 50 : 35,
                    height: matches ? 50 : 35,
                  }}
                  inputFocusStyle={{ border: "1px solid #21978B" }}
                  onChange={(e: string) => setUserCode(e)}
                  onComplete={(e: string) => setUserCode(e)}
                />
              </Stack>
              {error && (
                <Typography color={"error"} variant="caption">
                  Please fill the entire UCode
                </Typography>
              )}
              <DialogContentText mt={2} fontWeight={"bold"}>
                Note: You can find your user code in your profile
              </DialogContentText>
            </Stack>
            {matches && (
              <Box
                component={"img"}
                src={ADD_FRIEND}
                alt="ADD_FRIEND_BANNER"
                loading="lazy"
                width={"100%"}
                maxWidth={250}
              ></Box>
            )}
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={sendFriendRequest}
          >
            Add
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
