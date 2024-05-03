"use client";

import { SessionProvider } from "next-auth/react";
import { useEffect } from "react";

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  useEffect(() => {
    navigator.serviceWorker.register("/csw.js").then(
      (registration) => {
        console.log(
          "ServiceWorker registration successful with scope: ",
          registration
        );
      },
      (err) => {
        console.log("ServiceWorker registration failed: ", err);
      }
    );
  }, []);
  return <SessionProvider>{children}</SessionProvider>;
}
