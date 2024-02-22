"use client";
import React, { useState } from "react";
import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

const useCustomSnackbar = () => {
  const [open, setOpen] = useState(false);
  const [message, setMessage] = useState("");
  const [severity, setSeverity] = useState<any>("info");
  const [autoHideDuration, setAutoHideDuration] = useState<any>(6000);

  const handleClose = () => {
    setOpen(false);
  };

  const showSnackbar = (
    message: any,
    severity = "info",
    autoHideDuration = 6000
  ) => {
    setMessage(message);
    setSeverity(severity);
    setAutoHideDuration(autoHideDuration);
    setOpen(true);
  };

  const SnackbarComponent = () => (
    <Snackbar
      open={open}
      autoHideDuration={autoHideDuration}
      onClose={handleClose}
    >
      <Alert onClose={handleClose} severity={severity} sx={{ width: "100%" }}>
        {message}
      </Alert>
    </Snackbar>
  );

  return { showSnackbar, SnackbarComponent };
};

export default useCustomSnackbar;
