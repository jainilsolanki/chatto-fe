import { Stack, Typography } from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";

export default function Advanced() {
  return (
    <>
      <ActiveSettingsHeader
        settingTitle="Advanced"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <Stack gap={2} p={1}>
        <Typography variant="subtitle2">Send Message with</Typography>
      </Stack>
    </>
  );
}
