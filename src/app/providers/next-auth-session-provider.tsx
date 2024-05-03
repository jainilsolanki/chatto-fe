"use client";

import { SessionProvider } from "next-auth/react";

export default function NextAuthSessionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return <SessionProvider>{children}</SessionProvider>;
}

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
