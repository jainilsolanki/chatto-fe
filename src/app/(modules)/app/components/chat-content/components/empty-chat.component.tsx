import { HEY_EMOJI } from "@/app/data/assets-data";
import { Box, Stack, Typography } from "@mui/material";

export default function EmptyChat() {
  return (
    <Stack justifyContent={"center"} alignItems={"center"} height={"100vh"}>
      <Box
        sx={{
          background: "rgba(255, 255, 255, 0.2)",
          boxShadow: "0 0px 5px rgba(0, 0, 0, 0.1)",
          maxWidth: 240,
          p: 2,
          borderRadius: 5,
          justifyContent: "center",
          alignItems: "center",
          display: "flex",
          flexDirection: "column",
          textAlign: "center",
          gap: 2,
        }}
      >
        <Typography fontWeight={"bold"}>No messages here yet...</Typography>
        <Stack gap={1} justifyContent={"center"} alignItems={"center"}>
          <Typography fontSize={13}>
            Send a message or tap the greeting below.
          </Typography>
          <img
            src={HEY_EMOJI}
            width={"100%"}
            style={{ maxWidth: 150, cursor: "pointer" }}
          />
        </Stack>
      </Box>
    </Stack>
  );
}
