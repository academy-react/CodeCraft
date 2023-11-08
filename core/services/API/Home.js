import axios from "axios";

export const getAllCategories = async () => {
  try {
    return await axios.get(
      `https://api-academy.iran.liara.run/api/Home/GetTechnologies`
    );
  } catch (error) {
    return error;
  }
};

export const getAllReports = async () => {
  try {
    return await axios.get(
      `https://api-academy.iran.liara.run/api/Home/LandingReport`
    );
  } catch (error) {
    return error;
  }
};
