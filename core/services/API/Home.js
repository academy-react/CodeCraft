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

export const getAllNews = async () => {
  try {
    return await axios.get(`https://api-academy.iran.liara.run/api/News`);
  } catch (error) {
    return error;
  }
};
