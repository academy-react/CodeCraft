import React, { useEffect, useState } from "react";
import FilterItem from "../allCourses/FilterItem";
import RangeSlider from "./RangeSlider";

const FilterBar = ({
  userpanel,
  filterSelected,
  courseSearch,
  changeMainCourses,
  selectedCategori,
  selectedStatus,
  selectedTeacher,
  spenddingTime,
  priceRange,
  recordingStatusSelected,
  handleChangeCategori,
  handlePriceChange,
  handleSelectedTeacher,
  handleSelectedStatus,
  handleChangeSpenddingTime,
  maxSpenddingTime,
  minSpenddingTime,
  minPriceRange,
  maxPriceRange,
  handleRecordingStatusSelected,
  handleMaxPrice,
  handleMinPrice,
  handleResetFilters,
  CoursesData,
}) => {
  const allCategori = [];
  CoursesData.map((course) => {
    course.technologyList.split(",").map((technology) => {
      allCategori.push(technology);
    });
  });

  const categori = [...new Set(allCategori)];

  const allTeachers = CoursesData.map((course) => {
    return course.teacherName;
  });
  const teachers = [...new Set(allTeachers)];

  const allStatuses = CoursesData.map((course) => {
    return course.levelName;
  });
  const Statuses = [...new Set(allStatuses)];

  const applyFilter = () => {
    let updatedData = CoursesData;

    // if (selectedCategori !== "همه") {
    //   updatedData = updatedData.filter((course) =>
    //     course.technologyList
    //       .split(",")
    //       .some((item) => item === selectedCategori)
    //   );
    // }

    // if (selectedStatus !== "همه") {
    //   updatedData = updatedData.filter(
    //     (course) => course.status === selectedStatus
    //   );
    // }
    // if (selectedTeacher !== "همه") {
    //   updatedData = updatedData.filter(
    //     (course) => course.teacher === selectedTeacher
    //   );
    // }

    // updatedData = updatedData.filter((course) => {
    //   return (
    //     course.spenddingTime >= spenddingTime[0] &&
    //     course.spenddingTime <= spenddingTime[1]
    //   );
    // });

    // updatedData = updatedData.filter((course) => {
    //   return (
    //     course.nuumberprice >= priceRange[0] &&
    //     course.nuumberprice <= priceRange[1]
    //   );
    // });

    // if (courseSearch) {
    //   updatedData = updatedData.filter((course) =>
    //     _.includes(course.title.toLowerCase(), courseSearch.toLowerCase())
    //   );
    // }
    // if (recordingStatusSelected !== "همه") {
    //   updatedData = updatedData.filter(
    //     (course) =>
    //       (course.recordingStatus ? "در حال ضبط" : "تمام شده") ===
    //       recordingStatusSelected
    //   );
    // }

    // if (filterSelected === 2) {
    //   updatedData = _.orderBy(updatedData, "star", "desc");
    // }
    // if (filterSelected === 3) {
    //   updatedData = _.orderBy(updatedData, "students", "desc");
    // }
    // if (filterSelected === 4) {
    //   updatedData = updatedData.filter((course) => course.Discount);
    // }
    // if (filterSelected === 5) {
    //   updatedData = _.orderBy(updatedData, "nuumberprice", "asc");
    // }
    // if (filterSelected === 6) {
    //   updatedData = _.orderBy(updatedData, "nuumberprice", "desc");
    // }
    // if (filterSelected === 7) {
    //   updatedData = updatedData.sort(
    //     (a, b) => new Date(a.start) - new Date(b.start)
    //   );
    // }
    // if (filterSelected === 8) {
    //   updatedData = updatedData.sort(
    //     (a, b) => new Date(b.start) - new Date(a.start)
    //   );
    // }
    changeMainCourses(updatedData);
  };
  useEffect(() => {
    applyFilter();
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

  return (
    <div className="col-span-1 lg:m-0 mt-3">
      <button
        className="bg-green-500 text-center py-2 w-full text-white rounded-lg mb-3"
        onClick={handleResetFilters}
      >
        تنظیم مجدد فیلتر ها
      </button>
      <FilterItem
        title={"دسته بندی"}
        selected={selectedCategori}
        data={categori}
        setSelected={handleChangeCategori}
        init={true}
      />
      <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 mt-5">
        <div className="flex gap-2 items-center">
          <h1 className="text-[#555] dark:text-white h-7">قیمت</h1>
        </div>
        <div className="grid gap-4 grid-cols-2 w-full mt-3">
          <input
            type="number"
            placeholder="تا :"
            className={`rounded-lg overflow-hidden bg-[#e9e9ed] px-2 text-black ${
              userpanel
                ? "2xl:text-lg lg:text-xs sm:text-lg text-sm"
                : "xl:text-lg lg:text-sm sm:text-lg text-sm"
            }`}
            onChange={(event) => handleMaxPrice(event)}
            value={priceRange[1]}
          />
          <input
            type="number"
            placeholder="از :"
            className={`rounded-lg overflow-hidden bg-[#e9e9ed] px-2 text-black ${
              userpanel
                ? "2xl:text-lg lg:text-xs sm:text-lg text-sm"
                : "xl:text-lg lg:text-sm sm:text-lg text-sm"
            }`}
            onChange={(event) => handleMinPrice(event)}
            value={priceRange[0]}
          />
        </div>
        <RangeSlider
          data={priceRange}
          handleChange={handlePriceChange}
          max={maxPriceRange}
          min={minPriceRange}
        />
      </div>
      <div className="mt-5">
        <FilterItem
          title={"اساتید"}
          data={teachers}
          setSelected={handleSelectedTeacher}
          selected={selectedTeacher}
        />
      </div>
      <div className="mt-5">
        <FilterItem
          title={"دشواری"}
          data={Statuses}
          setSelected={handleSelectedStatus}
          selected={selectedStatus}
        />
      </div>
      <div className="w-full bg-white dark:bg-black rounded-xl shadow-lg p-4 mt-3 relative">
        <h1 className="text-[#555] dark:text-white h-7">زمان بندی</h1>
        <RangeSlider
          data={spenddingTime}
          handleChange={handleChangeSpenddingTime}
          max={maxSpenddingTime}
          min={minSpenddingTime}
        />
      </div>
      <div className="mt-5">
        <FilterItem
          title={"وضعیت دوره"}
          data={["در حال ضبط", "تمام شده"]}
          setSelected={handleRecordingStatusSelected}
          selected={recordingStatusSelected}
        />
      </div>
    </div>
  );
};

export default FilterBar;
