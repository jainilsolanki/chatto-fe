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
import { GOOGLE_LOGO, LOGIN_BANNER } from "@/app/data/assets-data";
import AuthLayout from "@/app/components/layouts/auth.layout";
import { LoadingButton } from "@mui/lab";
import useLoader from "@/app/hooks/useLoaders";

export default function LoginPageUI({ login }) {
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const { showLoader, hideLoader, isLoading } = useLoader();
  const handleSubmit = async (e) => {
    showLoader();
    e.preventDefault();
    const formData = new FormData(e.target);
    try {
      await login(formData);
    } catch (error) {
      setErrorMessage("You have entered an invalid email or password");
    } finally {
      hideLoader();
    }
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
            <form onSubmit={handleSubmit}>
              <Stack mt={3} gap={3}>
                <TextField
                  name="email"
                  type="email"
                  label="Enter your email"
                  variant="outlined"
                  placeholder="Email Address"
                />
                <TextField
                  error={errorMessage ? true : false}
                  helperText={errorMessage && errorMessage}
                  name="password"
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
                <LoadingButton
                  variant="contained"
                  type="submit"
                  loading={isLoading}
                >
                  Login
                </LoadingButton>
              </Stack>
            </form>
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
    </>
  );
}
