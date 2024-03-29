export const baseURL = process.env.NEXT_PUBLIC_BASE_URL;
export const socketURL: string =
  process.env.NEXT_PUBLIC_SOCKET_URL ?? "http://192.168.1.65:3001";
export const isAuthenticated = false;

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
