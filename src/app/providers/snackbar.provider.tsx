"use client";
import { IconButton } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import CloseIcon from "@mui/icons-material/Close";
export default function NotiStackSnackbarProvider({ children }) {
  function SnackbarCloseButton({ snackbarKey }) {
    return (
      <IconButton size="small" onClick={() => closeSnackbar(snackbarKey)}>
        <CloseIcon sx={{ color: "white", fontSize: 20 }} />
      </IconButton>
    );
  }
  return (
    <>
      <SnackbarProvider
        maxSnack={3}
        action={(snackbarKey) => (
          <SnackbarCloseButton snackbarKey={snackbarKey} />
        )}
        autoHideDuration={4000}
      />
      {children}
    </>
  );
}
