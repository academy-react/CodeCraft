import { CoursesData, CoursesPageFilters } from "@/DB/DataBase";
import Layout from "@/layout/Layout";
import React, { useContext, useEffect, useRef, useState } from "react";
import { IoSearchOutline } from "react-icons/io5";
import CourseIndexFilter from "@/components/IndexPage/IndexCourse/CourseIndexFilter";
import Course from "@/components/common/Course";
import { RiFilter2Fill } from "react-icons/ri";
import * as _ from "lodash";
import { Stack } from "@mui/system";
import {
  Box,
  CircularProgress,
  Pagination,
  PaginationItem,
  Typography,
} from "@mui/material";
import FilterBar from "@/components/common/FilterBar";
import mainContext from "@/context/mainContext";
import Rodemap from "@/components/common/Rodemap";
import { CiViewColumn, CiViewList } from "react-icons/ci";
import useFetch from "@/hooks/useFetch";
import { IoIosAddCircle } from "react-icons/io";
import { HiClock } from "react-icons/hi";

const Courses = (props) => {
  const contextData = useContext(mainContext);
  const itemsPerPage = useRef();

  const [filterSelected, setFilterSelected] = useState(7);
  const [mainCourses, setMainCourses] = useState(CoursesData);
  const [courseSearch, setCourseSearch] = useState("");
  const [page, setPage] = useState(1);
  const [pageSize, setPageSize] = useState(6);
  const select = useRef(null);
  const [isFilterBarOpen, setIsFilterBarOpen] = useState(false);
  const [selectedCategori, setSelectedCategori] = useState(
    props.searchParam || "همه"
  );
  const [selectedTeacher, setSelectedTeacher] = useState("همه");
  const [selectedStatus, setSelectedStatus] = useState("همه");
  const [recordingStatusSelected, setRecordingStatusSelected] = useState("همه");
  const [maxPriceRange, setMaxPriceRange] = useState(() => {
    return Math.max(...mainCourses.map((course) => course.nuumberprice));
  });
  const [minPriceRange, setMinPriceRange] = useState(() => {
    return Math.min(...mainCourses.map((course) => course.nuumberprice));
  });
  const [priceRange, setPriceRange] = useState([minPriceRange, maxPriceRange]);
  const [selectedView, setSelectedView] = useState("col");
  const [windowSize, setWindowSize] = useState(0);
  const maxSpenddingTime = Math.max(
    ...CoursesData.map((course) => course.spenddingTime)
  );
  const minSpenddingTime = Math.min(
    ...CoursesData.map((course) => course.spenddingTime)
  );
  const [spenddingTime, setSpenddingTime] = useState([
    minSpenddingTime,
    maxSpenddingTime,
  ]);

  const handleMinPrice = (event) => {
    if (!event.target.value) {
      setPriceRange((prev) => [
        +mainCourses.reduce((prev, current) => {
          if (current.nuumberprice < prev) {
            return current.nuumberprice;
          }
          return prev;
        }, mainCourses[0].nuumberprice),
        +prev[1],
      ]);
    } else {
      setPriceRange((prev) => [+event.target.value, +prev[1]]);
    }
  };
  const handleMaxPrice = (event) => {
    if (!event.target.value) {
      setPriceRange((prev) => [
        +prev[0],
        +mainCourses.reduce((prev, current) => {
          if (current.nuumberprice > prev) {
            return current.nuumberprice;
          }
          return prev;
        }, mainCourses[0].nuumberprice),
      ]);
    } else {
      setPriceRange((prev) => [+prev[0], +event.target.value]);
    }
  };
  const handlePriceChange = (event) => {
    setPriceRange(event.target.value);
  };
  const handleChangeSpenddingTime = (event) => {
    setSpenddingTime(event.target.value);
  };

  const handleSearch = (event) => {
    setCourseSearch(event.target.value);
  };
  const handlePageChange = (event, page) => {
    setPage(page);
    contextData.scrollToTop();
  };
  const handleChangeMainCourses = (value) => {
    setMainCourses(value);
  };
  const handleChangeCategori = (value) => {
    setSelectedCategori(value);
  };
  const handleSelectedTeacher = (value) => {
    setSelectedTeacher(value);
  };
  const handleSelectedStatus = (value) => {
    setSelectedStatus(value);
  };
  const handleRecordingStatusSelected = (value) => {
    setRecordingStatusSelected(value);
  };
  const handleResetFilters = () => {
    setFilterSelected(2);
    setMainCourses(CoursesData);
    setCourseSearch("");
    setPage(1);
    setIsFilterBarOpen(false);
    setSelectedCategori("همه");
    setSelectedTeacher("همه");
    setSelectedStatus("همه");
    setRecordingStatusSelected("همه");
    setPriceRange([
      CoursesData.reduce((prev, current) => {
        if (current.nuumberprice < prev) {
          return current.nuumberprice;
        }
        return prev;
      }, CoursesData[0] && CoursesData[0].nuumberprice),
      CoursesData.reduce((prev, current) => {
        if (current.nuumberprice > prev) {
          return current.nuumberprice;
        }
        return prev;
      }, CoursesData[0] && CoursesData[0].nuumberprice),
    ]);
    setSpenddingTime([minSpenddingTime, maxSpenddingTime]);
  };
  const handleDeleteCoursesData = (CourseID) => {
    const newCourses = [...CoursesData].filter(
      (course) => course.id !== CourseID
    );
    setCoursesData(newCourses);
    setMainCourses(newCourses);
  };

  useEffect(() => {
    setPage(1);
  }, [
    selectedCategori,
    selectedStatus,
    selectedTeacher,
    spenddingTime,
    priceRange,
    courseSearch,
    filterSelected,
    recordingStatusSelected,
  ]);

  if (typeof window !== "undefined") {
    useEffect(() => {
      setWindowSize(window.innerWidth);
      window.addEventListener("resize", () => {
        setIsFilterBarOpen(false);
        setWindowSize(window.innerWidth);
      });
    }, []);
  }
  return (
    <>
      <Layout hidden={props.userpanel ? true : false}>
        <div className="md:p-0 p-5">
          <div className={"grid grid-cols-4 gap-7"}>
            <div className="lg:block hidden">
              <FilterBar
                userpanel
                filterSelected={filterSelected}
                courseSearch={courseSearch}
                changeMainCourses={handleChangeMainCourses}
                selectedCategori={selectedCategori}
                selectedStatus={selectedStatus}
                selectedTeacher={selectedTeacher}
                spenddingTime={spenddingTime}
                priceRange={priceRange}
                recordingStatusSelected={recordingStatusSelected}
                handleChangeCategori={handleChangeCategori}
                handlePriceChange={handlePriceChange}
                handleSelectedTeacher={handleSelectedTeacher}
                handleSelectedStatus={handleSelectedStatus}
                handleChangeSpenddingTime={handleChangeSpenddingTime}
                maxSpenddingTime={maxSpenddingTime}
                minSpenddingTime={minSpenddingTime}
                maxPriceRange={maxPriceRange}
                minPriceRange={minPriceRange}
                handleRecordingStatusSelected={handleRecordingStatusSelected}
                handleMaxPrice={handleMaxPrice}
                handleMinPrice={handleMinPrice}
                handleResetFilters={handleResetFilters}
                CoursesData={CoursesData}
              />
            </div>
            <div className={"lg:col-span-3 col-span-4"}>
              <form className="h-fit relative mb-3 rounded-lg overflow-hidden">
                <input
                  onChange={(event) => handleSearch(event)}
                  placeholder="جستجو..."
                  className="pr-10 dark:text-white text-black bg-white shadow-sm dark:bg-black outline-none w-full font-iran rounded-lg h-[47px]"
                />
                <IoSearchOutline
                  className="absolute top-3 right-2"
                  size={"25px"}
                  color="#64748b"
                />
                <button
                  type="button"
                  className="h-full px-3 py-2 absolute left-0 top-0 text-white bg-[#2396f3] text-sm flex justify-center items-center gap-1 lg:hidden"
                  onClick={() => setIsFilterBarOpen((prev) => !prev)}
                >
                  <RiFilter2Fill />
                  فیلتر
                </button>
              </form>
              <div className="flex justify-between xl:items-start items-center gap-5">
                <select
                  name="itemsPerPage"
                  ref={itemsPerPage}
                  className="bg-[#2196f3] text-white p-1 block rounded-md sm:h-14 h-10 md:w-auto w-10 text-xs sm:text-sm md:text-base px-3"
                  onChange={() => {
                    setPageSize(itemsPerPage.current.value);
                    setPage(1);
                  }}
                >
                  <option value="3">3</option>
                  <option value="6" selected>
                    6
                  </option>
                  <option value="12">12</option>
                </select>
                <div
                  className={`bg-[#e5e5e5] dark:bg-black w-full 2xl:px-2 px-1 py-2 rounded-md ${
                    !props.userpanel ? "xl:flex hidden" : "hidden"
                  } justify-center 2xl:gap-5 gap-2 mb-4`}
                >
                  {CoursesPageFilters.map((filter) => (
                    <CourseIndexFilter
                      key={filter.id}
                      coursesPage
                      {...filter}
                      setFilterSelected={setFilterSelected}
                      filterSelected={filterSelected}
                    />
                  ))}
                </div>
                {!props.userpanel ? (
                  <div className="justify-center items-center p-2 gap-3 bg-[#2396f3] sm:h-14 h-10 rounded-lg text-white hidden sm:flex">
                    <button
                      className={`"h-full w-full p-2 rounded-md ${
                        selectedView === "col" && "bg-blue-300"
                      }`}
                      onClick={() => setSelectedView("col")}
                    >
                      <CiViewColumn
                        size={`${windowSize >= 768 ? "25" : "20"}`}
                      />
                    </button>
                    <button
                      className={`"h-full w-full p-2 rounded-md ${
                        selectedView === "row" && "bg-blue-300"
                      }`}
                      onClick={() => setSelectedView("row")}
                    >
                      <CiViewList size={`${windowSize >= 768 ? "25" : "20"}`} />
                    </button>
                  </div>
                ) : null}
                <select
                  onChange={() => {
                    setFilterSelected(Number(select.current.value));
                  }}
                  ref={select}
                  name="filter"
                  className={`bg-[#2196f3] text-white p-1 ${
                    props.userpanel ? "block" : "xl:hidden block"
                  } rounded-md sm:h-[60px] h-[40px] md:w-auto sm:w-28 w-24 text-xs sm:text-sm md:text-base`}
                >
                  {CoursesPageFilters.map((item, index) => (
                    <option key={item.id} value={item.id} selected={!index}>
                      {item.title}
                    </option>
                  ))}
                </select>
              </div>
              <div className={isFilterBarOpen ? "block" : "hidden"}>
                <FilterBar
                  userpanel
                  filterSelected={filterSelected}
                  courseSearch={courseSearch}
                  changeMainCourses={handleChangeMainCourses}
                  selectedCategori={selectedCategori}
                  selectedStatus={selectedStatus}
                  selectedTeacher={selectedTeacher}
                  spenddingTime={spenddingTime}
                  priceRange={priceRange}
                  recordingStatusSelected={recordingStatusSelected}
                  handleChangeCategori={handleChangeCategori}
                  handlePriceChange={handlePriceChange}
                  handleSelectedTeacher={handleSelectedTeacher}
                  handleSelectedStatus={handleSelectedStatus}
                  handleChangeSpenddingTime={handleChangeSpenddingTime}
                  maxSpenddingTime={maxSpenddingTime}
                  minSpenddingTime={minSpenddingTime}
                  maxPriceRange={maxPriceRange}
                  minPriceRange={minPriceRange}
                  handleRecordingStatusSelected={handleRecordingStatusSelected}
                  handleMaxPrice={handleMaxPrice}
                  handleMinPrice={handleMinPrice}
                  handleResetFilters={handleResetFilters}
                  CoursesData={CoursesData}
                />
              </div>
              {!props.userpanel ? (
                <div
                  className={`grid ${
                    selectedView === "col"
                      ? "xl:grid-cols-3 md:grid-cols-2 grid-cols-1"
                      : "grid-cols-1"
                  } gap-5 mt-5`}
                >
                  {mainCourses.length ? (
                    mainCourses
                      .slice(page * pageSize - pageSize, page * pageSize)
                      .map((course) => (
                        <Course
                          {...course}
                          key={course.id}
                          view={selectedView}
                          handleDeleteCoursesData={handleDeleteCoursesData}
                        />
                      ))
                  ) : (
                    <div className="w-full flex justify-center xl:col-span-4 md:col-span-2">
                      <img
                        src="/images/empty.jpg"
                        alt="noting found"
                        className="lg:w-[40%]"
                      />
                    </div>
                  )}
                </div>
              ) : (
                <div className="bg-zinc-50 dark:bg-gradient-to-t dark:from-[#0a7c4c] dark:to-[#333] shadow-md text-black mt-20 py-3 pb-7 pl-7 border-zinc-200 dark:border-white dark:shadow-sm dark:shadow-white border dark:border-none dark:border-t rounded-lg">
                  <h1 className="text-center mr-3 dark:text-white sm:text-xl text-lg">
                    تمامی دوره ها
                  </h1>
                  <table className="w-full border-spacing-4 rounded-md mt-5">
                    <thead>
                      <tr>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                          تصویر
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                          نام دوره
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                          تاریخ شروع
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200 sm:table-cell hidden">
                          مدرس
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200">
                          ظرفیت خالی
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200 md:table-cell hidden">
                          قیمت
                        </th>
                        <th className="text-sm font-normal text-gray-700 dark:text-gray-200 md:table-cell hidden">
                          خرید
                        </th>
                      </tr>
                    </thead>
                    <tbody>
                      {mainCourses
                        .slice(page * pageSize - pageSize, page * pageSize)
                        .map((course) => {
                          const studentSpace =
                            ((course.maxStudents - course.students) /
                              course.maxStudents) *
                            100;
                          return (
                            <tr key={course.id} className="">
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 flex justify-center">
                                <img
                                  src={course.image}
                                  alt={course.title}
                                  className="h-[40px] w-[80px] rounded-sm"
                                />
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300">
                                <span>{course.title}</span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 sm:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.start}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300  sm:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.teacher}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 ">
                                <Box
                                  sx={{
                                    position: "relative",
                                    display: "inline-flex",
                                  }}
                                >
                                  <CircularProgress
                                    variant="determinate"
                                    color="primary"
                                    value={100 - studentSpace}
                                  />
                                  <Box
                                    sx={{
                                      top: 0,
                                      left: 0,
                                      bottom: 0,
                                      right: 0,
                                      position: "absolute",
                                      display: "flex",
                                      alignItems: "center",
                                      justifyContent: "center",
                                    }}
                                  >
                                    <Typography
                                      variant="caption"
                                      color="text.secondary"
                                    >
                                      <span className="dark:text-white">
                                        {`${Math.round(studentSpace)}%`}
                                      </span>
                                    </Typography>
                                  </Box>
                                </Box>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 md:table-cell hidden">
                                <span className={`px-2 rounded-md`}>
                                  {course.nuumberprice === 0
                                    ? "رایگان"
                                    : course.nuumberprice}
                                </span>
                              </td>
                              <td className="py-2 px-3 text-sm text-center text-gray-500 dark:text-gray-300 md:table-cell hidden">
                                <div className="flex justify-center cursor-pointer">
                                  {contextData.userCourses.some(
                                    (Course) => Course.id === course.id
                                  ) ||
                                  contextData.cartCourses.some(
                                    (Course) => Course.id === course.id
                                  ) ? (
                                    <IoIosAddCircle
                                      size={25}
                                      className="text-gray-500"
                                    />
                                  ) : !studentSpace ? (
                                    <HiClock
                                      size={25}
                                      className="text-yellow-500"
                                      onClick={() =>
                                        contextData.handleAddToWaitingPage(
                                          course.id
                                        )
                                      }
                                    />
                                  ) : (
                                    <IoIosAddCircle
                                      size={25}
                                      className="text-green-500"
                                      onClick={() => {
                                        contextData.handleCartCourses(
                                          course,
                                          true
                                        );
                                      }}
                                    />
                                  )}
                                </div>
                              </td>
                            </tr>
                          );
                        })}
                    </tbody>
                  </table>
                </div>
              )}
              <div className="w-full flex justify-center mt-10" dir="ltr">
                <Stack spacing={2}>
                  <Pagination
                    count={Math.ceil(mainCourses.length / pageSize)}
                    onChange={handlePageChange}
                    shape="rounded"
                    color={"primary"}
                    renderItem={(item) => (
                      <PaginationItem {...item} className="dark:text-white" />
                    )}
                  />
                </Stack>
              </div>
            </div>
          </div>
        </div>
      </Layout>
    </>
  );
};

export async function getServerSideProps(context) {
  return {
    props: {
      searchParam: context.query.categori || null,
    },
  };
}

export default Courses;
