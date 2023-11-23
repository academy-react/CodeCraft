import React, { useContext, useEffect, useState } from "react";
import FilterItem from "../allCourses/FilterItem";
import RangeSlider from "./RangeSlider";
import { CoursesContext } from "@/context/coursesContext";
import CategoriFilter from "../allCourses/filterBar/CategoriFilter";

const FilterBar = ({
  userpanel,
  selectedCategori,
  selectedStatus,
  selectedTeacher,
  spenddingTime,
  recordingStatusSelected,
  handleChangeCategori,
  handlePriceChange,
  handleSelectedTeacher,
  handleSelectedStatus,
  handleChangeSpenddingTime,
  maxSpenddingTime,
  minSpenddingTime,
  handleRecordingStatusSelected,
  handleMaxPrice,
  handleMinPrice,
  handleResetFilters,
}) => {
  const {
    allCategories,
    teachers,
    allCourses,
    minPriceRange,
    maxPriceRange,
    priceRange,
  } = useContext(CoursesContext);

  const allStatuses = [
    ...new Set(
      allCourses.map((course) => {
        return course.levelName;
      })
    ),
  ];

  return (
    <div className="col-span-1 lg:m-0 mt-3">
      <button
        className="bg-green-500 text-center py-2 w-full text-white rounded-lg mb-3"
        onClick={handleResetFilters}
      >
        تنظیم مجدد فیلتر ها
      </button>
      <CategoriFilter />
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
          titleKeyName={"fullName"}
          title={"اساتید"}
          data={teachers}
          setSelected={handleSelectedTeacher}
          selected={selectedTeacher}
        />
      </div>
      <div className="mt-5">
        <FilterItem
          titleKeyName={null}
          title={"سطح دوره"}
          data={allStatuses}
          setSelected={handleSelectedStatus}
          selected={selectedStatus}
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
