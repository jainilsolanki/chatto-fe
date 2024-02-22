"use client";

import { ADD_FRIEND } from "@/app/data/assets-data";
import useCustomSnackbar from "@/app/hooks/useSnackbar";
import { FriendAPI } from "@/app/services/axios/apis/friend.api";
import { handleAddFriendDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import CloseIcon from "@mui/icons-material/Close";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import { useState } from "react";
import PinInput from "react-pin-input";
import { useDispatch, useSelector } from "react-redux";

export default function AddFriendDialog() {
  const dispatch = useDispatch();
  const [userCode, setUserCode] = useState<string>("");
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const { showSnackbar, SnackbarComponent } = useCustomSnackbar();
  const handleClose = () => {
    dispatch(handleAddFriendDialogState(false));
  };
  const sendFriendRequest = async () => {
    if (userCode.length === 6)
      try {
        const response = await FriendAPI.sendFriendRequest({
          user_code: userCode,
        });

        showSnackbar(response.message, "success");
      } catch (e: any) {
        showSnackbar(e.response.data.message, "error");
        console.log(e);
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
              <PinInput
                length={6}
                focus
                type="custom"
                placeholder="U"
                inputStyle={{
                  borderRadius: 4,
                  background: "#F6F6F6",
                  border: "none",
                  fontSize: 16,
                }}
                inputFocusStyle={{ border: "1px solid #21978B" }}
                onChange={(e: string) => setUserCode(e)}
              />
              <DialogContentText mt={3} fontWeight={"bold"}>
                Note: You can find your user code in your profile
              </DialogContentText>
            </Stack>
            <img src={ADD_FRIEND} width={"100%"} style={{ maxWidth: 250 }} />
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
      <SnackbarComponent />
    </>
  );
}
