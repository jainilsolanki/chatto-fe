import AppLayout from "@/app/components/layouts/app.layout";
import FriendsPanel from "./friends-panel/friends-panel.component";

export default function FriendsLayout({ children }) {
  return <AppLayout leftPanel={<FriendsPanel />} rightPanel={children} />;
}
