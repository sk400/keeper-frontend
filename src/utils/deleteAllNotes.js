import axios from "axios";

export const deleteAllNotes = async (userId) => {
  let config = {
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  };

  try {
    const response = await axios.delete(
      `http://localhost:5000/api/notes/delete`,

      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error in deleting all notes.");
  }
};
