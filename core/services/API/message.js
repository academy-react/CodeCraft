import axios from "axios";

export const SendVerifyMessage = async (phoneNumber) => {
  try {
    return await axios.post(
      `https://api-academy.iran.liara.run/api/Sign/SendVerifyMessage?PhoneNumber=${phoneNumber}`
    );
  } catch (error) {
    return error;
  }
};

export const VerifyMessage = async (data) => {
  try {
    return await axios.post(
      "https://api-academy.iran.liara.run/api/Sign/VerifyMessage",
      data
    );
  } catch (error) {
    return error;
  }
};
