"use client";
import {
  Avatar,
  Button,
  Divider,
  IconButton,
  InputAdornment,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GOOGLE_LOGO, SIGNUP_BANNER } from "@/app/data/assets-data";
import { AuthAPI } from "@/app/services/axios/apis/auth.api";
import { useRouter } from "next/navigation";
import useCustomSnackbar from "@/app/hooks/useSnackbar";
import AuthLayout from "@/app/components/layouts/auth.layout";
import { LoadingButton } from "@mui/lab";
import useLoader from "@/app/hooks/useLoaders";
type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department_name: string;
};
export default function SignupPage() {
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department_name: "Development",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar, SnackbarComponent } = useCustomSnackbar();
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { showLoader, hideLoader, isLoading } = useLoader();
  const signup = async () => {
    showLoader();
    try {
      const response = await AuthAPI.signup({
        ...userData,
      });
      if (response.status) {
        showSnackbar(response.message, "success");
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (e: any) {
      showSnackbar(e?.response?.data.message, "error");
      console.error(e);
    } finally {
      hideLoader();
    }
  };
  const updataUserData = (updatingState: string, value: string) => {
    setUserData((prev: UserData) => ({
      ...prev,
      [updatingState]: value,
    }));
  };
  return (
    <>
      <AuthLayout
        leftContent={
          <Stack px={10} gap={3}>
            <Stack gap={1}>
              <Typography variant="h5" fontWeight={"bold"}>
                Sign up
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                Sign up to access your chat account
              </Typography>
            </Stack>

            <Stack
              mt={3}
              gap={3}
              onKeyDown={(ev) => {
                if (ev.key === "Enter") {
                  ev.preventDefault();
                  signup();
                }
              }}
            >
              <Stack direction={"row"} gap={3}>
                <TextField
                  label="Enter your first name"
                  variant="outlined"
                  placeholder="First Name"
                  sx={{ width: "100%" }}
                  onChange={(e) => updataUserData("first_name", e.target.value)}
                />
                <TextField
                  label="Enter your last name"
                  variant="outlined"
                  placeholder="Last Name"
                  sx={{ width: "100%" }}
                  onChange={(e) => updataUserData("last_name", e.target.value)}
                />
              </Stack>
              <TextField
                type="email"
                label="Enter your email"
                variant="outlined"
                placeholder="Email Address"
                onChange={(e) => updataUserData("email", e.target.value)}
              />
              <TextField
                type={showPassword ? "text" : "password"}
                label="Enter your password"
                variant="outlined"
                placeholder="Password"
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        aria-label="toggle password visibility"
                        onClick={handleClickShowPassword}
                      >
                        {showPassword ? (
                          <VisibilityIcon />
                        ) : (
                          <VisibilityOffIcon />
                        )}
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
                onChange={(e) => updataUserData("password", e.target.value)}
              />
            </Stack>
            <LoadingButton
              variant="contained"
              onClick={signup}
              loading={isLoading}
            >
              Sign up
            </LoadingButton>

            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Already have an account?</Typography>

              <Link href={"/auth/login"}>
                <Button>Login</Button>
              </Link>
            </Stack>

            <Divider>Or signup with</Divider>

            <Button
              sx={{
                borderRadius: "10",
                border: "0.9px solid #0661A8",
                fontSize: 10,
              }}
              startIcon={
                <Avatar src={GOOGLE_LOGO} sx={{ width: 20, height: 20 }} />
              }
            >
              Continue with Google
            </Button>
          </Stack>
        }
        rightBanner={SIGNUP_BANNER}
      />
      <SnackbarComponent />
    </>
  );
}
