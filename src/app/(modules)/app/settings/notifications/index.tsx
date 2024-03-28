"use client";
import {
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import FormatAlignLeftIcon from "@mui/icons-material/FormatAlignLeft";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import FormatAlignRightIcon from "@mui/icons-material/FormatAlignRight";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  updateMutedNotificationSettings,
  updatePausedNotificationSettings,
  updateRingtoneNotificationSettings,
} from "@/app/services/redux/slices/app-data.slice";
export default function Notifications() {
  const dispatch = useDispatch();
  const appData = useSelector((state: any) => state.appData);
  const handleMuted = (
    event: React.MouseEvent<HTMLElement>,
    newSetting: string | null
  ) => {
    if (newSetting !== null) {
      dispatch(updateMutedNotificationSettings(newSetting));
    }
  };

  const handlePaused = (
    event: React.MouseEvent<HTMLElement>,
    newSetting: string | null
  ) => {
    if (newSetting !== null) {
      dispatch(updatePausedNotificationSettings(newSetting));
    }
  };

  const handleTune = (event: SelectChangeEvent) => {
    dispatch(updateRingtoneNotificationSettings(event.target.value));
  };

  return (
    <>
      <ActiveSettingsHeader
        settingTitle="Notifications"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <Stack p={1} gap={4}>
        <Stack gap={2}>
          <Typography variant="subtitle2">Mute notifications</Typography>
          <ToggleButtonGroup
            value={appData.notificationSettings.muted}
            exclusive
            aria-label="text alignment"
            size="small"
            onChange={handleMuted}
          >
            <ToggleButton value="no" aria-label="left aligned" color="error">
              <CloseIcon />
            </ToggleButton>
            <ToggleButton value="yes" aria-label="centered" color="success">
              <DoneIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack gap={2}>
          <Typography variant="subtitle2">Pause notifications</Typography>
          <ToggleButtonGroup
            value={appData.notificationSettings.paused}
            exclusive
            aria-label="text alignment"
            size="small"
            onChange={handlePaused}
          >
            <ToggleButton value="no" aria-label="left aligned" color="error">
              <CloseIcon />
            </ToggleButton>
            <ToggleButton value="yes" aria-label="centered" color="success">
              <DoneIcon />
            </ToggleButton>
          </ToggleButtonGroup>
        </Stack>

        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Typography variant="subtitle2">Notifications tune</Typography>
          <Select
            value={appData.notificationSettings.ringtone}
            placeholder="Tune"
            size="small"
            sx={{ width: 300 }}
            onChange={handleTune}
          >
            <MenuItem value={"default"}>Default</MenuItem>
            <MenuItem value={"onee"}>Onee</MenuItem>
            <MenuItem value={"chan"}>Chan</MenuItem>
          </Select>
        </Stack>
      </Stack>
    </>
  );
}
