import Link from "next/link";
import React from "react";
import { useRef } from "react";
import { useEffect } from "react";

const Categori = (props) => {
  const categori = useRef();

  useEffect(() => {
    categori.current.style.background = `linear-gradient(90deg , ${props.color[0]}, ${props.color[1]})`;
  });
  return (
    <Link href={`/courses/?categori=${props.title}`}>
      <div
        className={`rounded-md text-white col-span-1 cursor-pointer shadow-xl h-24 p-4 text-center leading-[4rem] lg:text-xl lg:leading-[4rem] text-lg`}
        data-aos="fade-up"
        data-aos-delay={Number(props.index) * 100}
        ref={categori}
      >
        {props.title}
      </div>
    </Link>
  );
};

export default Categori;
