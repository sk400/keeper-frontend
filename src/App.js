import { Box } from "@mui/material";
import { onAuthStateChanged } from "firebase/auth";
import React, { useEffect } from "react";
import { useDispatch } from "react-redux";
import { Route, Routes, useNavigate } from "react-router-dom";
import { LayOut } from "./components";
import { logIn } from "./features/user/userSlice";
import { auth } from "./firebase";
import { Login } from "./pages";
import "./App.css";
import { fetchAllNotes } from "./utils/fetchAllNotes";
import { setNotes } from "./features/notes/notesSlice";
import { fetchAllLabels } from "./utils/labels/fetchAllLabels";
import { setLabels } from "./features/labels/labelSlice";

const App = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const getNotes = async (id) => {
    const data = await fetchAllNotes(id);
    const notes = await data?.notes;
    dispatch(setNotes(notes));
  };

  const getLabels = async (id) => {
    const data = await fetchAllLabels(id);
    const labels = await data?.labels;
    dispatch(setLabels(labels));
  };

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
        getNotes(userData?.id);
        getLabels(userData?.id);
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
