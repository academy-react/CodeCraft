import axios from "axios";

export const getUserInfo = async (token) => {
  try {
    const result = await axios.get(
      "https://api-academy.iran.liara.run/api/SharePanel/GetProfileInfo",
      { headers: { Authorization: `Bearer ${token}` } }
    );
    return result;
  } catch (error) {
    return error;
  }
};
