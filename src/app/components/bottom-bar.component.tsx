"use client";

import { useDispatch, useSelector } from "react-redux";
import {
  clearAppDataSlice,
  updateLockStateAppLockSettings,
  updateSelectedSection,
} from "../services/redux/slices/app-data.slice";
import {
  Avatar,
  Box,
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
  styled,
  Tab,
  Tabs,
  Tooltip,
  tooltipClasses,
  TooltipProps,
  Typography,
} from "@mui/material";
import { Search } from "@mui/icons-material";
import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import { useParams, useRouter } from "next/navigation";
import { useState } from "react";
import SettingsTwoToneIcon from "@mui/icons-material/SettingsTwoTone";
import useUserData from "../hooks/useUserData";
import { FriendAPI } from "../services/axios/apis/friend.api";
import { destroyCookie, setCookie } from "nookies";
import ExitToAppTwoToneIcon from "@mui/icons-material/ExitToAppTwoTone";
import { signOut } from "next-auth/react";
import { socket } from "./socket.connection";
import { clearTempData } from "../services/redux/slices/temp-data.slice";
import { clearDialogConfigSlice } from "../services/redux/slices/dialog-config.slice";
import { enqueueSnackbar } from "notistack";
export default function BottomBar() {
  const dispatch = useDispatch();
  const { conversationId } = useParams();
  const router = useRouter();
  const appData = useSelector((store: any) => store.appData);
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const { userData } = useUserData();
  const [status, setStatus] = useState(userData?.status);
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "bottom-bar-profile-popover" : undefined;
  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    if (newValue === -1) return;
    dispatch(updateSelectedSection(newValue));
    switch (newValue) {
      case 0:
        router.push("/app/home");
        break;
      case 1:
        break;
      case 2:
        if (conversationId) {
          router.push(`/app/friends/${conversationId}`);
        } else {
          router.push(`/app/friends`);
        }
        break;
      case 3:
        if (conversationId) {
          router.push(`/app/message/${conversationId}`);
        } else {
          router.push("/app/message");
        }
        break;
      default:
        router.push("/app/message");
    }
  };

  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorElPop(event.currentTarget);
  };

  const handleClosePop = () => {
    setAnchorElPop(null);
  };

  const CopyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      enqueueSnackbar("Copied to clipboard", { variant: "success" });
      console.info("Copied to clipboard:", text);
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };
  const updateUserActiveStatus = async (status) => {
    try {
      const response = await FriendAPI.updateUserActiveStatus(
        status,
        userData.id
      );

      if (response.status) {
        userData.status = status;
        setCookie(null, "userData", JSON.stringify(userData), {
          maxAge: 30 * 24 * 60 * 60, // 30 days in seconds
          path: "/", // Cookie path
        });
        setStatus(status);
      }
    } catch (e) {
      console.error(e);
    }
  };

  return (
    <>
      <Tabs
        value={appData.selectedSection}
        onChange={handleChange}
        TabIndicatorProps={{
          sx: {
            top: 0,
          },
        }}
        sx={{
          bottom: 0,
          position: "fixed",
          width: "100%",
        }}
        variant="fullWidth"
      >
        <Tab
          icon={<HomeTwoToneIcon />}
          label="Home"
          sx={{ fontSize: "0.6rem", minHeight: 0, minWidth: 0 }}
          value={0}
        />
        <Tab
          icon={<Search />}
          label="Search"
          sx={{ fontSize: "0.6rem", minHeight: 0, minWidth: 0 }}
          value={1}
        />
        <Tab
          icon={
            <Avatar src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D" />
          }
          onClick={(e: any) => handleClickPop(e)}
          sx={{ fontSize: "0.6rem", minHeight: 0, minWidth: 0 }}
          value={-1}
        />
        <Tab
          icon={<Groups2TwoToneIcon />}
          label="Friends"
          sx={{ fontSize: "0.6rem", minHeight: 0, minWidth: 0 }}
          value={2}
        />
        <Tab
          icon={<AssistantTwoToneIcon />}
          label="Message"
          sx={{ fontSize: "0.6rem", minHeight: 0, minWidth: 0 }}
          value={3}
        />
      </Tabs>

      <Popover
        id={popOverId}
        open={openPop}
        anchorEl={anchorElPop}
        onClose={handleClosePop}
        anchorOrigin={{
          vertical: "top",
          horizontal: "center",
        }}
        transformOrigin={{
          vertical: "bottom",
          horizontal: "center",
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
              {status === "active" ? (
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
              ) : (
                <Box
                  sx={{
                    background: "#616161",
                    height: 10,
                    width: 10,
                    borderRadius: "50%",
                    position: "absolute",
                    right: 2,
                    bottom: 2,
                    border: "2px solid #e0e0e0",
                  }}
                ></Box>
              )}
            </Stack>

            <Stack
              onClick={() => {
                CopyToClipboard(userData?.user_code);
              }}
            >
              <Typography fontWeight={"bold"}>
                {userData?.first_name} {userData?.last_name}
              </Typography>
              <Typography>#{userData?.user_code}</Typography>
            </Stack>
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
                onClick={() =>
                  updateUserActiveStatus(
                    status === "active" ? "away" : "active"
                  )
                }
              >
                <ListItemText
                  primary={
                    <Typography>
                      Set Yourself{" "}
                      <span style={{ fontWeight: "bold" }}>
                        {status === "active" ? "Away" : "Active"}
                      </span>
                    </Typography>
                  }
                />
              </ListItemButton>
            </ListItem>
            {appData.appLockSettings.enabled && (
              <ListItem
                key={"AppLock"}
                disablePadding
                sx={{ display: "block" }}
              >
                <ListItemButton
                  onClick={() => {
                    dispatch(updateLockStateAppLockSettings(true));
                    handleClosePop();
                  }}
                >
                  <ListItemText primary={"Lock App"} />
                </ListItemButton>
              </ListItem>
            )}
            <ListItem key={"Settings"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={() => {
                  handleClosePop();
                  router.push("/app/settings");
                  dispatch(updateSelectedSection(5));
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <SettingsTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={"Settings"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Logout"} disablePadding sx={{ display: "block" }}>
              <ListItemButton
                onClick={async () => {
                  const data = await signOut({
                    redirect: false,
                    callbackUrl: "/auth/login",
                  });

                  destroyCookie(null, "userData", { path: "/" });
                  router.push(data.url);
                  socket?.disconnect();
                  setTimeout(() => {
                    dispatch(clearTempData());
                    dispatch(clearDialogConfigSlice());
                    dispatch(clearAppDataSlice());
                  }, 500);
                }}
              >
                <ListItemIcon sx={{ minWidth: 32 }}>
                  <ExitToAppTwoToneIcon />
                </ListItemIcon>
                <ListItemText primary={"Logout"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Popover>
    </>
  );
}