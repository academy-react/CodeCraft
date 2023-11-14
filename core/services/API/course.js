import axios from "axios";

export const getAllCourses = async (query = "") => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetCoursesWithPagination${query}`
    );
  } catch (error) {
    return error;
  }
};

export const getAllTeachers = async () => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetTeachers`
    );
  } catch (error) {
    return error;
  }
};

export const likeCourse = async (courseID, token) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCourseLike`,
      { courseId: courseID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};

export const addToFavorite = async (courseID, token) => {
  try {
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCourseFavorite`,
      { courseId: courseID },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );
  } catch (error) {
    return error;
  }
};
