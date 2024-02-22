import { Grid } from "@mui/material";
import useCustomSnackbar from "../hooks/useSnackbar";

const AppLayout = ({ leftPanel, rightPanel }: any) => {
  return (
    <>
      <Grid
        container
        sx={{ background: "#fafafa" }}
        maxHeight={"100vh"}
        overflow={"hidden"}
      >
        <Grid item xs={2.5} sx={{ borderRight: "1px solid rgba(0,0,0,0.12)" }}>
          {leftPanel}
        </Grid>
        <Grid item xs={9.5}>
          {rightPanel}
        </Grid>
      </Grid>
    </>
  );
};
export default AppLayout;
