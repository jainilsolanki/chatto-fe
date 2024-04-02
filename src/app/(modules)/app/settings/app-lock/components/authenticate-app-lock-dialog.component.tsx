"use client";
import { updateLockStateAppLockSettings } from "@/app/services/redux/slices/app-data.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useIdle } from "react-use";
export default function AuthenticateAppLockDialog() {
  const dispatch = useDispatch();
  const [password, setPassword] = useState("");
  const appData = useSelector((store: any) => store.appData);
  const [errorData, setErrorData] = useState({
    error: false,
    message: "Password is required",
  });

  // useeffect for preventing user from interacting with app even after removing dialog using inspect
  useEffect(() => {
    const clickHandler = (e) => {
      if (appData.appLockSettings.lockState) {
        const dialog = document.getElementById("appLockDialog");
        if (dialog && dialog.contains(e.target)) {
          return;
        } else {
          e.preventDefault();
          e.stopPropagation();
        }
      }
    };

    document.addEventListener("click", clickHandler, true);

    return () => {
      document.removeEventListener("click", clickHandler, true);
    };
  }, [appData.appLockSettings.lockState]);

  // use effect for out of tab based autolock
  useEffect(() => {
    const outOfTabHandler = () => {
      if (document.visibilityState !== "visible") {
        dispatch(updateLockStateAppLockSettings(true));
      }
    };
    if (appData.appLockSettings.autoLock === 0) {
      document.addEventListener("visibilitychange", outOfTabHandler);
    }

    return () => {
      document.removeEventListener("visibilitychange", outOfTabHandler);
    };
  }, [appData.appLockSettings.autoLock]);

  //use effect for time based auto lock
  useEffect(() => {
    if ([300000, 600000, 900000].includes(appData.appLockSettings.autoLock)) {
      let inactivityTimer;

      const resetTimer = () => {
        clearTimeout(inactivityTimer);
        inactivityTimer = setTimeout(() => {
          dispatch(updateLockStateAppLockSettings(true));
        }, appData.appLockSettings.autoLock);
      };

      const handleUserActivity = () => {
        resetTimer();
      };

      document.addEventListener("mousemove", handleUserActivity);
      document.addEventListener("keydown", handleUserActivity);

      resetTimer();

      return () => {
        clearTimeout(inactivityTimer);
        document.removeEventListener("mousemove", handleUserActivity);
        document.removeEventListener("keydown", handleUserActivity);
      };
    }
  }, [appData.appLockSettings.autoLock]);

  const unlockAppLock = () => {
    if (password.trim().length === 0) {
      setErrorData({ error: true, message: "Password is required" });
      return;
    } else if (appData.appLockSettings.password !== password.trim()) {
      setErrorData({ error: true, message: "Password doesn't match" });
      return;
    }
    dispatch(updateLockStateAppLockSettings(false));
    setPassword("");
    setErrorData({ error: false, message: "Password is required" });
  };

  return (
    <Dialog
      open={appData.appLockSettings.lockState}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 400,
          maxWidth: 700,
        },
      }}
      id="appLockDialog"
    >
      <DialogTitle
        id="responsive-dialog-title"
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          px: 1,
        }}
      >
        Unlock App
      </DialogTitle>
      <DialogContent sx={{ px: 1 }}>
        <Stack gap={1}>
          <Typography variant="body1">
            Enter your password to unlock app
          </Typography>
          <TextField
            type="password"
            size="small"
            placeholder="Password"
            autoComplete="off"
            autoFocus
            onChange={(e) => setPassword(e.target.value)}
            error={errorData.error}
            helperText={errorData.error && errorData.message}
            onKeyDown={(ev) => {
              if (ev.key === "Enter") {
                ev.preventDefault();
                unlockAppLock();
              }
            }}
          />
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button
          variant="contained"
          sx={{ width: "100%" }}
          onClick={unlockAppLock}
        >
          Unlock
        </Button>
      </DialogActions>
    </Dialog>
  );
}
