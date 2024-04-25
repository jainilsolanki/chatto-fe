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
import React, { useEffect, useState } from "react";
import Link from "next/link";
import VisibilityIcon from "@mui/icons-material/Visibility";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import { GOOGLE_LOGO, LOGIN_BANNER } from "@/app/data/assets-data";
import AuthLayout from "@/app/components/layouts/auth.layout";
import { LoadingButton } from "@mui/lab";
import useLoader from "@/app/hooks/useLoaders";
import { useDispatch, useSelector } from "react-redux";
import ForgotPasswordDialog from "./forgot-password.component";
import { handleForgotPasswordDialogState } from "@/app/services/redux/slices/dialog-config.slice";
import { signIn, useSession } from "next-auth/react";
import { AuthAPI } from "@/app/services/axios/apis/auth.api";
import { googleId } from "@/app/data/constants-data";
import { enqueueSnackbar } from "notistack";

export default function LoginPageUI({ login }) {
  const { data: session, status } = useSession();
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const [errorMessage, setErrorMessage] = useState("");
  const { showLoader, hideLoader, isLoading } = useLoader();
  const dialogConfig = useSelector((state: any) => state.dialogConfig);
  const dispatch = useDispatch();
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
  useEffect(() => {
    // Log the session information when it's available
    if (status === "authenticated") {
      sendGoogleSessionDetails(session);
    }
  }, [session, status]);
  const handleSignInWithGoogle = () => {
    signIn("google");
  };

  const sendGoogleSessionDetails = async (session: any) => {
    const { id_token } = session;
    try {
      const response = await AuthAPI.logiGoogle({
        idToken: id_token,
        clientId: googleId,
      });

      console.log(response);
    } catch (e) {
      console.error(e);
      enqueueSnackbar(e.response.data.message, {
        variant: "error",
        autoHideDuration: 6000,
      });
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
                    cursor: "pointer",
                    transition: "color 0.4s ease-out",
                    "&:hover": {
                      color: "#0661A8",
                    },
                  }}
                  onClick={() => {
                    dispatch(handleForgotPasswordDialogState(true));
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
                height: 40,
              }}
              startIcon={
                <Avatar src={GOOGLE_LOGO} sx={{ width: 20, height: 20 }} />
              }
              onClick={handleSignInWithGoogle}
            >
              Continue with Google
            </Button>
          </Stack>
        }
        rightBanner={LOGIN_BANNER}
      />
      {dialogConfig.forgotPasswordDialogState && <ForgotPasswordDialog />}
    </>
  );
}