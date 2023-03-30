import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { Notes, Prompt } from "../components";
import { notesInfo } from "../features/notes/notesSlice";

const HomePage = () => {
  const notes = useSelector(notesInfo);
  let message = "You haven't captured your ideas yet.";

  const homePageNotes = notes?.filter((note) => {
    return !note?.pinned && !note?.deleted && !note?.archived;
  });

  const pinnedNotes = notes?.filter((note) => note?.pinned === true);

  return (
    <Box className="p-5 flex flex-col items-center  w-full   ">
      <Box>
        <Prompt />
      </Box>

      <Box className="py-20 w-full">
        {pinnedNotes?.length === 0 && homePageNotes?.length === 0 && (
          <Typography variant="h6" color="black" textAlign="center">
            {message}
          </Typography>
        )}

        {pinnedNotes?.length !== 0 && (
          <Box sx={{ mb: 5 }}>
            <Typography variant="overline" display="block" gutterBottom>
              Pinned
            </Typography>
            <Notes notes={pinnedNotes} />
          </Box>
        )}
        {homePageNotes?.length !== 0 && (
          <Box>
            <Typography variant="overline" display="block" gutterBottom>
              Others
            </Typography>
            <Notes notes={homePageNotes} />
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default HomePage;
