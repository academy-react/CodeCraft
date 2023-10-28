import React from "react";
import CountUp from "react-countup";

const Aboutus = ({ icon, number, text }) => {
  return (
    <div className="bg-[#5beb8c]/80  w-32 h-32 p-3 box-border rounded-md">
      <span className="w-full flex justify-center">{icon}</span>
      <span className="w-full block text-center mt-3">
        <CountUp start={0} end={number} duration={2} />
      </span>
      <span className="text-center block">{text}</span>
    </div>
  );
};

export default Aboutus;
