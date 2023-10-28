import Rodemap from "@/components/common/Rodemap";
import CourseDetailSection from "@/components/courseDetaile/CourseDetailSection";
import Layout from "@/layout/Layout";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import {
  AiOutlineClockCircle,
  AiFillCalendar,
  AiTwotoneStar,
  AiOutlineCheckCircle,
  AiFillFacebook,
} from "react-icons/ai";
import { GiDiamondHard } from "react-icons/gi";
import { BsLinkedin, BsSkipStartCircle } from "react-icons/bs";
import { GrUpdate, GrStatusInfo } from "react-icons/gr";
import { RiLoginCircleLine } from "react-icons/ri";
import { MdOutlinePlayLesson, MdOutlineReduceCapacity } from "react-icons/md";
import { BiSolidDislike, BiSolidLike } from "react-icons/bi";
import { PiStudentFill } from "react-icons/pi";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography,
} from "@mui/material";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";
import Course from "@/components/common/Course";
import Comments from "@/components/common/Comments";
import AddComment from "@/components/common/AddComment";
import { format } from "date-fns";
import mainContext from "@/context/mainContext";
import { CoursesData, TopTeachersData } from "@/DB/DataBase";

const courseDetaile = (props) => {
  const Router = useRouter();

  const product = CoursesData.find(
    (course) => course.id === Number(props.productID)
  );

  const [comments, setComents] = useState(product.comments);
  const [courseLike, setCourseLike] = useState(product.like);
  const [courseDisLike, setCourseDisLike] = useState(product.disLike);
  const [hasLiked, setHasLiked] = useState(false);
  const [hasDisLiked, setHasDisLiked] = useState(false);

  const teacherInfos = TopTeachersData.find(
    (teacher) => teacher.fullName === product.teacher
  );
  const courseSections = [
    {
      id: 1,
      title: "مدت زمان",
      value: `${product.spenddingTime} ماه`,
      icon: AiOutlineClockCircle,
    },
    { id: 2, title: "سطح دوره", value: product.status, icon: GiDiamondHard },
    {
      id: 3,
      title: "زمان شروع",
      value: product.start,
      icon: BsSkipStartCircle,
    },
    {
      id: 4,
      title: "زمان پایان",
      value: product.finish,
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
      value: product.recordingStatus ? "در حال ضبط" : "نمام شده",
      icon: GrStatusInfo,
    },
    {
      id: 7,
      title: "تعداد ثبت نام",
      value: `${product.students} نفر`,
      icon: RiLoginCircleLine,
    },
    {
      id: 8,
      title: "تعداد درس ها",
      value: product.numberOfLessens,
      icon: MdOutlinePlayLesson,
    },
    {
      id: 9,
      title: "ظرفیت دوره",
      value: `${product.maxStudents} نفر`,
      icon: MdOutlineReduceCapacity,
    },
  ];

  const contextData = useContext(mainContext);

  const handleSubmit = (value, event, parentID = null) => {
    if (contextData.userIsLogin) {
      const currentDate = new Date();
      const forrmatDate = format(currentDate, "yyyy-MM-dd");
      const newObject = {
        id: comments.length + 1,
        fullName: value.fullName,
        title: value.text,
        image: "/images/icons/profile.jpg",
        date: forrmatDate,
        parentid: parentID,
      };
      setComents((prev) => [newObject, ...prev]);
      event.resetForm();
    } else {
      Router.replace("/Authentication/login");
    }
  };
  const handleGetReplays = (commentID) => {
    return comments.filter((comment) => comment.parentID === commentID);
  };
  const handleAddToCart = (courseID) => {
    if (contextData.userIsLogin) {
      contextData.handleCartCourses(
        CoursesData.find((course) => course.id === courseID),
        true
      );
      contextData.handleShowSnack(
        "این دوره به سبد شما اضافه شد",
        3000,
        "seccess"
      );
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
  };
  const handleLike = () => {
    if (!hasLiked) {
      setCourseLike((prev) => prev + 1);
      setHasLiked(true);
      if (hasDisLiked) {
        setCourseDisLike((prev) => prev - 1);
        setHasDisLiked(false);
      }
    }
  };
  const handleDisLike = () => {
    if (!hasDisLiked) {
      setCourseDisLike((prev) => prev + 1);
      setHasDisLiked(true);
      if (hasLiked) {
        setCourseLike((prev) => prev - 1);
        setHasLiked(false);
      }
    }
  };

  return (
    <>
      <Layout>
        <div className="text-black  dark:text-white px-3">
          <Rodemap title={product.title} />
          <div className="grid xl:grid-cols-4 grid-cols-3 gap-7">
            <div className="col-span-3">
              <div className="flex justify-start gap-4">
                <button className="rounded-full bg-[#2396f3] text-white py-2 px-4">
                  {product.categori}
                </button>
              </div>
              <h1 className="text-4xl mt-7 dark:text-white">{product.title}</h1>
              <p className="text-gray-700 md:text-xl text-base mt-7 dark:text-gray-300">
                {product.desceiption}
              </p>
              <div className="flex justify-start sm:gap-10 gap-5 items-center mt-5">
                <div className="flex justify-center items-center gap-1 bg-[#ffca58] px-1 rounded-md text-[#d89f24]">
                  <AiTwotoneStar />
                  <span className="text-white">{product.star}</span>
                </div>
                <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                  <PiStudentFill size="20px" />
                  <span className="md:text-base sm:text-sm text-xs">
                    {product.students} شرکت کننده
                  </span>
                </div>
                <div className="flex justify-center gap-3 items-center text-gray-500 dark:text-gray-300">
                  <AiOutlineClockCircle size="20px" />
                  <span className="md:text-base sm:text-sm text-xs">
                    {product.spenddingTime} ماه
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
                  src={product.image}
                  alt="course image"
                  className="h-full col-span-1 rounded-lg"
                />
                <div className="col-span-1">
                  <div className="flex justify-between items-center">
                    <h1 className="text-2xl text-gray-700 dark:text-gray-200">
                      {product.nuumberprice} تومان
                    </h1>
                    <div className="flex justify-center gap-8 items-center">
                      <div
                        className="flex justify-center gap-2 items-center text-green-400 cursor-pointer"
                        onClick={handleLike}
                      >
                        <BiSolidLike />
                        <span>{courseLike}</span>
                      </div>
                      <div
                        className="flex justify-center gap-2 items-center text-red-400 cursor-pointer"
                        onClick={handleDisLike}
                      >
                        <BiSolidDislike />
                        <span>{courseDisLike}</span>
                      </div>
                    </div>
                  </div>
                  <div className="grid grid-cols-2 gap-3">
                    {courseSections.map((course) => (
                      <CourseDetailSection key={course.id} {...course} />
                    ))}
                  </div>
                  <button
                    className="bg-green-400 text-white rounded-md py-2 w-full"
                    onClick={() => handleAddToCart(product.id)}
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
                <p className="mt-5 text-gray-400 text-lg">
                  لورم ایپسوم متن ساختگی با تولید سادگی نامفهوم از صنعت چاپ، و
                  با استفاده از طراحان گرافیک است، چاپگرها و متون بلکه روزنامه و
                  مجله در ستون و سطرآنچنان که لازم است، و برای شرایط فعلی
                  تکنولوژی مورد نیاز، و کاربردهای متنوع با هدف بهبود ابزارهای
                  کاربردی می باشد، کتابهای زیادی در شصت و سه درصد گذشته حال و
                  آینده، شناخت فراوان جامعه و متخصصان را می طلبد، تا با نرم
                  افزارها شناخت بیشتری را برای طراحان رایانه ای علی الخصوص
                  طراحان خلاقی، و فرهنگ پیشرو در زبان فارسی ایجاد کرد، در این
                  صورت می توان امید داشت است لورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                  چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                  است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                  با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و
                  سه درصد گذشته حال و آینده است لورم ایپسوم متن ساختگی با تولید
                  سادگی نامفهوم از صنعت چاپ، و با استفاده از طراحان گرافیک است،
                  چاپگرها و متون بلکه روزنامه و مجله در ستون و سطرآنچنان که لازم
                  است، و برای شرایط فعلی تکنولوژی مورد نیاز، و کاربردهای متنوع
                  با هدف بهبود ابزارهای کاربردی می باشد، کتابهای زیادی در شصت و
                  سه درصد گذشته حال و آینده است
                </p>
                <h2 className="md:text-3xl sm:text-2xl text-xl text-gray-600 dark:text-gray-200 mt-10">
                  آنچه یاد خواهید گرفت
                </h2>
                <ul className="grid grid-cols-2 gap-5 mt-4">
                  {product.learningItems.map((item) => (
                    <li
                      className="flex justify-start gap-4 items-center"
                      key={item.id}
                    >
                      <AiOutlineCheckCircle />
                      <span className="text-gray-500 dark:text-gray-400 md:text-lg sm:text-sm text-xs">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
                <h2 className="md:text-3xl sm:text-2xl text-xl text-gray-600 dark:text-gray-200 mt-10">
                  پیش نیاز ها
                </h2>
                <ul className="w-full gap-5 mt-4">
                  {product.prerequsites.map((item) => (
                    <li
                      className="flex justify-start gap-4 items-center my-4"
                      key={item.id}
                    >
                      <AiOutlineCheckCircle key={item.id} />
                      <span className="text-gray-500 dark:text-gray-400 md:text-base sm:text-sm text-xs">
                        {item.title}
                      </span>
                    </li>
                  ))}
                </ul>
              </section>
              <section className="mt-16" id="questions">
                <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10">
                  سوالات متداول
                </h1>
                {product.questions.map((item) => (
                  <Accordion key={item.id} className="bg-blue-50 dark:bg-black">
                    <AccordionSummary
                      expandIcon={<ExpandMoreIcon />}
                      aria-controls="panel1a-content"
                      id="panel1a-header"
                      className=""
                    >
                      <Typography className="text-black dark:text-white">
                        {item.title}
                      </Typography>
                    </AccordionSummary>
                    <AccordionDetails>
                      <Typography className="text-black dark:text-white">
                        {item.anser}
                      </Typography>
                    </AccordionDetails>
                  </Accordion>
                ))}
              </section>
              <section className="mt-16 " id="teacher">
                <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10">
                  مدرس
                </h1>
                <div className="bg-white dark:bg-black rounded-md w-full p-3">
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
                src={product.image}
                alt="course image"
                className="w-full h-52 rounded-md"
              />
              <div className="p-4">
                <div className="flex justify-between items-center">
                  <h1 className="text-xl text-gray-700 dark:text-gray-200 mb-3">
                    {product.nuumberprice} تومان
                  </h1>
                  <button
                    className={`bg-green-500 disabled:bg-green-400 disabled:cursor-not-allowed text-white rounded-md px-6 py-2`}
                    onClick={() => {
                      if (
                        !(
                          (product.maxStudents - product.students) /
                          product.maxStudents
                        ) * 100
                      ) {
                        if (contextData.userIsLogin) {
                          contextData.handleAddToWaitingPage(product.id);
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
                        handleAddToCart(product.id);
                      }
                    }}
                    disabled={
                      contextData.cartCourses.some(
                        (course) => course.id === product.id
                      ) ||
                      contextData.userCourses.some(
                        (course) => course.id === product.id
                      ) ||
                      contextData.waitingPageCourses.some(
                        (course) => course.id === product.id
                      )
                    }
                  >
                    {contextData.cartCourses.some(
                      (course) => course.id === product.id
                    )
                      ? "افزوده شده"
                      : contextData.userCourses.some(
                          (course) => course.id === product.id
                        )
                      ? "خریداری شده"
                      : contextData.waitingPageCourses.some(
                          (course) => course.id === product.id
                        )
                      ? "در صفحه انتظار"
                      : !(
                          (product.maxStudents - product.students) /
                          product.maxStudents
                        ) * 100
                      ? "رزرو دوره"
                      : "خرید"}
                  </button>
                </div>
                {courseSections.map((course) => (
                  <CourseDetailSection {...course} key={course.id} />
                ))}
                <div className="mt-3 flex justify-center gap-5 items-center">
                  <div
                    className="flex justify-center gap-2 items-center text-green-400 cursor-pointer"
                    onClick={handleLike}
                  >
                    <BiSolidLike />
                    <span>{courseLike}</span>
                  </div>
                  <div
                    className="flex justify-center gap-2 items-center text-red-400 cursor-pointer"
                    onClick={handleDisLike}
                  >
                    <BiSolidDislike />
                    <span>{courseDisLike}</span>
                  </div>
                </div>
              </div>
            </aside>
          </div>
          <div>
            <h1 className="text-black dark:text-white md:text-3xl sm:text-2xl text-xl font-bold mb-10 mt-10">
              دوره های مرتبط
            </h1>
            <div className="w-full mt-10 grid xl:grid-cols-4 sm:grid-cols-2 grid-cols-1 gap-7 text-white">
              {CoursesData.filter(
                (course) => course.categori === product.categori
              )
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
  const courseDetail = props.params.courseDetaile;
  return {
    props: {
      productID: courseDetail,
    },
  };
}

export default courseDetaile;
