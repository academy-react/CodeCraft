import axios from "axios";

export const Register = async (userData) => {
  try {
    return await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/Register",
      userData
    );
  } catch (error) {
    return error;
  }
};

export const loginUser = async (userData) => {
  try {
    const result = await axios.post(
      "https://acadapi.etacorealtime.ir/api/Sign/Login",
      userData
    );
    return result;
  } catch (error) {
    return error;
  }
};
