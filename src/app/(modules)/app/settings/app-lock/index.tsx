"use client";
import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import EnableAppLockDialog from "./components/enable-app-lock-dialog.component";
import DisableAppLockDialog from "./components/disable-app-lock-dialog.component";
import { useDispatch, useSelector } from "react-redux";
import ResetAppLockDialog from "./components/reset-app-lock-dialog.component";
import {
  handleDisableAppLockDialogState,
  handleEnableAppLockDialogState,
  handleResetAppLockDialogState,
} from "@/app/services/redux/slices/dialog-config.slice";
import { updateAutoLockAppLockSettings } from "@/app/services/redux/slices/app-data.slice";
export default function AppLock() {
  const dispatch = useDispatch();
  const dialogConfig = useSelector((store: any) => store.dialogConfig);
  const appData = useSelector((store: any) => store.appData);
  const lockState = appData.appLockSettings.enabled ? "yes" : "no";

  const openDisableAppLockDialog = () => {
    if (!appData.appLockSettings.enabled) {
      return;
    }
    dispatch(handleDisableAppLockDialogState(true));
  };

  const openEnableAppLockDialog = () => {
    if (appData.appLockSettings.enabled) {
      return;
    }
    dispatch(handleEnableAppLockDialogState(true));
  };

  const handleAutoLock = (
    event: React.MouseEvent<HTMLElement>,
    newSetting: number | null
  ) => {
    if (newSetting !== null) {
      dispatch(updateAutoLockAppLockSettings(newSetting));
    }
  };

  return (
    <>
      <ActiveSettingsHeader
        settingTitle="App Lock"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <Stack gap={4} p={1}>
        <Stack gap={2}>
          <Typography variant="subtitle2">Enable App Lock</Typography>
          <Box>
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              size="small"
              value={lockState}
            >
              <ToggleButton
                value="no"
                aria-label="left aligned"
                color="error"
                onClick={openDisableAppLockDialog}
              >
                <LockOpenTwoToneIcon />
              </ToggleButton>
              <ToggleButton
                value="yes"
                aria-label="centered"
                color="success"
                onClick={openEnableAppLockDialog}
              >
                <LockTwoToneIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
        {lockState === "yes" && (
          <>
            <Stack gap={2}>
              <Typography variant="subtitle2">Auto Lock</Typography>
              <Box>
                <ToggleButtonGroup
                  exclusive
                  aria-label="text alignment"
                  size="small"
                  value={appData.appLockSettings.autoLock}
                  orientation="vertical"
                  onChange={handleAutoLock}
                >
                  <ToggleButton value={-1} aria-label="left aligned">
                    Never
                  </ToggleButton>
                  <ToggleButton value={0} aria-label="left aligned">
                    Immediately when out of tab
                  </ToggleButton>
                  <ToggleButton value={300000} aria-label="centered">
                    After 05 minutes of inactivity
                  </ToggleButton>
                  <ToggleButton value={600000} aria-label="centered">
                    After 10 minutes of inactivity
                  </ToggleButton>
                  <ToggleButton value={900000} aria-label="centered">
                    After 15 minutes of inactivity
                  </ToggleButton>
                </ToggleButtonGroup>
              </Box>
            </Stack>
            <Box>
              <Button
                variant="outlined"
                size="small"
                onClick={() => dispatch(handleResetAppLockDialogState(true))}
              >
                Reset Password
              </Button>
            </Box>
          </>
        )}
      </Stack>
      {dialogConfig.enableAppLockDialogState && <EnableAppLockDialog />}
      {dialogConfig.disableAppLockDialogState && <DisableAppLockDialog />}
      {dialogConfig.resetAppLockDialogState && <ResetAppLockDialog />}
    </>
  );
}
