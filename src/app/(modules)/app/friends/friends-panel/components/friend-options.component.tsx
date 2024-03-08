"use client";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import {
  Divider,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Popover,
  Stack,
} from "@mui/material";
import { useState } from "react";
import ReviewsOutlinedIcon from "@mui/icons-material/ReviewsOutlined";
import PersonRemoveAlt1OutlinedIcon from "@mui/icons-material/PersonRemoveAlt1Outlined";
export default function FriendOptions({ setCurrentFriend }) {
  const [anchorElPop, setAnchorElPop] = useState<HTMLButtonElement | null>(
    null
  );
  const openPop = Boolean(anchorElPop);
  const popOverId = openPop ? "simple-popover" : undefined;
  const handleClickPop = (event: React.MouseEvent<HTMLButtonElement>) => {
    console.log("open caled");
    setAnchorElPop(event.currentTarget);
  };
  const handleClosePop = () => {
    setAnchorElPop(null);
    console.log("close caled");
    setCurrentFriend(null);
  };
  return (
    <>
      <MoreHorizIcon
        sx={{
          fontSize: 24,
          alignSelf: "flex-start",
          padding: 0.4,
          cursor: "pointer",
          "&:hover": {
            background: "rgba(0, 0, 0, 0.1)",
            borderRadius: "50%",
          },
          background: anchorElPop ? "rgba(0, 0, 0, 0.1)" : "transparent",
          borderRadius: "50%",
        }}
        onClick={(e: any) => handleClickPop(e)}
      />

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
          <Divider />
          <List
            sx={{
              "& .MuiListItemIcon-root": {
                minWidth: 30,
              },
            }}
          >
            <ListItem key={"Profile"} disablePadding sx={{ display: "block" }}>
              <ListItemButton dense>
                <ListItemIcon>
                  <ReviewsOutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary={"Message"} />
              </ListItemButton>
            </ListItem>
            <ListItem key={"Status"} disablePadding sx={{ display: "block" }}>
              <ListItemButton dense>
                <ListItemIcon>
                  <PersonRemoveAlt1OutlinedIcon sx={{ fontSize: 20 }} />
                </ListItemIcon>
                <ListItemText primary={"Remove friend"} />
              </ListItemButton>
            </ListItem>
          </List>
        </Stack>
      </Popover>
    </>
  );
}
