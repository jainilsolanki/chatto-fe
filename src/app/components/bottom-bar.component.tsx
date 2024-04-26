"use client";
import React from "react";
import {
  AppBar,
  Avatar,
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

  return (
    <AppBar
      position="fixed"
      color="primary"
      sx={{ top: "auto", bottom: 0, borderRadius: "25px 25px 0 0" }}
    >
      <Toolbar>
        <Avatar
          sx={{
            minWidth: 30,
            minHeight: 30,
            borderRadius: 4,
            ml: 1, // Added margin to align with other icons
          }}
          src="https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
        />
        <Box sx={{ flexGrow: 1 }} />
        <Stack alignItems={"center"} direction={"row"} gap={1}>
          <Fab
            aria-label="Home"
            size="small"
            sx={{
              top: appData.selectedSection === 0 ? -20 : 0,
              transition: "top 0.5s ease-in-out",
              background: "none",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                background: "none",
                boxShadow: "none",
              },
            }}
            onClick={() => dispatch(updateSelectedSection(0))}
            variant="extended"
          >
            <HomeTwoToneIcon
              sx={{
                transition: "background 0.5s ease-in-out",
                background:
                  appData.selectedSection === 0 ? "white" : "transparent",
                borderRadius: "50%",
              }}
            />
            <Typography variant="caption">Home</Typography>
          </Fab>

          <Fab
            aria-label="Assistant"
            size="small"
            onClick={() => dispatch(updateSelectedSection(2))}
            sx={{
              top: appData.selectedSection === 2 ? -15 : 0,
              transition: "top 0.5s ease-in-out",
              background: "none",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                background: "none",
                boxShadow: "none",
              },
            }}
            variant="extended"
          >
            <Groups2TwoToneIcon
              sx={{
                transition: "background 0.5s ease-in-out",
                background:
                  appData.selectedSection === 2 ? "white" : "transparent",
                borderRadius: "50%",
              }}
            />

            <Typography variant="caption">Friends</Typography>
          </Fab>

          <Fab
            aria-label="Groups"
            size="small"
            onClick={() => dispatch(updateSelectedSection(3))}
            sx={{
              top: appData.selectedSection === 3 ? -15 : 0,
              transition: "top 0.5s ease-in-out",
              background: "none",
              boxShadow: "none",
              display: "flex",
              flexDirection: "column",
              "&:hover": {
                background: "none",
                boxShadow: "none",
              },
            }}
            variant="extended"
          >
            <AssistantTwoToneIcon
              sx={{
                transition: "background 0.5s ease-in-out",
                background:
                  appData.selectedSection === 3 ? "white" : "transparent",
                borderRadius: "50%",
              }}
            />

            <Typography variant="caption">Message</Typography>
          </Fab>
        </Stack>
        <Box sx={{ flexGrow: 1 }} />
        <IconButton color="inherit">
          <SearchIcon />
        </IconButton>
        <IconButton color="inherit">
          <MoreIcon />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
}
