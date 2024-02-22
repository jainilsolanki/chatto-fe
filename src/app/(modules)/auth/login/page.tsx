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
import AuthLayout from "@/app/components/auth.layout";
import { GOOGLE_LOGO, LOGIN_BANNER } from "@/app/data/assets-data";
import { AuthAPI } from "@/app/services/axios/apis/auth.api";
import { useRouter } from "next/navigation";
import { setCookie } from "nookies";
import useCustomSnackbar from "@/app/hooks/useSnackbar";
import { useDispatch } from "react-redux";
import { storeUserData } from "@/app/services/redux/slices/user-data.slice";

type UserData = {
  email: string;
  password: string;
};
export default function LoginPage() {
  const router = useRouter();
  const dispatch = useDispatch();
  const [userData, setUserData] = useState<UserData>({
    email: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const { showSnackbar, SnackbarComponent } = useCustomSnackbar();
  const handleClickShowPassword = () => setShowPassword(!showPassword);

  const login = async () => {
    try {
      const response = await AuthAPI.login({
        ...userData,
      });

      const { id, first_name, last_name, email, user_code } =
        response.data.user;
      if (response.status) {
        dispatch(
          storeUserData({
            id,
            first_name,
            last_name,
            email,
            accessToken: response.accessToken,
            user_code,
          })
        );
        setCookie(
          null,
          "userData",
          JSON.stringify({
            id,
            first_name,
            last_name,
            email,
            accessToken: response.accessToken,
            user_code,
          }),
          {
            maxAge: 15 * 24 * 60 * 60, // Expires in 15 days
            path: "/", // Available on the entire domain
          }
        );
        showSnackbar("Logged in successfully", "success");
        router.push("/app/message");
      }
    } catch (e: any) {
      showSnackbar(e.response.data.message, "error");
      console.error(e.response.data.message);
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
                Login
              </Typography>
              <Typography variant="body1" fontWeight={"bold"}>
                Login to access your chat account
              </Typography>
            </Stack>

            <Stack mt={3} gap={3}>
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

              <Typography
                sx={{
                  fontSize: 12,
                  textTransform: "none",
                  justifyContent: "flex-end",
                  alignItems: "center",
                  display: "flex",
                }}
              >
                Forgot Password?
              </Typography>
            </Stack>
            <Button variant="contained" onClick={login}>
              Login
            </Button>
            <Stack
              direction={"row"}
              justifyContent={"center"}
              alignItems={"center"}
            >
              <Typography>Don't have an account?</Typography>
              <Link href={"/auth/signup"}>
                <Button>Sign up</Button>
              </Link>
            </Stack>

            <Divider>Or login with</Divider>

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
        rightBanner={LOGIN_BANNER}
      />
      <SnackbarComponent />
    </>
  );
}
