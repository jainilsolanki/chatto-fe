"use client";
import React from "react";
import {
  AppBar,
  Avatar,
  BottomNavigation,
  BottomNavigationAction,
  Box,
  Fab,
  IconButton,
  Stack,
  Toolbar,
  Typography,
  styled,
} from "@mui/material";
import AssistantTwoToneIcon from "@mui/icons-material/AssistantTwoTone";
import HomeTwoToneIcon from "@mui/icons-material/HomeTwoTone";
import Groups2TwoToneIcon from "@mui/icons-material/Groups2TwoTone";
import SearchIcon from "@mui/icons-material/Search";
import MoreIcon from "@mui/icons-material/MoreVert";
import { useDispatch, useSelector } from "react-redux";
import { updateSelectedSection } from "../services/redux/slices/app-data.slice";

export default function BottomBar() {
  const appData = useSelector((store: any) => store.appData);
  const dispatch = useDispatch();

  const handleChange = (event: React.SyntheticEvent, newValue: number) => {
    dispatch(updateSelectedSection(newValue));
  };
  return (
    <BottomNavigation
      sx={{
        bottom: 0,
        borderRadius: "25px 25px 0 0",
        position: "fixed",
        width: "100%",
      }}
      value={appData.selectedSection}
      onChange={handleChange}
    >
      <BottomNavigationAction
        value={-1}
        icon={
          <Avatar
            sx={{
              width: 28,
              height: 28,
              borderRadius: 2,
              cursor: "pointer",
              "&:hover": {
                opacity: 0.7,
              },
            }}
            src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
          />
        }
      />
      <Box sx={{ flexGrow: 1 }} />
      <BottomNavigationAction
        label="Home"
        value={0}
        icon={<HomeTwoToneIcon />}
      />
      <BottomNavigationAction
        label="Friends"
        value={2}
        icon={<Groups2TwoToneIcon />}
      />
      <BottomNavigationAction
        label="Message"
        value={3}
        icon={<AssistantTwoToneIcon />}
      />
      <Box sx={{ flexGrow: 1 }} />
      <BottomNavigationAction label="More" value={4} icon={<MoreIcon />} />
    </BottomNavigation>
  );
}
