import { useSelector } from "react-redux";

import { Box, IconButton, Tooltip, Typography } from "@mui/material";
import { Notes } from "../components";
import { notesInfo } from "../features/notes/notesSlice";
import { Delete } from "@mui/icons-material";

const ArchivedNotes = () => {
  const notes = useSelector(notesInfo);

  const archivedNotes = notes?.filter((note) => note?.archived === true);
  let message = "You haven't any archived notes.";

  return (
    <Box className="relative">
      {archivedNotes?.length !== 0 && (
        <Box className=" ">
          <Typography
            variant="h5"
            color="black"
            textAlign="left"
            fontWeight="bold"
            sx={{ mb: 5 }}
          >
            Your archived notes.
          </Typography>
        </Box>
      )}
      <Notes notes={archivedNotes} message={message} />
    </Box>
  );
};

export default ArchivedNotes;
