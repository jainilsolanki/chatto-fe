"use client";
import {
  IconButton,
  MenuItem,
  Select,
  SelectChangeEvent,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Tooltip,
  Typography,
} from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import CloseIcon from "@mui/icons-material/Close";
import DoneIcon from "@mui/icons-material/Done";
import { useDispatch, useSelector } from "react-redux";
import {
  updateAutohideNotificationSettings,
  updateMutedNotificationSettings,
  updateNotificationNotificationSettings,
  updatePausedNotificationSettings,
} from "@/app/services/redux/slices/app-data.slice";
import PlayCircleFilledTwoToneIcon from "@mui/icons-material/PlayCircleFilledTwoTone";
import HelpTwoToneIcon from "@mui/icons-material/HelpTwoTone";
import { notificationsList } from "@/app/data/constants-data";
import { MAC_NOTIFICATION_INFO } from "@/app/data/assets-data";

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
    dispatch(updateNotificationNotificationSettings(event.target.value));
  };

  const handleAutohide = (
    event: React.MouseEvent<HTMLElement>,
    newSetting: string | null
  ) => {
    if (newSetting !== null) {
      dispatch(updateAutohideNotificationSettings(newSetting));
    }
  };

  const testNotificationSound = (notification) => {
    new Audio(notification).play();
  };

  return (
    <Stack>
      <ActiveSettingsHeader
        settingTitle="Notifications"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <Stack
        p={1}
        gap={4}
        height={"calc(100vh - 124px)"}
        sx={{ overflowY: "auto" }}
      >
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

        <Stack gap={2}>
          <Stack direction={"row"} alignItems={"center"}>
            <Typography variant="subtitle2">Autohide notifications</Typography>
            <Tooltip
              leaveTouchDelay={10000}
              enterTouchDelay={0}
              title={
                <Stack gap={1}>
                  Mac users please make sure notifications are enabled and set
                  to alerts for Google Chrome Helper (Alerts)
                  <img
                    loading="lazy"
                    src={MAC_NOTIFICATION_INFO}
                    alt="MAC_NOTIFICATION_INFO_BANNER"
                    style={{ borderRadius: 10 }}
                  />
                </Stack>
              }
              placement="top"
              arrow
            >
              <IconButton size="small">
                <HelpTwoToneIcon sx={{ fontSize: 20 }} />
              </IconButton>
            </Tooltip>
          </Stack>
          <ToggleButtonGroup
            value={appData.notificationSettings.autohide}
            exclusive
            aria-label="text alignment"
            size="small"
            onChange={handleAutohide}
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
            value={appData.notificationSettings.notification}
            placeholder="Tune"
            size="small"
            sx={{
              width: 300,
            }}
            onChange={handleTune}
            renderValue={(selected) => {
              const selectedNotification =
                notificationsList.find(
                  (notification) => notification.path === selected
                )?.name || "";
              return <Stack>{selectedNotification}</Stack>;
            }}
          >
            {notificationsList.map((notification) => {
              return (
                <MenuItem
                  value={notification.path}
                  key={notification.key}
                  sx={{ display: "flex", justifyContent: "space-between" }}
                >
                  {notification.name}
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      testNotificationSound(notification.path);
                    }}
                    size="small"
                  >
                    <PlayCircleFilledTwoToneIcon sx={{ fontSize: 20 }} />
                  </IconButton>
                </MenuItem>
              );
            })}
          </Select>
        </Stack>
      </Stack>
    </Stack>
  );
}
