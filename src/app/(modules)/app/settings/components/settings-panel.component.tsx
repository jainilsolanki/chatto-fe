"use client";
import { motion } from "framer-motion";
import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Stack,
} from "@mui/material";
import PanelHeader from "../../components/panel-header/panel-header.component";
import BrushTwoToneIcon from "@mui/icons-material/BrushTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
// import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
// import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
// import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
// import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
// import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
import RocketLaunchTwoToneIcon from "@mui/icons-material/RocketLaunchTwoTone";
import { usePathname, useRouter } from "next/navigation";
const SettingsPanel = () => {
  const pathname = usePathname();
  const router = useRouter();
  const settings = [
    {
      key: "customisations",
      title: "Customisations",
      icon: <BrushTwoToneIcon />,
      onClick: () => {
        router.push("/app/settings/customisations");
      },
    },
    {
      key: "app-lock",
      title: "App Lock",
      icon: <HttpsTwoToneIcon />,
      onClick: () => {
        router.push("/app/settings/app-lock");
      },
    },
    {
      key: "notifications",
      title: "Notifications",
      icon: <NotificationsNoneTwoToneIcon />,
      onClick: () => {
        router.push("/app/settings/notifications");
      },
    },
    {
      key: "autolaunchapp",
      title: "Autolaunch App",
      icon: <RocketLaunchTwoToneIcon />,
      onClick: () => {
        router.push("/app/settings/autolaunchapp");
      },
    },
    // {
    //   key: "language_and_region",
    //   title: "Language and Region",
    //   icon: <TranslateTwoToneIcon />,
    //   onClick: () => {
    //     setActiveSetting("language_and_region");
    //   },
    // },
    // {
    //   key: "visibility",
    //   title: "Visibility",
    //   icon: <SecurityTwoToneIcon />,
    //   onClick: () => {
    //     setActiveSetting("visibility");
    //   },
    // },
    // {
    //   key: "advanced",
    //   title: "Advanced",
    //   icon: <TuneTwoToneIcon />,
    //   onClick: () => {
    //     setActiveSetting("advanced");
    //   },
    // },
    // {
    //   key: "privacy_policy",
    //   title: "Privacy Policy",
    //   icon: <ArticleTwoToneIcon />,
    //   onClick: () => {
    //     setActiveSetting("privacy_policy");
    //   },
    // },
    // {
    //   key: "terms_and_conditions",
    //   title: "Terms and Conditions",
    //   icon: <GavelTwoToneIcon />,
    //   onClick: () => {
    //     setActiveSetting("terms_and_conditions");
    //   },
    // },
  ];
  return (
    <Stack>
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.5 }}
      >
        {/* Panel Header */}
        <PanelHeader title={"Settings"} showOptions={false} />
        {/* Settings List */}
        <Stack height={"calc(100vh - 124px)"} sx={{ overflowY: "auto" }}>
          <List>
            {settings.map((setting) => {
              return (
                <ListItem key={setting.key} sx={{ px: 1 }}>
                  <ListItemButton
                    sx={{ borderRadius: 4 }}
                    selected={setting.key === pathname.split("/")[3]}
                    onClick={setting.onClick}
                  >
                    <ListItemIcon>{setting.icon}</ListItemIcon>
                    <ListItemText primary={setting.title} />
                  </ListItemButton>
                </ListItem>
              );
            })}
          </List>
        </Stack>
      </motion.div>
    </Stack>
  );
};

export default SettingsPanel;
