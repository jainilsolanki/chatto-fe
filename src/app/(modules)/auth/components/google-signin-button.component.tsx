import { GOOGLE_LOGO } from "@/app/data/assets-data";
import { Avatar, Button } from "@mui/material";
import { signIn } from "next-auth/react";

export default function GoogleSignInButton() {
  const handleSignInWithGoogle = () => {
    signIn("google");
  };
  return (
    <>
      <Button
        sx={{
          borderRadius: "10",
          border: "0.9px solid #0661A8",
          fontSize: 10,
          height: 40,
        }}
        startIcon={<Avatar src={GOOGLE_LOGO} sx={{ width: 20, height: 20 }} />}
        onClick={handleSignInWithGoogle}
      >
        Continue with Google
      </Button>
    </>
  );
}
