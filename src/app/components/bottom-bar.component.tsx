// "use client";
// import MenuIcon from "@mui/icons-material/Menu";
// import AddIcon from "@mui/icons-material/Add";
// import SearchIcon from "@mui/icons-material/Search";
// import MoreIcon from "@mui/icons-material/MoreVert";
// import {
//   AppBar,
//   Avatar,
//   Box,
//   Fab,
//   IconButton,
//   Toolbar,
//   styled,
// } from "@mui/material";
// import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
// import { Drawer } from "@mui/material"; // Importing Drawer for the menu icon

// import { useState } from "react";
// import Sidebar from "./sidebar.component";

// export default function BottomBar() {
//   const StyledFab = styled(Fab)({
//     position: "absolute",
//     zIndex: 1,
//     top: -30,
//     left: 0,
//     right: 0,
//     margin: "0 auto",
//   });

//   // State to control the drawer open/close state
//   const [drawerOpen, setDrawerOpen] = useState(false);

//   return (
//     <>
//       {/* Sidebar Drawer */}
//       <Drawer
//         anchor="left"
//         open={drawerOpen}
//         onClose={() => setDrawerOpen(false)}
//       >
//         <Sidebar />
//       </Drawer>

//       {/* Bottom AppBar */}
//       <AppBar
//         position="fixed"
//         color="primary"
//         sx={{ top: "auto", bottom: 0, borderRadius: "24px 24px 0 0" }}
//       >
//         <Toolbar>
//           {/* Menu Icon */}
//           <IconButton
//             color="inherit"
//             onClick={() => setDrawerOpen(!drawerOpen)}
//           >
//             <MenuIcon />
//           </IconButton>

//           {/* User Avatar */}
//           <Avatar
//             sx={{
//               minWidth: 30,
//               minHeight: 30,
//               borderRadius: 4,
//               ml: 1, // Added margin to align with other icons
//             }}
//             src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
//           />

//           {/* Floating Action Button */}
//           <StyledFab aria-label="add">
//             <AssistantTwoToneIcon />
//           </StyledFab>

//           <Box sx={{ flexGrow: 1 }} />

//           {/* Search Icon */}
//           <IconButton color="inherit">
//             <SearchIcon />
//           </IconButton>

//           {/* More Icon */}
//           <IconButton color="inherit">
//             <MoreIcon />
//           </IconButton>
//         </Toolbar>
//       </AppBar>
//     </>
//   );
// }

"use client";
import { useState } from "react";
import { useRouter } from "next/navigation";
import {
  BottomNavigation,
  BottomNavigationAction,
  Avatar,
  Menu,
  MenuItem,
  Typography,
} from "@mui/material";
import {
  HomeOutlined,
  GroupsOutlined,
  AssistantOutlined,
  SearchOutlined,
  SettingsOutlined,
  ExitToAppOutlined,
} from "@mui/icons-material";

export default function BottomBar() {
  const router = useRouter();
  const [menuAnchor, setMenuAnchor] = useState(null);

  const handleItemClick = (path) => {
    router.push(path);
  };

  const handleMenuOpen = (event) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleLogout = () => {
    handleItemClick("/auth/login");
    setMenuAnchor(null);
  };

  return (
    <>
      <BottomNavigation
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          backdropFilter: "blur(10px)",
          backgroundColor: "rgba(255, 255, 255, 0.8)",
          borderTop: "1px solid rgba(0, 0, 0, 0.1)",
          boxShadow: "0px -4px 8px rgba(0, 0, 0, 0.1)",
          zIndex: 1000,
          transition: "all 0.3s ease",
        }}
      >
        <BottomNavigationAction
          label="Home"
          icon={<HomeOutlined />}
          onClick={() => handleItemClick("/app/home")}
        />
        <BottomNavigationAction
          label="Friends"
          icon={<GroupsOutlined />}
          onClick={() => handleItemClick("/app/only-friends")}
        />
        <BottomNavigationAction
          label="Message"
          icon={<AssistantOutlined />}
          onClick={() => handleItemClick("/app/message")}
        />
        <BottomNavigationAction
          label="Search"
          icon={<SearchOutlined />}
          onClick={() => handleItemClick("/app/search")}
        />
        <BottomNavigationAction
          label="Settings"
          icon={
            <Avatar
              src="/avatar.jpg"
              sx={{ width: 24, height: 24 }}
              onClick={handleMenuOpen}
            />
          }
        />
      </BottomNavigation>

      <Menu
        anchorEl={menuAnchor}
        open={Boolean(menuAnchor)}
        onClose={handleMenuClose}
        PaperProps={{
          elevation: 0,
          sx: {
            borderRadius: 12,
            marginTop: 8,
          },
        }}
        transformOrigin={{ vertical: "top", horizontal: "center" }}
        anchorOrigin={{ vertical: "bottom", horizontal: "center" }}
      >
        <MenuItem onClick={() => handleItemClick("/app/settings")}>
          <SettingsOutlined sx={{ mr: 1 }} />
          <Typography variant="body2">Settings</Typography>
        </MenuItem>
        <MenuItem onClick={handleLogout}>
          <ExitToAppOutlined sx={{ mr: 1 }} />
          <Typography variant="body2">Logout</Typography>
        </MenuItem>
      </Menu>
    </>
  );
}
