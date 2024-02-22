import { Stack } from "@mui/material";
import Sidebar from "../components/sidebar.component";
import SocketConnection from "../components/socket.connection";

export default function AppWrapper({ children }: any) {
  return (
    <>
      <Stack direction={"row"}>
        <SocketConnection />
        <Sidebar />
        {children}
      </Stack>
    </>
  );
}
