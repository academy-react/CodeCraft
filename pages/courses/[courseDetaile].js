import Rodemap from "@/components/common/Rodemap";
import CourseDetailSection from "@/components/courseDetaile/CourseDetailSection";
import Layout from "@/layout/Layout";
import React, { useContext, useEffect, useState } from "react";
import {
  AiOutlineClockCircle,
  AiFillCalendar,
  AiTwotoneStar,
  AiFillHeart,
} from "react-icons/ai";
import { GiDiamondHard } from "react-icons/gi";
import { BsLinkedin, BsSkipStartCircle } from "react-icons/bs";
import { GrUpdate, GrStatusInfo } from "react-icons/gr";
import { RiArticleLine, RiLoginCircleLine } from "react-icons/ri";
import { MdOutlineVideoLibrary } from "react-icons/md";
import { PiStudentFill } from "react-icons/pi";
import Course from "@/components/common/Course";
import Comments from "@/components/common/Comments";
import mainContext from "@/context/mainContext";
import {
  getAllComments,
  getAllTeachers,
  getCourseDetail,
  AddCommentAPI,
  getAllCourses,
} from "@/core/services/API/course";
import useLocalStorage from "@/hooks/useLocalStorage";
import { AddComment } from "@mui/icons-material";
import { format } from "date-fns";
import { faIR } from "date-fns/locale";

