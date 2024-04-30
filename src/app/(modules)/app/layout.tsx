import Sidebar from "@/app/components/sidebar.component";
import SocketConnection from "@/app/components/socket.connection";
import { Hidden, Stack } from "@mui/material";
import AuthenticateAppLockDialog from "./settings/app-lock/components/authenticate-app-lock-dialog.component";
import BottomBar from "@/app/components/bottom-bar.component";

export default function AppWrapperLayout({ children }: any) {
  return (
    <>
      <Stack direction={"row"}>
        <SocketConnection />
        <Hidden lgDown>
          <Sidebar />
        </Hidden>
        <AuthenticateAppLockDialog />
        {children}
        <Hidden lgUp>
          <BottomBar />
        </Hidden>
      </Stack>
    </>
  );
}
