"use client";
import AppLayout from "@/app/components/layouts/app.layout";
import AppWrapper from "@/app/wrappers/app.wrapper";
import React, { useState } from "react";
import SettingsPanel from "./components/settings-panel.component";
import Customisations from "./customisations";
import AppLock from "./app-lock";
import Notifications from "./notifications";
import LanguageRegion from "./language-region";
import Visibility from "./visibility";
import Advanced from "./advanced";
import PrivacyPolicy from "./privacypolicy";
import TermsConditions from "./terms-conditions";
import AutoLaunchAppSteps from "./autolaunch";
export default function Settings() {
  const [activeSetting, setActiveSetting] = useState("customisations");

  const getActiveSetting = () => {
    switch (activeSetting) {
      case "customisations":
        return <Customisations />;
        break;
      case "app_lock":
        return <AppLock />;
        break;
      case "notifications":
        return <Notifications />;
        break;
      case "language_and_region":
        return <LanguageRegion />;
        break;
      case "visibility":
        return <Visibility />;
        break;
      case "advanced":
        return <Advanced />;
        break;
      case "privacy_policy":
        return <PrivacyPolicy />;
        break;
      case "terms_and_conditions":
        return <TermsConditions />;
        break;
      case "autolaunchapp":
        return <AutoLaunchAppSteps />;
        break;

      default:
        return <Customisations />;
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
