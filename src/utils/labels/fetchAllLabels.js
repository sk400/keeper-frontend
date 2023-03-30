import axios from "axios";

export const fetchAllLabels = async (id) => {
  let config = {
    headers: {
      userId: id,
      "Content-Type": "application/json",
    },
  };

  //   console.log(id);
  try {
    const response = await axios.get(
      `http://localhost:5000/api/labels/all`,

      config
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};
