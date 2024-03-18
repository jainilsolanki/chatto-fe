import { useSocketEmit } from "@/app/hooks/useSocketEmit";
import { Box, IconButton, Stack } from "@mui/material";
import { useEffect, useRef, useState } from "react";
import { useSelector } from "react-redux";
import SendMessageButton from "./components/send-button.component";
import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import GifOutlinedIcon from "@mui/icons-material/GifOutlined";
import ReactQuill from "react-quill";
import "react-quill/dist/quill.snow.css";
import "react-quill/dist/quill.bubble.css";

const toolbarOptions = [
  ["bold", "italic", "underline", "strike"], // toggled buttons
  ["blockquote", "code-block"],
  ["link", "image", "video"],
  [{ header: 1 }, { header: 2 }], // custom button values
  [{ list: "ordered" }, { list: "bullet" }, { list: "check" }],
  [{ indent: "-1" }, { indent: "+1" }], // outdent/indent
  ["clean"],
];

const modules = {
  toolbar: toolbarOptions,
};

export default function MessageField() {
  const { emitEvent } = useSocketEmit();
  const [messageToSend, setMessageToSend] = useState("");
  const onGoingChatData = useSelector((state: any) => state.onGoingChatData);
  const [theme, setTheme] = useState("bubble");
  const quillRef = useRef(null);
  const [shouldFocus, setShouldFocus] = useState(true);

  useEffect(() => {
    if (quillRef.current && shouldFocus) {
      const quill = quillRef.current.getEditor();
      quill.focus();
      quill.setSelection(quill.getLength(), 0);
      setShouldFocus(false);
    }
  }, [shouldFocus]);

  const sendMessage = () => {
    if (messageToSend.replace(/<(.|\n)*?>/g, "").trim().length === 0) return;
    emitEvent("message", {
      message: messageToSend.trim(),
      conversationId: onGoingChatData.conversationId,
    });
    const quill = quillRef.current.getEditor();
    quill.focus();
    quill.setSelection(quill.getLength(), 0);
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
        p: 1,
      }}
    >
      <Box
        sx={{
          display: "flex",
          alignItems: "flex-start",
          background: "#fff",
          borderRadius: 4,
          width: "100%",
          border: "2px solid lightgrey",
          flexDirection: "column",
        }}
      >
        <ReactQuill
          ref={quillRef}
          key={theme}
          modules={modules}
          theme={theme}
          value={messageToSend}
          onChange={setMessageToSend}
          style={{
            width: "100%",
            border: "none",
            outline: "none",
          }}
          placeholder="Type something..."
          onKeyDown={(ev) => {
            if (ev.key === "Enter") {
              ev.preventDefault();
              sendMessage();
            }
          }}
        />

        <Stack
          direction={"row"}
          alignItems={"center"}
          p={1}
          justifyContent={"space-between"}
          width={"100%"}
        >
          <Box>
            <IconButton
              onClick={() => {
                setTheme((prev) => (prev === "snow" ? "bubble" : "snow"));
                setShouldFocus(true);
              }}
            >
              <svg
                width="18"
                height="18"
                viewBox="0 0 28 27"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M11.5381 25H12.9631L22.7381 15.225L21.3131 13.8L11.5381 23.575V25ZM9.53808 27V22.75L22.7381 9.575C22.9381 9.39167 23.1589 9.25 23.4006 9.15C23.6422 9.05 23.8964 9 24.1631 9C24.4297 9 24.6881 9.05 24.9381 9.15C25.1881 9.25 25.4047 9.4 25.5881 9.6L26.9631 11C27.1631 11.1833 27.3089 11.4 27.4006 11.65C27.4922 11.9 27.5381 12.15 27.5381 12.4C27.5381 12.6667 27.4922 12.9208 27.4006 13.1625C27.3089 13.4042 27.1631 13.625 26.9631 13.825L13.7881 27H9.53808ZM22.0131 14.525L21.3131 13.8L22.7381 15.225L22.0131 14.525Z"
                  fill="black"
                />
                <path
                  d="M15.0381 17.5L14.1787 15.6875H5.02245L2.4725 22.2974C2.32371 22.6831 1.95292 22.9375 1.53952 22.9375H1.00095C0.29731 22.9375 -0.186277 22.2301 0.0691864 21.5744L8.0424 1.11173C8.30359 0.4414 8.9493 0 9.66871 0C10.3903 0 11.0375 0.444022 11.2972 1.11725L17.0381 16L15.0381 17.5ZM13.3818 13.3281L10.71 6.125C10.6475 5.9375 10.5433 5.63021 10.3975 5.20312C10.262 4.77604 10.1214 4.33333 9.97558 3.875C9.82974 3.41667 9.70995 3.04688 9.6162 2.76562C9.51203 3.19271 9.39745 3.61979 9.27245 4.04688C9.15787 4.46354 9.04328 4.85417 8.9287 5.21875C8.81412 5.57292 8.71516 5.875 8.63183 6.125L5.91308 13.3281H13.3818Z"
                  fill="black"
                />
              </svg>
            </IconButton>
            <IconButton>
              <EmojiEmotionsOutlinedIcon sx={{ width: 20, height: 20 }} />
            </IconButton>
            <IconButton size="small">
              <GifOutlinedIcon sx={{ width: 30, height: 30 }} />
            </IconButton>
          </Box>
          <SendMessageButton
            messageToSend={messageToSend}
            sendMessage={sendMessage}
          />
        </Stack>
      </Box>
    </Box>
  );
}