const courseDetaile = (props) => {
  const [product, setProduct] = useState({});
  const [courseLike, setCourseLike] = useState(product.likeCount);
  const [userIsLiked, setUserIsLiked] = useState(product.userIsLiked);
  const [comments, setComents] = useState(props.comments);

  console.log(product);

  const contextData = useContext(mainContext);

  const handleLike = async () => {
    const result = !userIsLiked
      ? await likeCourse(product.courseId, useLocalStorage("token", "", true))
      : await DeletelikeCourse(
          product.courseId,
          useLocalStorage("token", "", true)
        );
    if (result.data?.success) {
      setCourseLike((prev) => (userIsLiked ? (prev -= 1) : (prev += 1)));
      setUserIsLiked((prev) => !prev);
    } else {
      contextData.handleShowSnack(result.data?.message, 3000, "error");
    }
  };

  const teacherInfos = props.teachers.find(async (teacher) => {
    return teacher.teacherId === (await product.teacherId);
  });

  useEffect(() => {
    const handleGetProduct = async () => {
      const result = await getCourseDetail(props.productId);
      setProduct(await result.data);
    };
    handleGetProduct();
  }, []);

  console.log(product);

  const courseSections = [
    {
      id: 2,
      title: "سطح دوره",
      value: product.courseLevelName,
      icon: GiDiamondHard,
    },
    {
      id: 3,
      title: "زمان شروع",
      value: product.startTime,
      icon: BsSkipStartCircle,
    },
    {
      id: 4,
      title: "زمان پایان",
      value: product.endTime,
      icon: AiFillCalendar,
    },
    {
      id: 5,
      title: "اخرین بروزرسانی",
      value: product.latestUpdate,
      icon: GrUpdate,
    },
    {
      id: 6,
      title: "وضعیت دوره",
      value: product.courseStatusName,
      icon: GrStatusInfo,
    },
    {
      id: 7,
      title: "تعداد ثبت نام",
      value: `${product.currentRegistrants} نفر`,
      icon: RiLoginCircleLine,
    },
  ];

  const handleSubmit = async (value, event) => {
    // if (contextData.userIsLiked) {
    //   const newObject = {
    //     Title: value.fullName,
    //     CourseId: props.courseId,
    //     Describe: value.text,
    //   };
    //   await AddCommentAPI(newObject, useLocalStorage("token", "", true));
    //   setComents((prev) => [newObject, ...prev]);
    //   event.resetForm();
    // } else {
    //   Router.replace("/Authentication/login");
    // }
    console.log(value);
  };
  // const handleGetReplays = (commentID) => {
  //   return comments.filter((comment) => comment.parentID === commentID);
  // };
  // const handleAddToCart = (courseID) => {
  //   if (contextData.userIsLogin) {
  //     contextData.handleCartCourses(
  //       CoursesData.find((course) => course.id === courseID),
  //       true
  //     );
  //     contextData.handleShowSnack(
  //       "این دوره به سبد شما اضافه شد",
  //       3000,
  //       "seccess"
  //     );
  //   } else {
  //     contextData.handleShowSnack(
  //       "برای خرید دوره اول ثبت نام کنید",
  //       2000,
  //       "error"
  //     );
  //     setTimeout(() => {
  //       Router.replace("/Authentication/login");
  //     }, 2000);
  //   }
  // };
  // const handleLike = () => {
  //   if (!hasLiked) {
  //     setCourseLike((prev) => prev + 1);
  //     setHasLiked(true);
  //     if (hasDisLiked) {
  //       setCourseDisLike((prev) => prev - 1);
  //       setHasDisLiked(false);
  //     }
  //   }
  // };
  // const handleDisLike = () => {
  //   if (!hasDisLiked) {
  //     setCourseDisLike((prev) => prev + 1);
  //     setHasDisLiked(true);
  //     if (hasLiked) {
  //       setCourseLike((prev) => prev - 1);
  //       setHasLiked(false);
  //     }
  //   }
  // };

  return (
    <>
      <Layout>
        <div className="text-black  dark:text-white px-3">
          <Rodemap title={product.title} />
          <div className="grid xl:grid-cols-4 grid-cols-3 gap-7">
            <div className="col-span-3">
              <div className="flex justify-start gap-4">
                {product.techs?.map((tech) => {
                  <button className="rounded-full bg-[#2396f3] text-white py-2 px-4">
                    {tech}
                  </button>;
                })}
              </div>
              <h1 className="text-4xl mt-7 dark:text-white">{product.title}</h1>
              <p className="text-gray-700 md:text-xl text-base mt-7 dark:text-gray-300">
                {product.describe}
              </p>
              <div className="flex justify-start sm:gap-10 gap-5 items-center mt-5">
                <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24]">
                  <AiTwotoneStar />
                  <span className="text-white">{product.currentRate}</span>
                </div>
                <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                  <PiStudentFill size="20px" />
                  <span className="md:text-base sm:text-sm text-xs">
                    {product.currentRegistrants} شرکت کننده
                  </span>
                </div>
                <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                  <img
                    src={teacherInfos.image}
                    alt="profile"
                    className="rounded-full w-7"
                  />
                  <span className="md:text-base sm:text-sm text-xs">
                    {teacherInfos.fullName}
                  </span>
                </div>
              </div>
              <div className="w-full bg-white dark:bg-black mt-10 p-4 xl:hidden grid md:grid-cols-2 grid-cols-1 gap-5">
                <img
                  src={product.tumbImageAddress}
                  alt="course image"
                  className="h-full col-span-1 rounded-lg"
                />
                <div className="col-span-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-gray-700 dark:text-gray-200">
                      {product.cost} تومان
                    </h1>
                    <button
                      className={`${
                        userIsLiked
                          ? "bg-red-500 border-red-500"
                          : "bg-black/30 border-black/30"
                      } p-2 rounded-lg  hover:border-red-500 border-2 transition-colors lg:text-base text-sm shadow-2xl flex gap-1 items-center`}
                      onClick={() => {
                        handleLike(product.courseId, contextData.token);
                      }}
                    >
                      <div>
                        <AiFillHeart
                          className={`h-5 ${
                            userIsLiked ? "text-white" : "text-red-500"
                          }`}
                        />
                      </div>
                      <span className="h-5 text-xs">{courseLike}</span>
                    </button>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {courseSections.map((course) => (
                      <CourseDetailSection key={course.id} {...course} />
                    ))}
                  </div>
                  <button
                    className="bg-green-400 text-white rounded-md py-2 w-full"
                    onClick={() => handleAddToCart(product.courseId)}
                  >
                    خرید
                  </button>
                </div>
              </div>
              <div className="w-full mt-20 border-b border-gray-300 flex justify-start gap-7 pt-3 text-xl text-gray-500 dark:text-gray-300 sticky top-[78px] bg-[#f4f6f8] dark:bg-[#2e2e2e] z-[1]">
                <button className="hover:text-[#2396f3] hover:border-[#2396f3] border-b-4 border-transparent transition-all pb-3 md:text-xl sm:text-base text-sm">
                  <a href="#about">شرح پروژه</a>
                </button>
                <button className="hover:text-[#2396f3] hover:border-[#2396f3] border-b-4 border-transparent transition-all pb-3 md:text-xl sm:text-base text-sm">
                  <a href="#questions">سوالات پرتکرار</a>
                </button>
                <button className="hover:text-[#2396f3] hover:border-[#2396f3] border-b-4 border-transparent transition-all pb-3 md:text-xl sm:text-base text-sm">
                  <a href="#teacher">مدرس</a>
                </button>
                <button className="hover:text-[#2396f3] hover:border-[#2396f3] border-b-4 border-transparent transition-all pb-3 md:text-xl sm:text-base text-sm">
                  <a href="#comments">بررسی ها</a>
                </button>
              </div>
              <section className="mt-16" id="about">
                <h1 className="text-black dark:text-white text-3xl font-bold">
                  بررسی اجمالی دوره
                </h1>
                <p className="mt-5 text-gray-400 text-lg">{product.describe}</p>
              </section>
              <section className="mt-16 " id="teacher">
                <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10">
                  مدرس
                </h1>
                {/* <div className="bg-white dark:bg-black rounded-md w-full p-3">
                  <img
                    src={teacherInfos.image}
                    alt="پروفایل"
                    className="rounded-full h-20 w-20 mx-auto border-4 border-white mb-3"
                  />
                  <h1 className="text-black  dark:text-white text-2xl text-center">
                    {teacherInfos.fullName}
                  </h1>
                  <p className="text-gray-400 dark:text-gray-300 md:text-lg text-sm mt-3">
                    {teacherInfos.description}
                  </p>
                  <div className="flex text-[#2396f0]  justify-center mt-5 gap-5">
                    {teacherInfos.medias.includes("linkdin") ? (
                      <BsLinkedin size={"30px"} className="cursor-pointer" />
                    ) : null}
                    {teacherInfos.medias.includes("instagram") ? (
                      <FaInstagramSquare
                        size={"30px"}
                        className="cursor-pointer"
                      />
                    ) : null}
                    {teacherInfos.medias.includes("twitter") ? (
                      <FaTwitterSquare
                        size={"30px"}
                        className="cursor-pointer"
                      />
                    ) : null}
                    {teacherInfos.medias.includes("facebook") ? (
                      <AiFillFacebook
                        size={"30px"}
                        className="cursor-pointer"
                      />
                    ) : null}
                  </div>
                </div> */}
                <div className="w-full h-full md:flex gap-5">
                  <div className="md:h-full md:w-[200px] h-[100px] w-[100px] md:rounded-xl rounded-full overflow-hidden mx-auto">
                    <img
                      src={
                        teacherInfos.pictureAddress ||
                        "/images/icons/profile.jpg"
                      }
                      alt="profile"
                      className=" h-full object-contain bg-white mx-auto border-4 border-white mb-3"
                    />
                  </div>
                  <div className="md:w-[80%] w-full mt-5">
                    <h1 className="text-black dark:text-white text-4xl md:text-right text-center">
                      {teacherInfos.fullName || "teacher"}
                    </h1>
                    {teacherInfos.linkdinProfileLink ? (
                      <div className="flex w-full md:justify-start justify-center gap-3 items-center text-[#2396f3] mt-5">
                        <BsLinkedin size={"50px"} className="cursor-pointer" />
                        <span className="text-xl">
                          {teacherInfos.linkdinProfileLink}@
                        </span>
                      </div>
                    ) : null}
                    <div className="flex justify-center gap-44 mt-5 w-full text-[#2396f3]">
                      <div>
                        <span className="text-center text-3xl block text-gray-700 ">
                          دوره ها
                        </span>
                        <MdOutlineVideoLibrary size={130} color="" />
                        <span className="text-4xl block text-center">
                          {teacherInfos.courseCount}
                        </span>
                      </div>
                      <div>
                        <span className="text-center text-3xl block text-gray-700 ">
                          مقالات
                        </span>
                        <RiArticleLine size={130} color="" />
                        <span className="text-4xl block text-center">
                          {teacherInfos.newsCount}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </section>
              <section className="mt-16 " id="comments">
                <header className="flex gap-3">
                  <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10">
                    نظرات
                  </h1>
                  <span>{`(${comments.length})`}</span>
                </header>
                <ul>
                  {comments
                    .filter((comment) => comment.parentID === null)
                    .sort((a, b) => new Date(b.date) - new Date(a.date))
                    .map((comment) => (
                      <Comments
                        key={comment.id}
                        {...comment}
                        handleSubmit={handleSubmit}
                        handleGetReplays={handleGetReplays}
                      />
                    ))}
                </ul>
                <h2 className="md:text-3xl sm:text-2xl text-xl text-gray-600 dark:text-gray-200 mt-10">
                  ثبت نظر
                </h2>
                <AddComment handleSubmit={handleSubmit} parentID={null} />
              </section>
            </div>
            <aside className="bg-white dark:bg-black col-span-1 w-full rounded-lg p-3 shadow-md sticky h-[86vh] overflow-y-auto top-24 xl:block hidden">
              <img
                src={product.tumbImageAddress}
                alt="course image"
                className="w-full h-52 rounded-md"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl text-gray-700 dark:text-gray-200 mb-3">
                    {product.cost} تومان
                  </h1>
                  <button
                    className={`bg-green-500 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-md px-6 py-2`}
                    onClick={() => {
                      if (
                        !(
                          (product.maxStudents - product.currentRegistrants) /
                          product.maxStudents
                        ) * 100
                      ) {
                        if (contextData.userIsLogin) {
                          contextData.handleAddToWaitingPage(product.courseId);
                        } else {
                          contextData.handleShowSnack(
                            "برای خرید دوره اول ثبت نام کنید",
                            2000,
                            "error"
                          );
                          setTimeout(() => {
                            Router.replace("/Authentication/login");
                          }, 2000);
                        }
                      } else {
                        handleAddToCart(product.courseId);
                      }
                    }}
                    disabled={
                      contextData.cartCourses.some(
                        (course) => course.id === product.courseId
                      ) ||
                      contextData.userCourses.some(
                        (course) => course.id === product.courseId
                      ) ||
                      contextData.waitingPageCourses.some(
                        (course) => course.id === product.courseId
                      )
                    }
                  >
                    {contextData.cartCourses.some(
                      (course) => course.id === product.courseId
                    )
                      ? "افزوده شده"
                      : contextData.userCourses.some(
                          (course) => course.id === product.courseId
                        )
                      ? "خریداری شده"
                      : contextData.waitingPageCourses.some(
                          (course) => course.id === product.courseId
                        )
                      ? "در صفحه انتظار"
                      : !(
                          (product.maxStudents - product.currentRegistrants) /
                          product.maxStudents
                        ) * 100
                      ? "رزرو دوره"
                      : "خرید"}
                  </button>
                </div>
                {courseSections.map((course) => (
                  <CourseDetailSection {...course} key={course.id} />
                ))}
                <button
                  className={`${
                    userIsLiked
                      ? "bg-red-500 border-red-500"
                      : "bg-black/30 border-black/30"
                  } p-2 rounded-lg  hover:border-red-500 border-2 transition-colors lg:text-base text-sm shadow-2xl flex gap-1 items-center`}
                  onClick={() => {
                    handleLike(product.courseId, contextData.token);
                  }}
                >
                  <div>
                    <AiFillHeart
                      className={`h-5 ${
                        userIsLiked ? "text-white" : "text-red-500"
                      }`}
                    />
                  </div>
                  <span className="h-5 text-xs">{courseLike}</span>
                </button>
              </div>
            </aside>
          </div>
          <div>
            <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10 mt-10">
              دوره های مرتبط
            </h1>
            <div className="w-full mt-10 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7 text-white">
              {props.allCourses
                .filter((course) => course.technologyList === product.techList)
                .slice(0, 4)
                .map((course) => (
                  <Course key={course.id} {...course} view="col" />
                ))}
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(props) {
  const getTeachers = async () => {
    return await getAllTeachers();
  };
  const getComments = async () => {
    return await getAllComments(props.params.courseDetaile);
  };
  const getCourses = async () => {
    return await getAllCourses();
  };
  return {
    props: {
      productId: props.params.courseDetaile,
      teachers: await getTeachers().then((data) => data.data),
      comments: await getComments().then((data) => data.data),
      allCourses: await getCourses().then(
        (data) => data.data?.courseFilterDtos
      ),
    },
  };
}

export default courseDetaile;
