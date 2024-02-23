import {
  Avatar,
  Box,
  Button,
  IconButton,
  Stack,
  Typography,
} from "@mui/material";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CallIcon from "@mui/icons-material/Call";
export default function ChatContentHeader({ chatData }) {
  return (
    <Stack
      justifyContent={"space-evenly"}
      flexDirection={"column"}
      p={1}
      height={60}
      gap={2}
    >
      <Stack
        direction={"row"}
        alignItems={"center"}
        justifyContent={"space-between"}
      >
        <Stack direction={"row"} gap={2} alignItems={"center"}>
          <Avatar
            sx={{
              // bgcolor: getRandomColor(),
              width: 45,
              height: 45,
              borderRadius: 4,
            }}
            src={chatData.profile_picture}
            alt={"No Image"}
          >
            {chatData.first_name.charAt(0) + chatData.last_name.charAt(0)}
          </Avatar>
          <Stack>
            <Typography
              variant="h6"
              fontWeight={"bold"}
              fontSize={18}
              lineHeight={"normal"}
            >
              {chatData.first_name + " " + chatData.last_name}
            </Typography>
            <Stack direction={"row"} alignItems={"center"} gap={1}>
              <Box
                sx={{
                  background: "#44b700",
                  height: 10,
                  width: 10,
                  borderRadius: "50%",
                }}
              ></Box>
              <Typography variant="body1">Online</Typography>
            </Stack>
          </Stack>
        </Stack>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Button
            variant="outlined"
            startIcon={<SportsEsportsIcon />}
            sx={{ borderRadius: 3 }}
            size="small"
          >
            Games
          </Button>
          <Button
            variant="outlined"
            startIcon={<CallIcon />}
            sx={{ borderRadius: 3 }}
            size="small"
          >
            Call
          </Button>
          <IconButton>
            <MoreHorizIcon />
          </IconButton>
        </Stack>
      </Stack>
    </Stack>
  );
}
