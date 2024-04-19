"use client";
import {
  Badge,
  Box,
  Fab,
  SxProps,
  Zoom,
  useScrollTrigger,
  useTheme,
} from "@mui/material";
const style: SxProps = {
  position: `fixed`,
  bottom: `150px`,
  zIndex: `99`,
  // left: `60%`,
  right: 20,
};
import ArrowDownwardTwoToneIcon from "@mui/icons-material/ArrowDownwardTwoTone";
import { useDispatch } from "react-redux";
import { useSocketEmit } from "@/app/hooks/useSocketEmit";
const ScrollToBottom = ({
  unreadMessagesCount,
  conversationId,
  setOnGoingChatData,
}) => {
  const { emitEvent } = useSocketEmit();
  const dispatch = useDispatch();
  const chatContainer =
    document.getElementById("chat-scrollable-container") ?? undefined;
  const trigger = useScrollTrigger({ target: chatContainer });
  const theme = useTheme();
  const handleClick = () => {
    chatContainer.scrollTo({
      top: chatContainer.scrollHeight,
      behavior: "instant",
    });

    emitEvent("read-chat", {
      conversationId: conversationId,
    });
    setOnGoingChatData((prevState) => ({
      ...prevState,
      unreadMessagesCount: 0, // Update unreadMessagesCount to 0
    }));
  };

  return (
    <Zoom in={unreadMessagesCount > 0}>
      <Box
        onClick={handleClick}
        role="presentation"
        sx={{
          ...style,
          "& .MuiBadge-badge": {
            background: "#f50057",
            color: "white",
            zIndex: 10000,
            fontSize: 14,
          },
        }}
      >
        <Badge badgeContent={unreadMessagesCount} max={9}>
          <Fab
            sx={{
              background: theme.palette.primary.main,
              height: 35,
              width: 35,
              minHeight: 35,
              color: "white",
              "&: hover": {
                background: theme.palette.primary.main,
              },
            }}
            size="small"
            aria-label="scroll back to bottom"
          >
            <ArrowDownwardTwoToneIcon sx={{ fontSize: 18 }} />
          </Fab>
        </Badge>
      </Box>
    </Zoom>
  );
};

export default ScrollToBottom;
