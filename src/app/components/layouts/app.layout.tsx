"use client";
import { Grid, Paper, useTheme } from "@mui/material";

const AppLayout = ({ leftPanel, rightPanel }: any) => {
  const theme = useTheme();
  return (
    <>
      <Grid container maxHeight={"100vh"} overflow={"hidden"}>
        <Grid
          item
          xs={0}
          sm={0}
          md={0}
          lg={2.5}
          xl={2.5}
          sx={{
            display: {
              xs: "none",
              sm: "none",
              md: "none",
              lg: "block",
              xl: "block",
            },
            borderRight:
              theme.palette.mode === "light"
                ? "1px solid rgba(0,0,0,0.12)"
                : "1px solid rgba(0,0,0,0.8)",
          }}
        >
          <Paper elevation={0} sx={{ borderRadius: "unset", height: "100%" }}>
            {leftPanel}
          </Paper>
        </Grid>
        <Grid item xs={12} sm={12} md={12} lg={9.5} xl={9.5}>
          <Paper elevation={0} sx={{ borderRadius: "unset", height: "100%" }}>
            {rightPanel}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default AppLayout;
