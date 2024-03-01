import LoginPageUI from "./components/login.component";
import { cookies } from "next/headers";
import { redirect } from "next/navigation";
import { AuthAPI } from "@/app/services/axios/apis/auth.api";

export default function LoginPage() {
  const login = async (formData: FormData) => {
    "use server";
    const response = await AuthAPI.login(
      formData.get("email"),
      formData.get("password")
    );

    if (response.status) {
      const { id, first_name, last_name, email, user_code } =
        response.data.user;
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
      throw new Error(response.message);
    }
  };

  return (
    <>
      <LoginPageUI login={login} />
    </>
  );
}
