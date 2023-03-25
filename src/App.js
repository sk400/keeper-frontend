import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LayOut } from "./components";
import { logIn } from "./features/user/userSlice";
import { auth } from "./firebase";
import { Login } from "./pages";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    onAuthStateChanged(auth, (user) => {
      if (user) {
        const userData = {
          id: user?.uid,
          name: user?.displayName,
          email: user?.email,
          image: user?.photoURL,
        };

        dispatch(logIn(userData));
        navigate("/");
      } else {
        navigate("/login");
      }
    });
  }, []);

  return (
    <Box>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="*" element={<LayOut />} />
      </Routes>
    </Box>
  );
};

export default App;
