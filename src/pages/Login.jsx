import React from "react";
import { Box, Button } from "@mui/material";
import { Google } from "@mui/icons-material";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../firebase";

function Login() {
  const handleSignIn = () => {
    signInWithPopup(auth, provider)
      .then((result) => {
        // Handle successful login here
        console.log("Successful login:", result.user);
      })
      .catch((error) => {
        // Handle login error here
        console.error("Login error:", error);
      });
  };

  return (
    <Box sx={{ display: "flex", justifyContent: "center" }}>
      <Button
        variant="contained"
        color="primary"
        startIcon={<Google />}
        onClick={handleSignIn}
      >
        Sign in with Google
      </Button>
    </Box>
  );
}

export default Login;
