import axios from "axios";

const API_KEY = "1daa926b4ac54d2d9022c4fa3a99d5a6";

export const getLocationDetails = async ({ lat, lng }) => {
  try {
    const response = await axios.get(
      `https://api.opencagedata.com/geocode/v1/json?q=${lat}+${lng}&key=${API_KEY}`,
    );
    return response?.data?.results;
  } catch (error) {
    console.error("Error fetching location details:", error);
    throw error;
  }
};
