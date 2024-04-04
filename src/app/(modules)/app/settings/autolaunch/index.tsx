import { Stack, Typography } from "@mui/material";
import ActiveSettingsHeader from "../components/active-settings-header.component";
import {
  CHROME_PWA_APPS,
  PWA_AUTOSTART_MENU,
  PWA_INSTALL_POPUP,
} from "@/app/data/assets-data";

export default function AutoLaunchAppSteps() {
  return (
    <>
      <ActiveSettingsHeader
        settingTitle="Autolaunch App"
        onCancel={() => {}}
        onSave={() => {}}
      />

      <Stack p={1} gap={4}>
        <Stack gap={1}>
          <Typography variant="subtitle2">
            Firstly install our app from the install popup.
          </Typography>
          <img
            src={PWA_INSTALL_POPUP}
            alt="PWA INSTALL POPUP"
            width={"100%"}
            style={{
              maxWidth: 400,
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #21978B",
              padding: 3,
            }}
          />
        </Stack>
        <Stack gap={1}>
          <Typography variant="subtitle2">
            Then in the chrome search bar type{" "}
            <span style={{ color: "#21978B" }}> about://apps </span> and hit
            enter. You will see all your apps.
          </Typography>
          <img
            src={CHROME_PWA_APPS}
            alt="CHROME PWA APPS"
            width={"100%"}
            style={{
              maxWidth: 400,
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #21978B",
              padding: 3,
            }}
          />
        </Stack>
        <Stack gap={1}>
          {" "}
          <Typography variant="subtitle2">
            Right click on Chatto and from options check
            <span style={{ color: "#21978B" }}> Launch at Startup. </span>
          </Typography>
          <img
            src={PWA_AUTOSTART_MENU}
            alt="PWA AUTOSTART MENU"
            width={"100%"}
            style={{
              maxWidth: 400,
              maxHeight: 200,
              objectFit: "cover",
              borderRadius: 10,
              border: "2px solid #21978B",
              padding: 3,
            }}
          />
        </Stack>
        <Typography variant="subtitle2">
          <span style={{ color: "#21978B" }}> VOILA! </span>
          your app will now autostart everytime you login into OS.
        </Typography>
      </Stack>
    </>
  );
}
