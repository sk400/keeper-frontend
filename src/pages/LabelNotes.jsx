import { Box, Typography } from "@mui/material";
import React from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { Notes } from "../components";
import Prompt from "../components/Prompt";
import { notesInfo } from "../features/notes/notesSlice";

const LabelNotes = () => {
  const { labelId } = useParams();
  const notes = useSelector(notesInfo);

  const labelNotes = notes?.filter((note) => {
    return note?.label === labelId && !note?.deleted;
  });

  let message = "You have not any notes in this label.";

  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
      }}
    >
      <Box>
        <Prompt labelDetail labelId={labelId} />
      </Box>

      {labelNotes?.length === 0 && (
        <Typography variant="h6" color="black" textAlign="center" mt={10}>
          {message}
        </Typography>
      )}

      {labelNotes?.length !== 0 && (
        <Box className="w-full mt-14">
          <Notes notes={labelNotes} message={message} />
        </Box>
      )}
    </Box>
  );
};

export default LabelNotes;
