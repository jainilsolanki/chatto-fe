"use client";

import {
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import PanelHeader from "../../components/panel-header/panel-header.component";
import BrushTwoToneIcon from "@mui/icons-material/BrushTwoTone";
import HttpsTwoToneIcon from "@mui/icons-material/HttpsTwoTone";
import SecurityTwoToneIcon from "@mui/icons-material/SecurityTwoTone";
import ArticleTwoToneIcon from "@mui/icons-material/ArticleTwoTone";
import GavelTwoToneIcon from "@mui/icons-material/GavelTwoTone";
import NotificationsNoneTwoToneIcon from "@mui/icons-material/NotificationsNoneTwoTone";
import TranslateTwoToneIcon from "@mui/icons-material/TranslateTwoTone";
import TuneTwoToneIcon from "@mui/icons-material/TuneTwoTone";
const SettingsPanel = ({
  activeSetting,
  setActiveSetting,
}: {
  activeSetting: string;
  setActiveSetting: Function;
}) => {
  const settings = [
    {
      key: "customisations",
      title: "Customisations",
      icon: <BrushTwoToneIcon />,
      onClick: () => {
        setActiveSetting("customisations");
      },
    },
    {
      key: "app_lock",
      title: "App Lock",
      icon: <HttpsTwoToneIcon />,
      onClick: () => {
        setActiveSetting("app_lock");
      },
    },
    {
      key: "notifications",
      title: "Notifications",
      icon: <NotificationsNoneTwoToneIcon />,
      onClick: () => {
        setActiveSetting("notifications");
      },
    },
    {
      key: "language_and_region",
      title: "Language and Region",
      icon: <TranslateTwoToneIcon />,
      onClick: () => {
        setActiveSetting("language_and_region");
      },
    },
    {
      key: "visibility",
      title: "Visibility",
      icon: <SecurityTwoToneIcon />,
      onClick: () => {
        setActiveSetting("visibility");
      },
    },
    {
      key: "advanced",
      title: "Advanced",
      icon: <TuneTwoToneIcon />,
      onClick: () => {
        setActiveSetting("advanced");
      },
    },
    {
      key: "privacy_policy",
      title: "Privacy Policy",
      icon: <ArticleTwoToneIcon />,
      onClick: () => {
        setActiveSetting("privacy_policy");
      },
    },
    {
      key: "terms_and_conditions",
      title: "Terms and Conditions",
      icon: <GavelTwoToneIcon />,
      onClick: () => {
        setActiveSetting("terms_and_conditions");
      },
    },
  ];
  return (
    <>
      {/* Panel Header */}
      <PanelHeader title={"Settings"} showOptions={false} />
      {/* Settings List */}
      <List>
        {settings.map((setting, index) => {
          return (
            <ListItem key={setting.key} sx={{ px: 1 }}>
              <ListItemButton
                sx={{ borderRadius: 4 }}
                selected={setting.key === activeSetting}
                onClick={setting.onClick}
              >
                <ListItemIcon>{setting.icon}</ListItemIcon>
                <ListItemText primary={setting.title} />
              </ListItemButton>
            </ListItem>
          );
        })}
      </List>
    </>
  );
};

export default SettingsPanel;
