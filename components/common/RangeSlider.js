import { CoursesContext } from "@/context/coursesContext";
import { Slider } from "@mui/material";
import React, { useContext } from "react";

const RangeSlider = ({ data, max, min }) => {
  const { setPriceRange } = useContext(CoursesContext);
  return (
    <Slider
      value={data}
      onChange={(e) => setPriceRange(e.target.value)}
      valueLabelDisplay="auto"
      max={max === -Infinity ? 0 : max}
      min={min === Infinity ? 0 : min}
      getAriaValueText={(value) => `${value} ماه`}
      className="mt-3"
    />
  );
};

export default RangeSlider;
