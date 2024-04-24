import Logo from "@/app/components/logo";
import { Box, Grid, IconButton } from "@mui/material";
import { closeSnackbar, SnackbarProvider } from "notistack";
import React from "react";
import CloseIcon from "@mui/icons-material/Close";
type LayoutType = {
  leftContent: any;
  rightBanner: string;
};
export default function AuthLayout({ leftContent, rightBanner }: LayoutType) {
  return (
    <>
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          height: "100vh",
        }}
      >
        <Grid
          container
          sx={{
            width: "80vw",
          }}
        >
          <Grid item xs={12} sx={{ px: 10 }}>
            <Logo />
          </Grid>
          <Grid sx={{ height: "70vh", width: "80vw", mt: 10 }} container>
            <Grid item xs={6}>
              {leftContent}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <img
                loading="lazy"
                src={rightBanner}
                style={{ objectFit: "cover", height: "70vh" }}
                alt="RIGHT_BANNER"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
