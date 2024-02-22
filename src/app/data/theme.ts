"use client";
import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    primary: {
      main: "#21978B",
      light: "#4F5665",
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
      color: "#222222",
      fontWeight: "bold",
    },
    h2: {
      fontSize: 64,
      lineHeight: "72px",
      color: "#222222",
    },
    h3: {
      fontSize: 52,
      lineHeight: "60px",
      color: "#222222",
    },
    h4: {
      fontSize: 44,
      lineHeight: "52px",
      color: "#222222",
    },
    h5: {
      fontSize: 36,
      lineHeight: "44px",
      color: "#222222",
    },
    h6: {
      fontSize: 24,
      lineHeight: "36px",
      color: "#222222",
    },
    subtitle1: {
      fontSize: 24,
      lineHeight: "32px",
      color: "#222222",
    },
    subtitle2: {
      fontSize: 20,
      lineHeight: "32px",
      color: "#222222",
    },
    body1: {
      fontSize: 16,
      lineHeight: "24px",
      color: "#222222",
    },
    body2: {
      fontSize: 14,
      lineHeight: "24px",
      color: "#222222",
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
      color: "#222222",
    },
    overline: {
      fontSize: 18,
      lineHeight: "29px",
      color: "#222222",
    },
  },
});
