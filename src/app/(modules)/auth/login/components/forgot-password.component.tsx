import { handleForgotPasswordDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import CloseIcon from "@mui/icons-material/Close";
import { FORGOT_PASSWORD } from "@/app/data/assets-data";
import { enqueueSnackbar } from "notistack";
export default function ForgotPasswordDialog() {
  const dispatch = useDispatch();
  const [email, setEmail] = useState<string>("");
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const [error, setError] = useState(false);
  const handleClose = () => {
    dispatch(handleForgotPasswordDialogState(false));
    setError(false);
  };

  const sendPasswordResetLink = () => {
    if (email.trim().length === 0) {
      setError(true);
      return;
    }

    enqueueSnackbar("Password reset link has been sent to your email id", {
      variant: "success",
    });
  };
  return (
    <>
      <Dialog
        open={dialogConfig.forgotPasswordDialogState}
        onClose={handleClose}
        aria-labelledby="responsive-dialog-title"
        sx={{
          "& .MuiDialog-paper": {
            maxWidth: 600,
          },
        }}
      >
        <DialogTitle
          id="responsive-dialog-title"
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          Forgot Password
          <IconButton onClick={handleClose}>
            <CloseIcon />
          </IconButton>
        </DialogTitle>
        <DialogContent>
          <Stack
            direction={"row"}
            alignItems={"center"}
            justifyContent={"center"}
            gap={5}
          >
            <img
              src={FORGOT_PASSWORD}
              width={"100%"}
              style={{ maxWidth: 200 }}
              alt="ADD_FRIEND_BANNER"
              loading="lazy"
            />
            <Stack gap={2}>
              <Typography fontSize={18} fontWeight={"medium"}>
                Enter your email id and we will send you a password reset link.
              </Typography>
              <TextField
                placeholder="Email Id"
                onChange={(e) => setEmail(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    e.preventDefault();
                    sendPasswordResetLink();
                  }
                }}
                autoFocus
                error={error}
                helperText={error && "Email ID is required"}
                type="email"
              />
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={sendPasswordResetLink}
          >
            Send Reset link
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
