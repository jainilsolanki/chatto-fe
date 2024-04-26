"use client";
import {
  Stack,
  TextField,
  Button,
  Typography,
  Container,
  Paper,
  CssBaseline,
  Box,
} from "@mui/material";
import { FORGOT_PASSWORD } from "@/app/data/assets-data";

export default function ForgotPasswordUI({ forgotPassword }) {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    forgotPassword(formData);
  };
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundImage: `url(${FORGOT_PASSWORD})`,
        backgroundSize: "cover",
      }}
    >
      <CssBaseline />
      <Container component="main" maxWidth="xs">
        <Paper
          sx={{
            padding: "32px",
            borderRadius: "16px",
            backgroundColor: "rgba(255, 255, 255, 0.9)",
            boxShadow: "0px 4px 20px rgba(0, 0, 0, 0.1)",
          }}
        >
          <Typography variant="h6">Reset Password</Typography>

          <Typography>
            Enter your email id and we will send you a password reset link.
          </Typography>
          <form onSubmit={handleSubmit}>
            <Stack spacing={2} mt={3}>
              <TextField
                placeholder="Email Id"
                variant="outlined"
                fullWidth
                name="email"
              />
              <Button variant="contained" fullWidth type="submit">
                Send reset link
              </Button>
            </Stack>
          </form>
        </Paper>
      </Container>
    </Box>
  );
}
