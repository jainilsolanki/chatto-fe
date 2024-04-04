"use client";
import { useEffect, useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { createTheme } from "@mui/material";
import { getDesignTokens } from "../data/theme";
import store from "../services/redux";

export default function AppThemeProvider({ children }) {
  const persistedData = localStorage?.getItem("persist:root");
  const initialThemeData = persistedData
    ? JSON.parse(JSON.parse(persistedData).appData)?.theme
    : "light";
  const [theme, setTheme] = useState(
    createTheme(getDesignTokens(initialThemeData))
  );

  useEffect(() => {
    const unsubscribe = store.subscribe(() => {
      const updatedTheme = createTheme(
        getDesignTokens(store.getState().appData.theme)
      );
      setTheme(updatedTheme);
    });

    // Unsubscribe from the store when the component unmounts
    return () => unsubscribe();
  }, []);

  return <ThemeProvider theme={theme}>{children}</ThemeProvider>;
}
