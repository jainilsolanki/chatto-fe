import { createSlice, current, PayloadAction } from "@reduxjs/toolkit";
import { AppData } from "../types/app-data.type";
import { PaletteMode } from "@mui/material";

export const appDataInitialState: AppData = {
  theme: "dark",
};
const appDataSlice = createSlice({
  name: "appDataSlice",
  initialState: appDataInitialState,
  reducers: {
    handleAppTheme(state, action: PayloadAction<PaletteMode>) {
      let s = current(state);
      return { ...s, theme: action.payload };
    },
    clearAppDataSlice() {
      return { ...appDataInitialState };
    },
  },
});

export const { handleAppTheme, clearAppDataSlice } = appDataSlice.actions;
export default appDataSlice.reducer;
