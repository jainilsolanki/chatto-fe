"use client"
import { Grid, Paper, useTheme } from "@mui/material";

const AppLayout = ({ leftPanel, rightPanel }: any) => {
  const theme = useTheme();
  return (
    <>
      <Grid container maxHeight={"100vh"} overflow={"hidden"}>
        <Grid
          item
          xs={2.5}
          sx={{
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
        <Grid item xs={9.5}>
          <Paper elevation={0} sx={{ borderRadius: "unset", height: "100%" }}>
            {rightPanel}
          </Paper>
        </Grid>
      </Grid>
    </>
  );
};
export default AppLayout;
