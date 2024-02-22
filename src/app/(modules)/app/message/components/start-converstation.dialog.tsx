"use client";
import { CREATE_CHAT } from "@/app/data/assets-data";
import { handleBeginConversationDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
  Stack,
} from "@mui/material";
import { useDispatch, useSelector } from "react-redux";

export default function StartConversationConfirmationDialog() {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  return (
    <>
      <Dialog
        open={dialogConfig.beginConversationDialogState}
        aria-labelledby="responsive-dialog-title"
      >
        <DialogTitle id="responsive-dialog-title">
          {"Begin Conversation"}
        </DialogTitle>
        <DialogContent>
          <Stack direction={"row"} alignItems={"center"}>
            <DialogContentText>
              Do you want to begin conversation with Pragnesh Popat ?
            </DialogContentText>
            <img
              src={CREATE_CHAT}
              alt="Begin Conversation"
              width={"100%"}
              style={{ maxWidth: 200 }}
            />
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={() => dispatch(handleBeginConversationDialogState(false))}
          >
            Later
          </Button>
          <Button variant="contained" sx={{ width: "100%" }}>
            Begin
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
