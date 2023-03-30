import React, { useState } from "react";
import { Box, IconButton, InputBase, Stack } from "@mui/material";
import { AddCircleRounded } from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import { addNote, setNotes } from "../features/notes/notesSlice";
import { userInfo } from "../features/user/userSlice";
import { createNote } from "../utils/createNote";
import { fetchAllNotes } from "../utils/fetchAllNotes";
import { createNoteByLabel } from "../utils/createNoteByLabel";

const Prompt = ({ labelDetail, labelId }) => {
  const dispatch = useDispatch();
  const user = useSelector(userInfo);

  const [noteData, setNoteData] = useState({
    title: "",
    content: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setNoteData({ ...noteData, [name]: value });
  };

  const getNotes = async (id) => {
    const data = await fetchAllNotes(id);
    const notes = await data?.notes;
    dispatch(setNotes(notes));
  };

  const handleClick = async () => {
    try {
      if (noteData?.title?.length !== 0 && noteData?.content?.length !== 0) {
        setNoteData({
          title: "",
          content: "",
        });

        let id = user?.id;

        let config = {
          headers: {
            userId: id,
            "Content-Type": "application/json",
          },
        };

        const data = await createNote(noteData, config);
        getNotes(id);
        // console.log(data);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleClickIfLabeDetail = async () => {
    try {
      if (noteData?.title?.length !== 0 && noteData?.content?.length !== 0) {
        // dispatch(addNote(noteData));

        setNoteData({
          title: "",
          content: "",
        });

        let id = user?.id;

        const data = await createNoteByLabel(noteData, id, labelId);
        getNotes(id);
      }
    } catch (error) {
      console.log(error.message);
    }
  };

  return (
    <Box className="prompt min-w-[250px] sm:w-[480px] max-w-[500px] rounded-md h-[200px] px-6 py-3 relative">
      {labelDetail ? (
        <IconButton
          sx={{
            position: "absolute",
            bottom: 5,
            right: 5,
            zIndex: 2,
          }}
          onClick={() => handleClickIfLabeDetail()}
        >
          <AddCircleRounded
            className="text-amber-500  "
            sx={{
              width: "30px",
              height: "30px",
            }}
          />
        </IconButton>
      ) : (
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
      )}
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
          value={noteData?.title}
        />
        <InputBase
          placeholder="Take a note..."
          type="text"
          name="content"
          multiline
          onChange={handleChange}
          value={noteData?.content}
        />
      </Stack>
    </Box>
  );
};

export default Prompt;
