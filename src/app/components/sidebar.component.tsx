"use client";
import {
  Avatar,
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  Tooltip,
  TooltipProps,
  Typography,
  styled,
  tooltipClasses,
} from "@mui/material";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import SearchTwoToneIcon from "@mui/icons-material/SearchTwoTone";
import { destroyCookie } from "nookies";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { socket } from "./socket.connection";
import { useState } from "react";
import {
  clearTempData,
  updateSelectedSection,
} from "../services/redux/slices/temp-data.slice";
import { clearOnGoingChatData } from "../services/redux/slices/ongoing-chat-data.slice";
import { clearDialogConfigSlice } from "../services/redux/slices/dialog-config.slice";
import { userData } from "../data/utils";
type MenuItemType = {
  id: string;
  name: string;
  icon: any;
  onClick: Function;
};

const drawerWidth = 90;

export default function Sidebar() {
  const router = useRouter();
  const dispatch = useDispatch();
  const tempData = useSelector((state: any) => state.tempData);
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const [copyIcon, setCopyIcon] = useState(true);
  const [status, setStatus] = useState(true);
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "simple-popover" : undefined;
  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPop(event.currentTarget);
  };

  const CopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      console.log("Copied to clipboard:", text);
      setCopyIcon(false); // Show checkmark icon
      setTimeout(() => setCopyIcon(true), 3000);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const handleClosePop = () => {
    setAnchorElPop(null);
  };
  const SidebarData = [
    {
      id: "Home",
      name: "Home",
      icon: <HomeTwoToneIcon />,
      onClick: () => {
        dispatch(updateSelectedSection(0));
        router.push("/app/home");
      },
    },
    {
      id: "Search",
      name: "Search",
      icon: <SearchTwoToneIcon />,
      onClick: () => {
        dispatch(updateSelectedSection(1));
      },
    },
    {
      id: "Only Friends",
      name: "Only Friends",
      icon: <Groups2TwoToneIcon />,
      onClick: () => {
        dispatch(updateSelectedSection(2));
        router.push("/app/only-friends");
      },
    },
    {
      id: "Message",
      name: "Message",
      icon: <AssistantTwoToneIcon />,
      onClick: () => {
        dispatch(updateSelectedSection(3));
        router.push("/app/message");
      },
    },
    {
      id: "Logout",
      name: "Logout",
      icon: <ExitToAppTwoToneIcon />,
      onClick: () => {
        router.push("/auth/login");
        dispatch(clearTempData());
        dispatch(clearOnGoingChatData());
        dispatch(clearDialogConfigSlice());
        destroyCookie(null, "userData", { path: "/" });
        socket?.disconnect();
      },
    },
  ];
  const LightTooltip = styled(({ className, ...props }: TooltipProps) => (
    <Tooltip {...props} classes={{ popper: className }} />
  ))(() => ({
    [`& .${tooltipClasses.tooltip}`]: {
      backgroundColor: copyIcon ? "" : "#44b700",
    },
    [`& .${tooltipClasses.arrow}`]: {
      color: copyIcon ? "" : "#44b700",
    },
  }));
  return (
    <>
      <Drawer
        variant="permanent"
        open={false}
        sx={{
          width: drawerWidth,
          flexShrink: 0,
          whiteSpace: "nowrap",
          height: "100vh",
          boxSizing: "border-box",

          "& .MuiDrawer-paper": {
            overflowX: "hidden",
            height: "100vh",
            display: "flex",
            justifyContent: "space-between",
            width: drawerWidth,
          },
        }}
      >
        <Stack justifyContent={"center"} alignItems={"center"}>
          <Avatar
            onClick={(e: any) => handleClickPop(e)}
            aria-describedby={popOverId}
            sx={{
              my: 3,
              width: 52,
              height: 52,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
          <List>
            {SidebarData.map((menu: MenuItemType, index) => (
              <ListItem
                key={menu.id}
                disablePadding
                sx={{
                  display: "block",
                  "& .Mui-selected": {
                    borderRadius: 4,
                    transform: "scale(0.8)",
                  },
                }}
              >
                <ListItemButton
                  sx={{
                    minHeight: 48,
                    justifyContent: "center",
                    px: 2.5,
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                  }}
                  onClick={() => menu.onClick()}
                  selected={index === tempData.selectedSection}
                >
                  <ListItemIcon
                    sx={{
                      mr: "auto",
                      justifyContent: "center",
                      alignItems: "center",
                    }}
                  >
                    {menu.icon}
                  </ListItemIcon>
                  <Typography fontSize={10}>{menu.name}</Typography>
                </ListItemButton>
              </ListItem>
            ))}
          </List>
        </Stack>
        <ListItem key={"Settings"} disablePadding sx={{ display: "block" }}>
          <ListItemButton
            sx={{
              minHeight: 48,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              px: 2.5,
            }}
          >
            <ListItemIcon
              sx={{
                ml: 0,
                justifyContent: "center",
              }}
            >
              <SettingsTwoToneIcon />
            </ListItemIcon>
            <Typography fontSize={10}>Settings</Typography>
          </ListItemButton>
        </ListItem>
      </Drawer>

      <Popover
        id={popOverId}
        open={openPop}
        anchorEl={anchorElPop}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "bottom",
          horizontal: "right",
        }}
        transformOrigin={{
          vertical: "top",
          horizontal: "left",
        }}
        sx={{ width: 300 }}
      >
        <Stack width={300}>
          <Stack direction={"row"} gap={2} p={2}>
            <Stack
              position={"relative"}
              justifyContent={"flex-end"}
              alignItems={"flex-end"}
            >
              <Avatar
                sx={{
                  width: 52,
                  height: 52,
                  borderRadius: 2,
                }}
                src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
              />
              {status && (
                <Box
                  sx={{
                    background: "#44b700",
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                    position: "absolute",
                    right: 2,
                    bottom: 2,
                  }}
                ></Box>
              )}
            </Stack>
            <LightTooltip
              title={copyIcon ? "Copy User code" : "Copied!"}
              placement="top"
              arrow
            >
              <Stack
                onClick={() => {
                  if (copyIcon) {
                    CopyToClipboard(userData?.user_code);
                  }
                }}
              >
                <Typography fontWeight={"bold"}>
                  {userData?.first_name} {userData?.last_name}
                </Typography>
                <Typography>#{userData?.user_code}</Typography>
              </Stack>
            </LightTooltip>
          </Stack>
          <Divider />
          <List>
            <ListItem key={"Profile"} disablePadding sx={{ display: "block" }}>
              <ListItemButton>
                <ListItemText primary={"Profile"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Status"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => setStatus((prev: boolean) => !prev)}
              >
                <ListItemText
                  primary={
                    <Typography>
                      Set yourself{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {status ? "away" : "active"}
                      </span>
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Popover>
    </>
  );
}
