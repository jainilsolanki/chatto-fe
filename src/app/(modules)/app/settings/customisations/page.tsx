import { Stack } from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import ThemeCustomisation from "./components/theme.customisation.component";

export default function Customisations() {
  return (
    <Stack>
      <ActiveSettingsHeader
        settingTitle="Customisations"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <ThemeCustomisation />
    </Stack>
  );
}
