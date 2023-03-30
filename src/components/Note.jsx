import React, { useEffect, useState } from "react";
import {
  Box,
  Button,
  Card,
  CardContent,
  IconButton,
  Paper,
  Typography,
} from "@mui/material";
import {
  Archive,
  ArchiveOutlined,
  Delete,
  DeleteOutline,
  PushPin,
  PushPinOutlined,
} from "@mui/icons-material";
import { useDispatch, useSelector } from "react-redux";
import {
  addToBin,
  archiveNote,
  pinNote,
  removeFromBin,
  unArchiveNote,
  unPinNote,
} from "../features/notes/notesSlice";
import { updateNote } from "../utils/updateNote";
import { userInfo } from "../features/user/userSlice";
import { labelsInfo } from "../features/labels/labelSlice";

function Note({ note }) {
  const [isHovered, setIsHovered] = useState(false);
  // const [label, setLabel] = useState(null);
  const dispatch = useDispatch();
  const user = useSelector(userInfo);
  const labels = useSelector(labelsInfo);

  const handlePinClick = async () => {
    try {
      dispatch(pinNote(note._id));
      let noteData = {
        pinned: true,
        deleted: false,
        archived: false,
      };
      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnPinClick = async () => {
    try {
      dispatch(unPinNote(note._id));
      let noteData = {
        pinned: false,
        deleted: false,
        archived: false,
      };

      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleArchiveClick = async () => {
    try {
      dispatch(archiveNote(note._id));
      let noteData = {
        pinned: false,
        deleted: false,
        archived: true,
      };

      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleUnArchiveClick = async () => {
    try {
      dispatch(unArchiveNote(note._id));
      let noteData = {
        pinned: false,
        deleted: false,
        archived: false,
      };

      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleBinClick = async () => {
    try {
      dispatch(addToBin(note._id));
      let noteData = {
        pinned: false,
        deleted: true,
        archived: false,
      };

      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const handleremoveFromBinClick = async () => {
    try {
      dispatch(removeFromBin(note._id));
      let noteData = {
        pinned: false,
        deleted: false,
        archived: false,
      };

      await updateNote(noteData, user?.id, note?._id);
    } catch (error) {
      console.log(error.message);
    }
  };

  const label = labels?.find((label) => label?._id === note?.label);

  return (
    <Box
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      className="cursor-pointer transition duration-200"
    >
      <Paper elevation={3} className=" min-h-[150px] p-3 relative">
        <Box className="flex flex-col items-start  ">
          <Typography
            variant="h6"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "pre-line",
              height: "2.4rem",
              display: "-webkit-box",
              WebkitLineClamp: 2,
              WebkitBoxOrient: "vertical",
              lineHeight: "18px",
            }}
            paragraph
          >
            {note.title}
          </Typography>
          <Typography
            variant="body2"
            sx={{
              overflowWrap: "anywhere",
              whiteSpace: "pre-line",
              height: "5rem",
              display: "-webkit-box",
              WebkitLineClamp: 5,
              WebkitBoxOrient: "vertical",
            }}
            paragraph
          >
            {note?.content}
          </Typography>
          {label && (
            <Button
              sx={{
                px: 1,
                py: "3px",
                backgroundColor: "#ebebeb",
                color: "black",
                textTransform: "none",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {label?.name}
            </Button>
          )}
        </Box>
        {isHovered && (
          <Box className="absolute top-0 right-0 bottom-0 left-0 flex flex-col items-end z-[5] p-2 ">
            <Box>
              {note.pinned ? (
                <IconButton onClick={handleUnPinClick}>
                  <PushPin />
                </IconButton>
              ) : (
                <IconButton onClick={handlePinClick}>
                  <PushPinOutlined />
                </IconButton>
              )}
            </Box>
            <Box className="mt-auto space-x-2">
              {note?.deleted ? (
                <IconButton onClick={handleremoveFromBinClick}>
                  <Delete />
                </IconButton>
              ) : (
                <IconButton onClick={handleBinClick}>
                  <DeleteOutline />
                </IconButton>
              )}

              {note?.archived ? (
                <IconButton onClick={handleUnArchiveClick}>
                  <Archive />
                </IconButton>
              ) : (
                <IconButton onClick={handleArchiveClick}>
                  <ArchiveOutlined />
                </IconButton>
              )}
            </Box>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default Note;
