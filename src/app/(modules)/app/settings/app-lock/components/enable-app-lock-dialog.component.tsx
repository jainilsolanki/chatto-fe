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
import { handleEnableAppLockDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { useState } from "react";
import {
  updateEnabledAppLockSettings,
  updatePasswordAppLockSettings,
} from "@/app/services/redux/slices/app-data.slice";
export default function EnableAppLockDialog() {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((store: any) => store.dialogConfig);
  const [passwordData, setPasswordData] = useState({
    password: "",
    confirmPassword: "",
  });

  const [errorData, setErrorData] = useState({
    error: false,
    message: "Password is required",
  });

  const handleClose = () => {
    dispatch(handleEnableAppLockDialogState(false));
  };

  const enableAppLock = () => {
    if (
      passwordData.password.trim().length === 0 ||
      passwordData.confirmPassword.trim().length === 0
    ) {
      setErrorData({ error: true, message: "Password is required" });
      return;
    } else if (
      passwordData.password.trim() !== passwordData.confirmPassword.trim()
    ) {
      setErrorData({ error: true, message: "Passwords do not match" });
      return;
    }
    dispatch(updatePasswordAppLockSettings(passwordData.password.trim()));
    dispatch(updateEnabledAppLockSettings(true));
    handleClose();
  };

  return (
    <Dialog
      open={dialogConfig.enableAppLockDialogState}
      onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 350,
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
        Enable App Lock
        <IconButton onClick={handleClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack
          gap={2}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              enableAppLock();
            }
          }}
        >
          <Stack gap={1}>
            <Typography variant="body1"> Your New Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Password"
              autoFocus
              autoComplete="off"
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  password: e.target.value,
                }))
              }
            />
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1"> Confirm New Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Confirm Password"
              autoComplete="off"
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  confirmPassword: e.target.value,
                }))
              }
            />
          </Stack>
          {errorData.error && (
            <Typography color={"error"}>{errorData.message}</Typography>
          )}
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
          onClick={enableAppLock}
        >
          Enable
        </Button>
      </DialogActions>
    </Dialog>
  );
}
