"use client";
import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ACCOUNT_NOT_FOUND } from "@/app/data/assets-data";
import { useDispatch, useSelector } from "react-redux";
import { handleGoogleAccountNotFoundDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { useRouter } from "next/navigation";
export default function GoogleAccountNotFoundDialog() {
  const dispatch = useDispatch();
  const router = useRouter();
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const handleClose = () => {
    dispatch(handleGoogleAccountNotFoundDialogState(false));
  };

  const handleCreateNewAccount = () => {
    router.push("/auth/signup");
    dispatch(handleGoogleAccountNotFoundDialogState(false));
  };
  return (
    <>
      <Dialog
        open={dialogConfig.googleAccountNotFoundDialogState}
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
          No Account Found
          <IconButton>
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
              src={ACCOUNT_NOT_FOUND}
              width={"100%"}
              style={{ maxWidth: 200 }}
              alt="Account does not exist banner"
              loading="lazy"
            />
            <Stack gap={2}>
              <Typography color={"error"}>
                We can't find any account associated with the following Google
                account.
              </Typography>
              <Typography>Do you want to create new account?</Typography>
            </Stack>
          </Stack>
        </DialogContent>
        <DialogActions>
          <Button
            variant="outlined"
            sx={{ width: "100%" }}
            onClick={handleClose}
          >
            Not Now
          </Button>
          <Button
            variant="contained"
            sx={{ width: "100%" }}
            onClick={handleCreateNewAccount}
          >
            Create New account
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
