import React from "react";
import CountUp from "react-countup";

const Aboutus = (props) => {
  console.log(props.number);
  return (
    <div className="bg-[#5beb8c]/80  w-32 h-32 p-3 box-border rounded-md">
      <span className="w-full block text-center mt-3">
        <CountUp start={0} end={props.number} duration={4} />
      </span>
      <span className="text-center block text-xl mt-4">{props.text}</span>
    </div>
  );
};

export default Aboutus;
