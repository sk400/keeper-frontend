import { useSelector, useDispatch } from "react-redux";

import {
  Box,
  Button,
  IconButton,
  Modal,
  Paper,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { Notes } from "../components";
import { emptyBin, notesInfo } from "../features/notes/notesSlice";
import { Delete } from "@mui/icons-material";
import { useState } from "react";
import { userInfo } from "../features/user/userSlice";
import { deleteAllNotes } from "../utils/deleteAllNotes";

const Bin = () => {
  const notes = useSelector(notesInfo);
  const user = useSelector(userInfo);
  const dispatch = useDispatch();
  const [open, setOpen] = useState(false);

  const binNotes = notes?.filter((note) => note?.deleted === true);
  let message = "Your bin is empty.";

  const clearBin = () => {
    dispatch(emptyBin());
    deleteAllNotes(user?.id);
    setOpen(false);
  };

  return (
    <Box>
      {binNotes?.length !== 0 && (
        <Box
          sx={{
            mb: 5,
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography
            variant="h5"
            color="black"
            textAlign="left"
            fontWeight="bold"
          >
            Your notes in bin
          </Typography>
          <Tooltip
            title="Empty bin"
            placement="bottom"
            sx={{
              width: "50px",
              height: "50px",
            }}
          >
            <IconButton onClick={() => setOpen(true)}>
              <Delete />
            </IconButton>
          </Tooltip>
        </Box>
      )}
      <Notes notes={binNotes} message={message} />
      <Modal
        open={open}
        onClose={() => setOpen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            height: "100vh",
          }}
        >
          <Paper
            sx={{
              width: "250px",
              height: "200px",
              p: 2,
            }}
          >
            <Typography
              variant="h6"
              color="black"
              textAlign="left"
              fontWeight="bold"
              lineHeight="27px"
            >
              Are you sure, you want to delete all the notes in bin permanently?
            </Typography>
            <Stack
              direction="row"
              alignItems="center"
              justifyContent="space-between"
              mt={5}
            >
              <Button
                variant="contained"
                sx={{
                  px: 4,
                  py: 1,
                }}
                onClick={() => setOpen(false)}
              >
                No
              </Button>
              <Button
                variant="contained"
                color="error"
                sx={{
                  px: 4,
                  py: 1,
                }}
                onClick={clearBin}
              >
                Yes
              </Button>
            </Stack>
          </Paper>
        </Box>
      </Modal>
    </Box>
  );
};

export default Bin;
