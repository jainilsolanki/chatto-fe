import React, { useState } from "react";
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
import { handleResetAppLockDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { updatePasswordAppLockSettings } from "@/app/services/redux/slices/app-data.slice";

interface PasswordData {
  currentPassword: string;
  newPassword: string;
  confirmPassword: string;
}

export default function ResetAppLockDialog() {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((store: any) => store.dialogConfig);
  const appData = useSelector((store: any) => store.appData);

  const [passwordData, setPasswordData] = useState<PasswordData>({
    currentPassword: "",
    newPassword: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState<Partial<PasswordData>>({});

  const handleClose = () => {
    dispatch(handleResetAppLockDialogState(false));
  };

  const resetAppLockPassword = () => {
    const { currentPassword, newPassword, confirmPassword } = passwordData;
    const newErrors: Partial<PasswordData> = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = "Current password is required.";
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = "New password is required.";
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = "Confirm password is required.";
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = "Passwords do not match.";
    }

    if (currentPassword.trim() !== appData.appLockSettings.password) {
      newErrors.currentPassword = "Current password doesn't match.";
    }

    if (Object.keys(newErrors).length === 0) {
      dispatch(updatePasswordAppLockSettings(newPassword));
      handleClose();
    } else {
      setErrors(newErrors);
    }
  };

  return (
    <Dialog
      open={dialogConfig.resetAppLockDialogState}
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
        Reset App Lock Password
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
              resetAppLockPassword();
            }
          }}
        >
          <Stack gap={1}>
            <Typography variant="body1">Enter your current password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Current Password"
              autoComplete="off"
              autoFocus
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  currentPassword: e.target.value,
                }))
              }
              error={Boolean(errors.currentPassword)}
              helperText={errors.currentPassword}
            />
          </Stack>

          <Stack gap={1}>
            <Typography variant="body1">Your New Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="New Password"
              autoComplete="off"
              onChange={(e) =>
                setPasswordData((prev) => ({
                  ...prev,
                  newPassword: e.target.value,
                }))
              }
              error={Boolean(errors.newPassword)}
              helperText={errors.newPassword}
            />
          </Stack>

          <Stack gap={1}>
            <Typography variant="body1">Confirm New Password</Typography>
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
              error={Boolean(errors.confirmPassword)}
              helperText={errors.confirmPassword}
            />
          </Stack>
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
          onClick={resetAppLockPassword}
        >
          Reset
        </Button>
      </DialogActions>
    </Dialog>
  );
}
