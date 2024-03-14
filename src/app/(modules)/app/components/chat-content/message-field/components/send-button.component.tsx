import { Box } from "@mui/material";

export default function SendMessageButton({ sendMessage, messageToSend }) {
  return (
    <Box
      sx={{
        position: "relative",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        cursor: "pointer",
        mt: 1,
      }}
      onClick={sendMessage}
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
              fill={messageToSend.trim().length !== 0 ? "#21978B" : "gray"}
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
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feGaussianBlur in="BackgroundImageFix" stdDeviation="3.5" />
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
          width="25"
          height="25"
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
  );
}
