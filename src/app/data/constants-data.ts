import { AuthOptions } from "next-auth";
import GoogleProvider from "next-auth/providers/google";

// backend server url
export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;

// socket server url
export const socketURL: string =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://192.168.1.65:3001";

// highly sensitive application googleId
export const googleId = process.env.NEXT_PUBLIC_GOOGLE_ID;

// all notifications supported in the app
export const notificationsList = [
  {
    key: "default",
    name: "Default",
    path: "/assets/notifications/default-notification.mp3",
  },
  {
    key: "biwa",
    name: "Biwa",
    path: "/assets/notifications/biwa-notification.mp3",
  },
  {
    key: "chime",
    name: "Chime",
    path: "/assets/notifications/chime-notification.mp3",
  },
  {
    key: "crossing",
    name: "Crossing",
    path: "/assets/notifications/crossing-notification.mp3",
  },
  {
    key: "digivice",
    name: "Digivice",
    path: "/assets/notifications/digivice-notification.mp3",
  },
  {
    key: "drop",
    name: "Drop",
    path: "/assets/notifications/drop-notification.mp3",
  },
  {
    key: "moshimosh",
    name: "Moshi-mosh",
    path: "/assets/notifications/moshimosh-notification.mp3",
  },
  {
    key: "tuturu",
    name: "Tuturu",
    path: "/assets/notifications/tuturu-notification.mp3",
  },
  {
    key: "uwu",
    name: "UwU",
    path: "/assets/notifications/uwu-notification.mp3",
  },
];

// public paths for middleware
export const publicPaths = [
  "/",
  "/auth/login",
  "/auth/signup",
  "/auth/forgot-password",
];

// number of chats per page
export const NUMBER_OF_CHATS_PER_PAGE_LIMIT = 30;

// auth options configuration for google sign in
export const authOptions: AuthOptions = {
  providers: [
    GoogleProvider({
      clientId: process.env.NEXT_PUBLIC_GOOGLE_ID ?? "",
      clientSecret: process.env.NEXT_PUBLIC_GOOGLE_SECRET ?? "",
      authorization: {
        params: {
          prompt: "consent",
          access_type: "offline",
          response_type: "code",
        },
      },
    }),
  ],
  pages: {
    signIn: "/auth/login", // Set to false to disable the default sign-in page
  },
  callbacks: {
    async jwt({ token, user, account }) {
      // Persist the OAuth access_token to the token right after signin

      if (account) {
        token.id_token = account.id_token;
      }
      return token;
    },
    async session({ session, token }: any) {
      // Send properties to the client, like an access_token from a provider.
      session.id_token = token.id_token;
      return session;
    },
  },
};
