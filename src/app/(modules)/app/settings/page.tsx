"use client";
import AppLayout from "@/app/components/layouts/app.layout";
import AppWrapper from "@/app/wrappers/app.wrapper";
import React, { useState } from "react";
import SettingsPanel from "./components/settings-panel.component";
export default function Settings() {
  const [activeSetting, setActiveSetting] = useState("customisations");

  const getActiveSetting = () => {
    switch (activeSetting) {
      case "customisations":
        return <>Customisations</>;
        break;
      case "app_lock":
        return <>App lock</>;
        break;
      case "notifications":
        return <>Notifications</>;
        break;
      case "language_and_region":
        return <>Language and Region</>;
        break;
      case "visibility":
        return <>visibility</>;
        break;
      case "advanced":
        return <>advanced</>;
        break;
      case "privacy_policy":
        return <>provacy policy</>;
        break;
      case "terms_and_conditions":
        return <>terms and conditions</>;
        break;

      default:
        return <>Customisations</>;
    }
  };
  return (
    <AppWrapper>
      <AppLayout
        leftPanel={
          <SettingsPanel
            activeSetting={activeSetting}
            setActiveSetting={setActiveSetting}
          />
        }
        rightPanel={getActiveSetting()}
      />
    </AppWrapper>
  );
}
