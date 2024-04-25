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
          minHeight: "100vh",
        }}
      >
        <Grid
          container
          sx={{
            width: "80vw",
            gap: { xs: 1, sm: 1, md: 1 },
          }}
        >
          <Grid
            item
            xs={12}
            sx={{ px: { xs: 2, sm: 4, md: 6, lg: 8, xl: 10 } }}
          >
            <Logo />
          </Grid>
          <Grid container item>
            <Grid
              item
              xs={12}
              sm={12}
              md={12}
              lg={6}
              xl={6}
              alignSelf={"center"}
            >
              {leftContent}
            </Grid>
            <Grid
              item
              xs={6}
              sx={{
                display: {
                  xs: "none",
                  sm: "none",
                  md: "none",
                  lg: "flex",
                  xl: "flex",
                },
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
