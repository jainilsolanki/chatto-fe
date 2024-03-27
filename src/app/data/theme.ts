"use client";
import { createTheme } from "@mui/material/styles";
import store from "../services/redux";

export const theme = createTheme({
  palette: {
    mode: store.getState().appData.theme ?? "light",
    primary: {
      main: "#21978B",
      light: "#d3eae8",
      dark: "#323232",
    },
    secondary: {
      main: "#7B7FEA",
      dark: "#3D3F79",
    },
    common: {
      black: "#141414",
      white: "#FBFBFD",
    },
    background: {
      default: "#FBFBFD",
    },
  },
  typography: {
    fontSize: 16,
    fontWeightLight: 400,
    fontWeightRegular: 400,
    fontWeightMedium: 600,
    fontWeightBold: 700,
    h1: {
      fontSize: 72,
      lineHeight: "80px",

      fontWeight: "bold",
    },
    h2: {
      fontSize: 64,
      lineHeight: "72px",
    },
    h3: {
      fontSize: 52,
      lineHeight: "60px",
    },
    h4: {
      fontSize: 44,
      lineHeight: "52px",
    },
    h5: {
      fontSize: 36,
      lineHeight: "44px",
    },
    h6: {
      fontSize: 24,
      lineHeight: "36px",
    },
    subtitle1: {
      fontSize: 24,
      lineHeight: "32px",
    },
    subtitle2: {
      fontSize: 20,
      lineHeight: "32px",
    },
    body1: {
      fontSize: 16,
      lineHeight: "24px",
    },
    body2: {
      fontSize: 14,
      lineHeight: "24px",
    },
    // button: {
    //   textTransform: "none",
    //   fontSize: 16,
    //   lineHeight: "26px",
    //   fontWeight: 400,
    // },
    caption: {
      fontSize: 12,
      lineHeight: "20px",
    },
    overline: {
      fontSize: 18,
      lineHeight: "29px",
    },
  },
});
