import { BEGIN_CHAT } from "@/app/data/assets-data";
import { Box, Button, Stack, Typography } from "@mui/material";

export default function NoActiveChat() {
  return (
    <Stack justifyContent={"center"} gap={2} p={10} height={"100%"}>
      <img
        src={BEGIN_CHAT}
        alt="Begin Chat"
        style={{ width: "100%", maxWidth: 200 }}
      />
      <Stack gap={1}>
        <Typography variant="h5" fontWeight={"bold"} maxWidth={500}>
          Select any chat or start a new conversation
        </Typography>

        <Box>
          <Button
            variant="contained"
            sx={{ px: 8, py: 2, borderRadius: 4, mt: 1 }}
          >
            New Message
          </Button>
        </Box>
      </Stack>
    </Stack>
  );
}
