import { Slider } from "@mui/material";
import React from "react";

const RangeSlider = ({ data, handleChange, max, min }) => {
  return (
    <Slider
      value={data}
      onChange={handleChange}
      valueLabelDisplay="auto"
      max={max}
      min={min}
      getAriaValueText={(value) => `${value} ماه`}
      className="mt-3"
    />
  );
};

export default RangeSlider;
