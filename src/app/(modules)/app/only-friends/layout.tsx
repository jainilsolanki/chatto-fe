import AppLayout from "@/app/components/layouts/app.layout";
import AppWrapper from "@/app/wrappers/app.wrapper";
import FriendsPanel from "./friends-panel/friends-panel.component";

export default function OnlyFriendsLayout({ children }) {
  return (
    <AppWrapper>
      <AppLayout leftPanel={<FriendsPanel />} rightPanel={children} />
    </AppWrapper>
  );
}
