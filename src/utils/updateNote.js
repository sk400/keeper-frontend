import axios from "axios";

export const updateNote = async (noteData, userId, noteId) => {
  let config = {
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.put(
      `http://localhost:5000/api/notes/update/${noteId}`,
      JSON.stringify(noteData),
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error in updating note");
  }
};
