import { PaletteMode } from "@mui/material";

export type AppData = {
  theme: PaletteMode;
  notificationSettings: NotificationSetting;
  appLockSettings: AppLockSettings;
};

export type NotificationSetting = {
  muted: string;
  paused: string;
  notification: string;
  autohide: string;
};

export type AppLockSettings = {
  lockState: boolean;
  password: string;
  enabled: boolean;
  autoLock: any;
};