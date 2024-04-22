import { Badge } from "@mui/material";

export default function UserActivityBadge({ children, status }: any) {
  return (
    <Badge
      overlap="circular"
      // anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
      variant="dot"
      // invisible={!user.is_online}
      sx={{
        marginRight: "10px",

        "& .MuiBadge-badge": {
          backgroundColor: status === "active" ? "#44b700" : "#616161",
          color: "#44b700",
          // boxShadow: `0 0 0 2px ${theme.palette.background.paper}`,
          "&::after": {
            position: "absolute",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            borderRadius: "50%",
            animation:
              status === "active" ? "ripple 1.2s infinite ease-in-out" : "none",
            outline:
              status === "active"
                ? "1px solid currentColor"
                : "2px solid #e0e0e0",

            content: '""',
          },
        },
        "@keyframes ripple": {
          "0%": {
            transform: "scale(.8)",
            opacity: 1,
          },
          "100%": {
            transform: "scale(2.4)",
            opacity: 0,
          },
        },
      }}
    >
      {children}
    </Badge>
  );
}
