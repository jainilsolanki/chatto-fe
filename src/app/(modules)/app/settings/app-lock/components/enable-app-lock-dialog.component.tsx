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
import CloseIcon from "@mui/icons-material/Close";
export default function EnableAppLockDialog() {
  return (
    <Dialog
      open={true}
      //   onClose={handleClose}
      aria-labelledby="responsive-dialog-title"
      sx={{
        "& .MuiDialog-paper": {
          minWidth: 400,
          maxWidth: 700,
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
        Enable App Lock
        <IconButton>
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      <DialogContent>
        <Stack gap={2}>
          <Stack gap={1}>
            <Typography variant="body1"> Your New Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Password"
              autoFocus
              autoComplete="off"
            />
          </Stack>
          <Stack gap={1}>
            <Typography variant="body1"> Confirm New Password</Typography>
            <TextField
              type="password"
              size="small"
              placeholder="Confirm Password"
              autoComplete="off"
            />
          </Stack>
        </Stack>
      </DialogContent>
      <DialogActions>
        <Button variant="contained" sx={{ width: "100%" }}>
          Enable
        </Button>
      </DialogActions>
    </Dialog>
  );
}
