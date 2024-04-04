"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { useDispatch, useSelector } from "react-redux";
import { handleDisableAppLockDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { useState } from "react";
import {
  updateAutoLockAppLockSettings,
  updateEnabledAppLockSettings,
  updatePasswordAppLockSettings,
} from "@/app/services/redux/slices/app-data.slice";
export default function DisableAppLockDialog() {
  const dispatch = useDispatch();
  const appData = useSelector((store: any) => store.appData);
  const dialogConfig = useSelector((store: any) => store.dialogConfig);
  const [password, setPassword] = useState("");
  const [errorData, setErrorData] = useState({
    error: false,
    message: "Password is required",
  });
  const handleClose = () => {
    dispatch(handleDisableAppLockDialogState(false));
  };

  const disableAppLock = () => {
    if (password.trim().length === 0) {
      setErrorData({ error: true, message: "Password is required" });
      return;
    }
    if (appData.appLockSettings.password !== password.trim()) {
      setErrorData({ error: true, message: "Password doesn't match" });
      return;
    }
    dispatch(updatePasswordAppLockSettings(""));
    dispatch(updateEnabledAppLockSettings(false));
    dispatch(updateAutoLockAppLockSettings(-1));
    handleClose();
  };
  return (
    <Dialog
      open={dialogConfig.disableAppLockDialogState}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 400,
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
        Disable App Lock
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack gap={1}>
          <Typography variant="body1"> Enter your current password</Typography>
          <TextField
            type="password"
            size="small"
            placeholder="Current Password"
            autoComplete="off"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            error={errorData.error}
            helperText={errorData.error && errorData.message}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                disableAppLock();
              }
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="outlined"
          color="error"
          sx={{ width: "100%" }}
          onClick={handleClose}
        >
          Cancel
        </Button>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={disableAppLock}
        >
          Disable
        </Button>
      </DialogActions>
    </Dialog>
  );
}
