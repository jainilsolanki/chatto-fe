import { PaletteMode } from "@mui/material";

export type AppData = {
  theme: PaletteMode;
  notificationSettings: NotificationSetting;
};

export type NotificationSetting = {
  muted: string;
  paused: string;
  ringtone: string;
};
