import { Box } from "@mui/material";
import React from "react";
import { Notes, Prompt } from "../components";

const HomePage = () => {
  return (
    <Box className="p-5 flex flex-col items-center  w-full   ">
      <Box>
        <Prompt />
      </Box>
      <Box className="py-7">
        <Notes />
      </Box>
    </Box>
  );
};

export default HomePage;
