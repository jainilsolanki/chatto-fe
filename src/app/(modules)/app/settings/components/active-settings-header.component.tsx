import { Divider, Hidden, Stack, Typography } from "@mui/material";
import ArrowBackIosNewTwoToneIcon from "@mui/icons-material/ArrowBackIosNewTwoTone";
import Link from "next/link";
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
    <Stack sx={{ position: "sticky", top: 0 }}>
      <Stack
        justifyContent={"space-between"}
        flexDirection={"row"}
        p={1}
        height={60}
        gap={2}
        alignItems={"center"}
      >
        <Stack direction={"row"} alignItems={"center"} gap={1}>
          <Hidden lgUp>
            <Link
              href={"/app/settings"}
              style={{ alignSelf: "center", display: "flex" }}
            >
              <ArrowBackIosNewTwoToneIcon />
            </Link>
          </Hidden>
          <Typography variant="h6" fontWeight={"bold"} lineHeight={"normal"}>
            {settingTitle}
          </Typography>
        </Stack>
        {/* <Stack direction={"row"} alignItems={"center"} gap={1}>
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
        </Stack> */}
      </Stack>
      <Divider />
    </Stack>
  );
}
