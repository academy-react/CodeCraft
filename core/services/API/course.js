import mainContext from "@/context/mainContext";
import axios from "axios";
import { useContext } from "react";

export const getAllCourses = async (query = "", token) => {
  try {
    return await axios.get(
      `https://acadapi.etacorealtime.ir/api/Home/GetCoursesWithPagination${query}`,
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
  const header = {
    Authorization: `Bearer ${token}`,
  };

  try {
    const header = {
      Authorization: `Bearer ${token}`,
    };
    return await axios.post(
      `https://acadapi.etacorealtime.ir/api/Course/AddCourseLike?CourseId=${courseID}`,
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
      { headers: { Authorization: `Bearer ${token}` } }
    );
  } catch (error) {
    return error;
  }
};
