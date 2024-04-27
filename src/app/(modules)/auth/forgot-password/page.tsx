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
import ForgotPasswordUI from "./components/forgot-password.component";

export default function ForgotPasswordPage() {
  const forgotPassword = async (formData: FormData) => {
    "use server";
    console.log("Email", formData.get("email"));
  };

  return (
    <>
      <ForgotPasswordUI forgotPassword={forgotPassword} />
    </>
  );
}
