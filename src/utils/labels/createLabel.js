import axios from "axios";

export const createLabel = async (labelData, userId) => {
  let config = {
    headers: {
      userId,
      "Content-Type": "application/json",
    },
  };
  try {
    const response = await axios.post(
      `http://localhost:5000/api/labels/add`,
      JSON.stringify(labelData),
      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
    throw new Error("Error creating note");
  }
};
