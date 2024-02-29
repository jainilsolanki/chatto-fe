import { AuthAPI } from "@/app/services/axios/apis/auth.api";
import LoginPageUI from "./components/login.component";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";

export default function LoginPage() {
  const login = async (formData: FormData) => {
    "use server";
    const response = await AuthAPI.login({
      email: formData.get("email"),
      password: formData.get("password"),
    });

    const { id, first_name, last_name, email, user_code } = response.data.user;
    if (response.status) {
      cookies().set({
        name: "userData",
        value: JSON.stringify({
          id,
          first_name,
          last_name,
          email,
          accessToken: response.accessToken,
          user_code,
        }),
        expires: 15 * 24 * 60 * 60, // Expires in 15 days,
        maxAge: 15 * 24 * 60 * 60, // Expires in 15 days
        path: "/", // Available on the entire domain
      });

      redirect("/app/message");
    } else {
      console.log(response);
    }
  };

  return (
    <>
      <LoginPageUI login={login} />
    </>
  );
}
