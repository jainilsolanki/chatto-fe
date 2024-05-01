"use client";
import { DARK_THEME, LIGHT_THEME } from "@/app/data/assets-data";
import { handleAppTheme } from "@/app/services/redux/slices/app-data.slice";
import {
  Card,
  CardActionArea,
  CardContent,
  CardMedia,
  Stack,
  Typography,
  useTheme,
} from "@mui/material";
import { useDispatch } from "react-redux";

export default function ThemeCustomisation() {
  const dispatch = useDispatch();
  const theme = useTheme();
  return (
    <>
      <Stack
        p={1}
        gap={1}
        height={"calc(100vh - 124px)"}
        sx={{ overflowY: "auto" }}
      >
        <Typography variant="subtitle2">Theme</Typography>
        <Stack direction={"row"} gap={3} flexWrap={"wrap"}>
          <Card
            sx={{
              maxWidth: 450,
              border:
                theme.palette.mode === "light"
                  ? `1px solid ${theme.palette.primary.main}`
                  : "none",
              p: 1,
            }}
          >
            <CardActionArea onClick={() => dispatch(handleAppTheme("light"))}>
              <CardMedia
                component="img"
                height="200"
                image={LIGHT_THEME}
                alt="Light Theme"
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Light
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
          <Card
            sx={{
              maxWidth: 450,
              border:
                theme.palette.mode === "dark"
                  ? `1px solid ${theme.palette.primary.main}`
                  : "none",
              p: 1,
            }}
          >
            <CardActionArea onClick={() => dispatch(handleAppTheme("dark"))}>
              <CardMedia
                component="img"
                height="200"
                image={DARK_THEME}
                alt="Dark Theme"
              />
              <CardContent>
                <Typography gutterBottom variant="subtitle1" component="div">
                  Dark
                </Typography>
              </CardContent>
            </CardActionArea>
          </Card>
        </Stack>
      </Stack>
    </>
  );
}
