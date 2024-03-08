import Logo from "@/app/components/logo";
import { Box, Grid } from "@mui/material";
import React from "react";

type LayoutType = {
  leftContent: any;
  rightBanner: string;
};
export default function AuthLayout({ leftContent, rightBanner }: LayoutType) {
  return (
    <>
      {/* <Stack
        justifyContent={"center"}
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          borderRadius: 2,
          boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
          backdropFilter: "blur(5px)",
          border: "1px solid rgba(255, 255, 255, 0.3)",
          margin: "80px 200px",
        }}
      >
        <Stack sx={{ px: 20, py: 2 }}>
          <Logo />
        </Stack>
        <Stack
          direction={"row"}
          justifyContent={"space-evenly"}
          alignItems={"center"}
          sx={{
            height: "70vh",
          }}
        >
          <Stack sx={{ width: "40vw" }}>
            <Stack>{leftContent}</Stack>
          </Stack>
          <Stack>
            <img
              src={rightBanner}
              style={{ objectFit: "cover", height: "65vh" }}
              alt="image"
            />
          </Stack>
        </Stack>
      </Stack> */}
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
            // background: "rgba(255, 255, 255, 0.2)",
            // borderRadius: 2,
            // boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
            // backdropFilter: "blur(5px)",
            // border: "1px solid rgba(255, 255, 255, 0.3)",
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
                src={rightBanner}
                style={{ objectFit: "cover", height: "70vh" }}
                alt="image"
              />
            </Grid>
          </Grid>
        </Grid>
      </Box>
    </>
  );
}
