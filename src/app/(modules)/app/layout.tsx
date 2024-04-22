import Sidebar from "@/app/components/sidebar.component";
import SocketConnection from "@/app/components/socket.connection";
import { Stack } from "@mui/material";
import AuthenticateAppLockDialog from "./settings/app-lock/components/authenticate-app-lock-dialog.component";

export default function AppWrapperLayout({ children }: any) {
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
