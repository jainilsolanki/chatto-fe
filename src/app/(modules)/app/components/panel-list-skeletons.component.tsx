import { Box, Skeleton, Stack } from "@mui/material";

export default function PanelListSkeletons() {
  return (
    <Stack
      sx={{
        height: {
          xs: "calc(100vh - 122px)",
          sm: "calc(100vh - 122px)",
          md: "calc(100vh - 122px)",
          lg: "95vh",
          xl: "95vh",
        },
      }}
      p={1}
      gap={1}
    >
      {[...Array(4)].map((_, index) => (
        <Box
          key={index}
          display="flex"
          alignItems="center"
          sx={{
            borderRadius: 5,
          }}
          gap={1}
          height={50}
        >
          <Skeleton
            animation="wave"
            sx={{ borderRadius: 4 }}
            width={60}
            height={80}
          />
          <Stack width={"100%"}>
            <Stack
              flexGrow={1}
              justifyContent={"space-between"}
              direction={"row"}
            >
              <Skeleton
                animation="wave"
                height={10}
                width="40%"
                style={{ marginBottom: 6 }}
              />
              <Skeleton
                animation="wave"
                height={10}
                width="20%"
                style={{ marginBottom: 6 }}
              />
            </Stack>
            <Skeleton
              animation="wave"
              height={10}
              width="80%"
              style={{ marginBottom: 6 }}
            />
          </Stack>
        </Box>
      ))}
    </Stack>
  );
}
