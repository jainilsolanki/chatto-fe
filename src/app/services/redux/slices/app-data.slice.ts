import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AppData, NotificationSetting } from "../types/app-data.type";
import { PaletteMode } from "@mui/material";

export const appDataInitialState: AppData = {
  theme: "light",
  notificationSettings: {
    muted: "no",
    paused: "no",
    notification: "/assets/notifications/default-notification.mp3",
    autohide: "yes",
  },
};
const appDataSlice = createSlice({
  name: "appDataSlice",
  initialState: appDataInitialState,
  reducers: {
    handleAppTheme(state, action: PayloadAction<PaletteMode>) {
      let s = current(state);
      return { ...s, theme: action.payload };
    },
    updateMutedNotificationSettings(state, action: PayloadAction<string>) {
      let s = current(state);

      return {
        ...s,
        notificationSettings: {
          ...s.notificationSettings,
          muted: action.payload,
        },
      };
    },
    updatePausedNotificationSettings(state, action: PayloadAction<string>) {
      let s = current(state);

      return {
        ...s,
        notificationSettings: {
          ...s.notificationSettings,
          paused: action.payload,
        },
      };
    },
    updateNotificationNotificationSettings(
      state,
      action: PayloadAction<string>
    ) {
      let s = current(state);

      return {
        ...s,
        notificationSettings: {
          ...s.notificationSettings,
          notification: action.payload,
        },
      };
    },
    updateAutohideNotificationSettings(state, action: PayloadAction<string>) {
      let s = current(state);

      return {
        ...s,
        notificationSettings: {
          ...s.notificationSettings,
          autohide: action.payload,
        },
      };
    },
    clearAppDataSlice() {
      return { ...appDataInitialState };
    },
  },
});

export const {
  handleAppTheme,
  clearAppDataSlice,
  updateMutedNotificationSettings,
  updatePausedNotificationSettings,
  updateNotificationNotificationSettings,
  updateAutohideNotificationSettings,
} = appDataSlice.actions;
export default appDataSlice.reducer;
