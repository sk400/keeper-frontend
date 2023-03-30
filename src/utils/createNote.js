import axios from "axios";

// const baseUrl = process.env.BASE_URL;

export const createNote = async (noteData, config) => {
  try {
    const response = await axios.post(
      `http://localhost:5000/api/notes/add`,
      JSON.stringify(noteData),
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating note");
  }
};
