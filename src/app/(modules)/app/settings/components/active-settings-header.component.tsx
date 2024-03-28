import { Button, Divider, Stack, Typography } from "@mui/material";
export default function ActiveSettingsHeader({
  settingTitle,
  onCancel,
  onSave,
}: {
  settingTitle: string;
  onCancel: Function;
  onSave: Function;
}) {
  return (
    <>
      <Stack
        justifyContent={"space-between"}
        flexDirection={"row"}
        p={1}
        height={60}
        gap={2}
        alignItems={"center"}
      >
        <Typography variant="h6" fontWeight={"bold"} lineHeight={"normal"}>
          {settingTitle}
        </Typography>
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Button
            variant="outlined"
            sx={{ borderRadius: 3 }}
            size="small"
            color="error"
            onClick={() => onCancel()}
          >
            Cancel
          </Button>
          <Button
            variant="outlined"
            sx={{ borderRadius: 3 }}
            size="small"
            onClick={() => onSave()}
          >
            Save
          </Button>
        </Stack>
      </Stack>
      <Divider />
    </>
  );
}
