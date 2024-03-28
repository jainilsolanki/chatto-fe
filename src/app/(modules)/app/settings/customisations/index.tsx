import ActiveSettingsHeader from "../components/active-settings-header.component";
import ThemeCustomisation from "./components/theme.customisation.component";

export default function Customisations() {
  return (
    <>
      <ActiveSettingsHeader
        settingTitle="Customisations"
        onCancel={() => {}}
        onSave={() => {}}
      />
      <ThemeCustomisation />
    </>
  );
}
