import axios from "axios";

export const createNoteByLabel = async (noteData, userId, labelId) => {
  let config = {
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `http://localhost:5000/api/notes/add/${labelId}`,
      JSON.stringify(noteData),
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating note");
  }
};
