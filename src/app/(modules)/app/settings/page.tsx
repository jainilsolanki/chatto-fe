"use client";
import { usePathname, useRouter } from "next/navigation";
import React, { useEffect } from "react";
import SettingsPanel from "./components/settings-panel.component";
import { Hidden, Theme, useMediaQuery } from "@mui/material";

export default function Settings() {
  const matches = useMediaQuery((theme: Theme) => theme.breakpoints.down("lg"));
  const router = useRouter();
  const pathname = usePathname();
  useEffect(() => {
    if (pathname === "/app/settings" && !matches) {
      router.push("/app/settings/customisations");
    }
  }, [router, matches]);
  return <>{matches && <SettingsPanel />} </>;
}
