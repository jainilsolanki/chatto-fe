import { Box, Typography } from "@mui/material";
import { LOGO } from "../data/assets-data";

export default function Logo({ logoStyles, imgStyles }: any) {
  return (
    <>
      <Box
        sx={{ display: "flex", alignItems: "center", gap: 0.5, ...logoStyles }}
      >
        <img style={{ width: 50, ...imgStyles }} src={LOGO} />{" "}
        <Typography variant="h3" textTransform={"uppercase"}>
          Chatto
        </Typography>
      </Box>
    </>
  );
}
