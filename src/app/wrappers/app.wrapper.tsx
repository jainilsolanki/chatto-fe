import { Stack } from "@mui/material";
import Sidebar from "../components/sidebar.component";
import SocketConnection from "../components/socket.connection";
import AuthenticateAppLockDialog from "../(modules)/app/settings/app-lock/components/authenticate-app-lock-dialog.component";

export default function AppWrapper({ children }: any) {
  return (
    <>
      <Stack direction={"row"}>
        <SocketConnection />
        <Sidebar />
        <AuthenticateAppLockDialog />
        {children}
      </Stack>
    </>
  );
}
