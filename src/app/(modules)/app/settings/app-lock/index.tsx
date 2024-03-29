import {
  Box,
  Button,
  Stack,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import LockOpenTwoToneIcon from "@mui/icons-material/LockOpenTwoTone";
import LockTwoToneIcon from "@mui/icons-material/LockTwoTone";
import EnableAppLockDialog from "./components/enable-app-lock-dialog.component";
export default function AppLock() {
  return (
    <>
      <ActiveSettingsHeader
        settingTitle="App Lock"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <Stack gap={4} p={1}>
        <Stack gap={2}>
          <Typography variant="subtitle2">Enable App Lock</Typography>
          <Box>
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              size="small"
              value={"no"}
            >
              <ToggleButton value="no" aria-label="left aligned" color="error">
                <LockOpenTwoToneIcon />
              </ToggleButton>
              <ToggleButton value="yes" aria-label="centered" color="success">
                <LockTwoToneIcon />
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>

        <Stack gap={2}>
          <Typography variant="subtitle2">Auto Lock</Typography>
          <Box>
            <ToggleButtonGroup
              exclusive
              aria-label="text alignment"
              size="small"
              value={"0"}
              orientation="vertical"
            >
              <ToggleButton
                value="0"
                aria-label="left aligned"
                sx={{ border: "none" }}
              >
                Immediately when out of tab
              </ToggleButton>
              <ToggleButton
                value="5"
                aria-label="centered"
                sx={{ border: "none" }}
              >
                After 05 minutes of inactivity
              </ToggleButton>
              <ToggleButton
                value="10"
                aria-label="centered"
                sx={{ border: "none" }}
              >
                After 10 minutes of inactivity
              </ToggleButton>
              <ToggleButton
                value="15"
                aria-label="centered"
                sx={{ border: "none" }}
              >
                After 15 minutes of inactivity
              </ToggleButton>
            </ToggleButtonGroup>
          </Box>
        </Stack>
        <Box>
          <Button variant="outlined" size="small">
            Reset Password
          </Button>
        </Box>
      </Stack>
      <EnableAppLockDialog />
    </>
  );
}
