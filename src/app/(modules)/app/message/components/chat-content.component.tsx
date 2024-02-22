"use client";
import { BEGIN_CHAT } from "@/app/data/assets-data";
import useCustomSnackbar from "@/app/hooks/useSnackbar";
import {
  Avatar,
  Box,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import moment from "moment";
import MoreHorizIcon from "@mui/icons-material/MoreHoriz";
import SportsEsportsIcon from "@mui/icons-material/SportsEsports";
import CallIcon from "@mui/icons-material/Call";
const chatData = {
  profile_picture:
    "https://plus.unsplash.com/premium_photo-1707403865913-d8ca5c2962dd?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
  first_name: "Pragnesh",
  last_name: "Prajapati",
  chats: [
    {
      id: 1,
      conversation_id: 1,
      sender_id: 1,
      content: "Yo !",
      created_at: "2024-02-01 13:22:39",
    },
    {
      id: 2,
      conversation_id: 2,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 3,
      conversation_id: 3,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 4,
      conversation_id: 4,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 5,
      conversation_id: 5,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 6,
      conversation_id: 6,
      sender_id: 1,
      content: "Yo Yo!",
      created_at: "2024-02-01 13:22:41",
    },
    {
      id: 7,
      conversation_id: 7,
      sender_id: 2,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 8,
      conversation_id: 8,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 9,
      conversation_id: 9,
      sender_id: 1,
      content: "Yo Yo!",
      created_at: "2024-02-01 13:22:41",
    },
    {
      id: 10,
      conversation_id: 10,
      sender_id: 2,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 11,
      conversation_id: 11,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 12,
      conversation_id: 12,
      sender_id: 1,
      content: "Yo Yo!",
      created_at: "2024-02-01 13:22:41",
    },
    {
      id: 13,
      conversation_id: 13,
      sender_id: 2,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 14,
      conversation_id: 14,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 15,
      conversation_id: 15,
      sender_id: 1,
      content: "Yo Yo!",
      created_at: "2024-02-01 13:22:41",
    },
    {
      id: 16,
      conversation_id: 16,
      sender_id: 2,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 17,
      conversation_id: 17,
      sender_id: 2,
      content: "Yo man !",
      created_at: "2024-02-01 13:22:40",
    },
    {
      id: 18,
      conversation_id: 18,
      sender_id: 1,
      content: "Yo Yo!",
      created_at: "2024-02-01 13:22:41",
    },
    {
      id: 19,
      conversation_id: 19,
      sender_id: 2,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 20,
      conversation_id: 20,
      sender_id: 1,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 21,
      conversation_id: 21,
      sender_id: 1,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 22,
      conversation_id: 22,
      sender_id: 1,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
    {
      id: 23,
      conversation_id: 23,
      sender_id: 1,
      content: "Yo Yo Yo !",
      created_at: "2024-02-01 13:22:42",
    },
  ],
};

const ChatContent = () => {
  const { showSnackbar } = useCustomSnackbar();

  const handleButtonClick = () => {
    showSnackbar("This is a custom snackbar message", "success");
  };
  return chatData ? (
    <>
      {/* Ongoing Chat Header */}
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
      <Divider />
      {/* Chat List */}
      <Stack
        height={"92vh"}
        mt={2}
        sx={{
          justifyContent: "space-between",
        }}
        p={1}
      >
        <Stack overflow={"auto"}>
          {chatData.chats.map((chat: any, index: any) => {
            const isDifferentSender =
              index === 0 ||
              chat.sender_id !== chatData.chats[index - 1].sender_id;
            const isCurrentUser = chat.sender_id === 1;
            return (
              <>
                <Box
                  key={chat.id}
                  sx={{
                    alignItems: "center",
                    display: "flex",
                    justifyContent:
                      chat.sender_id === 1 ? "flex-end" : "flex-start",
                    gap: 1,
                  }}
                >
                  <Avatar
                    sx={{
                      // bgcolor: getRandomColor(),
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      visibility:
                        !isCurrentUser && isDifferentSender
                          ? "visible"
                          : "hidden",
                    }}
                    src={chatData.profile_picture}
                    alt={"No Image"}
                  >
                    {chatData.first_name.charAt(0) +
                      chatData.last_name.charAt(0)}
                  </Avatar>

                  <Box
                    sx={{
                      wordBreak: "break-all",
                      margin: "8px",
                      borderRadius: 4,
                      textAlign: isCurrentUser ? "right" : "left",
                      backgroundColor: isCurrentUser ? "#d3eae8" : "#F6F6F6",
                      color: isCurrentUser ? "#FFFFFF" : "#333333",
                      padding: "10px 15px",
                      display: "flex",
                      justifyContent: isCurrentUser ? "flex-end" : "flex-start",
                      position: "relative",
                      flexDirection: "column",
                    }}
                  >
                    <Typography variant="body1" sx={{ color: "#333" }}>
                      {chat.content}
                    </Typography>
                    <Typography variant="caption" sx={{ color: "#888" }}>
                      {moment(chat.created_at).format("hh:mm A")}
                    </Typography>
                  </Box>

                  <Avatar
                    sx={{
                      // bgcolor: getRandomColor(),
                      width: 40,
                      height: 40,
                      borderRadius: 4,
                      visibility:
                        isCurrentUser && isDifferentSender
                          ? "visible"
                          : "hidden",
                    }}
                    src={
                      "https://images.unsplash.com/photo-1682685797661-9e0c87f59c60?q=80&w=2070&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"
                    }
                    alt={"No Image"}
                  >
                    {chatData.first_name.charAt(0) +
                      chatData.last_name.charAt(0)}
                  </Avatar>
                </Box>
              </>
            );
          })}
        </Stack>
        {/* Message Textfield */}
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
              variant="standard"
              fullWidth
              placeholder="Type something..."
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <Box
                      sx={{
                        position: "relative",
                        display: "flex",
                        justifyContent: "center",
                        alignItems: "center",
                        cursor: "pointer",
                        mt: 1,
                      }}
                      onClick={handleButtonClick}
                    >
                      <Box>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="40"
                          height="40"
                          viewBox="0 0 40 40"
                          fill="none"
                        >
                          <g filter="url(#filter0_b_534_3915)">
                            <rect
                              width="40"
                              height="40"
                              rx="20"
                              fill="#21978B"
                            />
                          </g>
                          <defs>
                            <filter
                              id="filter0_b_534_3915"
                              x="-7"
                              y="-7"
                              width="64"
                              height="64"
                              filterUnits="userSpaceOnUse"
                              colorInterpolationFilters="sRGB"
                            >
                              <feFlood
                                floodOpacity="0"
                                result="BackgroundImageFix"
                              />
                              <feGaussianBlur
                                in="BackgroundImageFix"
                                stdDeviation="3.5"
                              />
                              <feComposite
                                in2="SourceAlpha"
                                operator="in"
                                result="effect1_backgroundBlur_534_3915"
                              />
                              <feBlend
                                mode="normal"
                                in="SourceGraphic"
                                in2="effect1_backgroundBlur_534_3915"
                                result="shape"
                              />
                            </filter>
                          </defs>
                        </svg>
                      </Box>
                      <Box sx={{ position: "absolute" }}>
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="30"
                          height="30"
                          viewBox="0 0 30 30"
                          fill="none"
                        >
                          <path
                            d="M9.2501 7.90019L19.8626 4.36269C24.6251 2.77519 27.2126 5.37519 25.6376 10.1377L22.1001 20.7502C19.7251 27.8877 15.8251 27.8877 13.4501 20.7502L12.4001 17.6002L9.2501 16.5502C2.1126 14.1752 2.1126 10.2877 9.2501 7.90019Z"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                          <path
                            d="M12.6377 17.0627L17.1127 12.5752"
                            stroke="white"
                            strokeWidth="2.2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          />
                        </svg>
                      </Box>
                    </Box>
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
              // onKeyDown={(ev) => {
              //   if (ev.key === "Enter") {
              //     ev.preventDefault();
              //     sendMessage();
              //   }
              // }}
            />
          </Box>
        </Box>
      </Stack>
    </>
  ) : (
    //empty chats
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
};
export default ChatContent;
