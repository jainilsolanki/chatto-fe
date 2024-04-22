import AppLayout from "@/app/components/layouts/app.layout";
import FriendsPanel from "./friends-panel/friends-panel.component";

export default function OnlyFriendsLayout({ children }) {
  return <AppLayout leftPanel={<FriendsPanel />} rightPanel={children} />;
}
