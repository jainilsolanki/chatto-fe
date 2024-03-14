"use client";
import { useSocketEmit } from "@/app/hooks/useSocketEmit";
import { Box, InputAdornment, TextField } from "@mui/material";
import { useState } from "react";
import { useSelector } from "react-redux";
import SendMessageButton from "./components/send-button.component";

export default function MessageField() {
  const { emitEvent } = useSocketEmit();
  const [messageToSend, setMessageToSend] = useState("");
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);

  const sendMessage = () => {
    if (messageToSend.trim().length === 0) return;
    emitEvent("message", {
      message: messageToSend.trim(),
      conversationId: onGoingChatData.conversationId,
    });

    setMessageToSend("");
  };
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        mt: 2,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          background: "#FFF",
          p: 3,
          gap: 1,
          borderRadius: "15px",
          width: "100%",
        }}
      >
        <TextField
          inputRef={
            messageToSend === "" ? (input) => input && input.focus() : undefined
          }
          autoComplete="off"
          value={messageToSend}
          variant="standard"
          fullWidth
          placeholder="Type something..."
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SendMessageButton
                  messageToSend={messageToSend}
                  sendMessage={sendMessage}
                />
              </InputAdornment>
            ),
            disableUnderline: true,
          }}
          sx={{
            color: "#8D8F98",
            borderRadius: 4,
            background: "#F6F6F6",
            p: "10px 8px",
          }}
          onChange={(e) => setMessageToSend(e.target.value)}
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              sendMessage();
            }
          }}
        />
      </Box>
    </Box>
  );
}
