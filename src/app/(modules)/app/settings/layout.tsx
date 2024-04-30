import AppLayout from "@/app/components/layouts/app.layout";
import SettingsPanel from "./components/settings-panel.component";

export default function SettingsLayout({ children }) {
  return <AppLayout leftPanel={<SettingsPanel />} rightPanel={children} />;
}
