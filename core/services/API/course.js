import axios from "axios";

export const getAllCourses = async (query = "") => {
  try {
    return await axios.get(
      `https://api-academy.iran.liara.run/api/Home/GetCoursesWithPagination${query}`
    );
  } catch (error) {
    return error;
  }
};

export const getAllTeachers = async () => {
  try {
    return await axios.get(
      `https://api-academy.iran.liara.run/api/Home/GetTeachers`
    );
  } catch (error) {
    return error;
  }
};

export const editCourses = async (newCourses, token) => {
  try {
    return await axios.put(
      `https://api-academy.iran.liara.run/api/Course`,
      newCourses,
      {
        headers: {
          Authorization: token,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
