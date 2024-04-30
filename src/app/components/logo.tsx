import { Box, Typography } from "@mui/material";
import { LOGO } from "../data/assets-data";

export default function Logo({ logoStyles, imgStyles }: any) {
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 0.5, ...logoStyles }}
      >
        <img
          loading="lazy"
          alt="LOGO_BANNER"
          style={{ width: 50, ...imgStyles }}
          src={LOGO}
        />{" "}
        <Typography
          variant="h3"
          textTransform={"uppercase"}
          sx={{
            fontSize: { xs: 31, sm: 31, md: 31, lg: 31, xl: 52 },
          }}
        >
          Chatto
        </Typography>
      </Box>
    </>
  );
}
