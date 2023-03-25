import React, { useState } from "react";
import { Box, IconButton, InputBase, Stack } from "@mui/material";
import {
  PushPinOutlined,
  PushPin,
  AddCircleRounded,
} from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { addNote } from "../features/notes/notesSlice";

const Prompt = () => {
  const [pinned, setPinned] = useState(false);
  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  const dispatch = useDispatch();

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoteData({ ...noteData, [name]: value });
  };

  const handleClick = () => {
    if (noteData?.title?.length !== 0 && noteData?.content?.length !== 0) {
      dispatch(addNote(noteData));
      setNoteData({
        title: "",
        content: "",
      });
    }
  };

  return (
    <Box className="prompt min-w-[250px] sm:w-[480px] max-w-[500px] rounded-md h-[200px] px-6 py-3 relative">
      <IconButton
        sx={{
          position: "absolute",
          top: 5,
          right: 5,
          zIndex: 2,
        }}
        onClick={() => setPinned(!pinned)}
      >
        {pinned ? <PushPin /> : <PushPinOutlined />}
      </IconButton>
      <IconButton
        sx={{
          position: "absolute",
          bottom: 5,
          right: 5,
          zIndex: 2,
        }}
        onClick={() => handleClick()}
      >
        <AddCircleRounded
          className="text-amber-500  "
          sx={{
            width: "30px",
            height: "30px",
          }}
        />
      </IconButton>
      <Stack direction="column" spacing={1}>
        <InputBase
          placeholder="Title"
          type="text"
          className="font-bold"
          name="title"
          sx={{
            fontWeight: "bold",
          }}
          multiline
          onChange={handleChange}
        />
        <InputBase
          placeholder="Take a note..."
          type="text"
          name="content"
          multiline
          onChange={handleChange}
        />
      </Stack>
    </Box>
  );
};

export default Prompt;
