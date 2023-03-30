import { Grid, Typography } from "@mui/material";
import React from "react";

import Note from "./Note";

const Notes = ({ notes, message }) => {
  if (notes?.length < 1) {
    return (
      <Typography variant="h6" color="black" textAlign="center">
        {message}
      </Typography>
    );
  }

  return (
    <Grid container spacing={2}>
      {notes?.map((note, index) => (
        <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
          <Note note={note} />
        </Grid>
      ))}
    </Grid>
  );
};

export default Notes;
