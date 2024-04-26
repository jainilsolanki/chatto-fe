"use client";
import {
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
import { SIGNUP_BANNER } from "@/app/data/assets-data";
import { AuthAPI } from "@/app/services/axios/apis/auth.api";
import { useRouter } from "next/navigation";
import AuthLayout from "@/app/components/layouts/auth.layout";
import { LoadingButton } from "@mui/lab";
import useLoader from "@/app/hooks/useLoaders";
import { enqueueSnackbar } from "notistack";
import GoogleSignInButton from "../components/google-signin-button.component";
import { signOut, useSession } from "next-auth/react";
type UserData = {
  first_name: string;
  last_name: string;
  email: string;
  password: string;
  department_name: string;
};
export default function SignupPage() {
  const { data: session, status } = useSession();
  const router = useRouter();
  const [userData, setUserData] = useState<UserData>({
    first_name: "",
    last_name: "",
    email: "",
    password: "",
    department_name: "Development",
  });
  const [showPassword, setShowPassword] = useState(false);
  const handleClickShowPassword = () => setShowPassword(!showPassword);
  const { showLoader, hideLoader, isLoading } = useLoader();

  useEffect(() => {
    // Log the session information when it's available
    if (status === "authenticated") {
      console.log(session);

      registerWithGoogle(session);
    }
  }, [session, status]);

  const registerWithGoogle = async (session) => {
    showLoader();
    const { name, email } = session.user;
    const nameArray = name.split(" ");
    const first_name = nameArray[0];
    const last_name = nameArray[1];

    try {
      const response = await AuthAPI.signup({
        first_name,
        last_name,
        email,
        department_name: "Development",
        is_google_signup: true,
        password: null,
      });
      if (response.status) {
        enqueueSnackbar(response.message, { variant: "success" });
        const data = await signOut({
          redirect: false,
          callbackUrl: "/auth/login",
        });
        setTimeout(() => {
          router.push(data.url);
        }, 1000);
      }
    } catch (e: any) {
      await signOut({
        redirect: false,
      });
      enqueueSnackbar(e?.response?.data.message, { variant: "error" });
      console.error(e);
    } finally {
      hideLoader();
    }
  };

  const signup = async () => {
    showLoader();
    try {
      const response = await AuthAPI.signup({
        ...userData,
      });
      if (response.status) {
        enqueueSnackbar(response.message, { variant: "success" });
        setTimeout(() => {
          router.push("/auth/login");
        }, 1000);
      }
    } catch (e: any) {
      enqueueSnackbar(e?.response?.data.message, { variant: "error" });
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

            <GoogleSignInButton />
          </Stack>
        }
        rightBanner={SIGNUP_BANNER}
      />
    </>
  );
}
