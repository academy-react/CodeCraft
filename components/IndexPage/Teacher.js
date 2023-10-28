import React, { useState } from "react";
import { AiFillFacebook, AiOutlineUser } from "react-icons/ai";
import { MdKeyboardArrowLeft } from "react-icons/md";
import { EffectCoverflow, EffectFade, Navigation } from "swiper/modules";
import "swiper/css/effect-coverflow";
import { Swiper, SwiperSlide } from "swiper/react";
import { TopTeachersData } from "@/DB/DataBase";
import { BsLinkedin } from "react-icons/bs";
import { FaInstagramSquare, FaTwitterSquare } from "react-icons/fa";

const Teacher = () => {
  const handleNext = () => {};
  return (
    <div className="mt-14">
      <div className="justify-between px-4 items-center mb-9 xl:hidden flex">
        <h1 className="md:text-3xl sm:text-2xl text-xl dark:text-white text-[#4c5c84]">
          مدرسین
        </h1>
        <button className="text-[#2196f3] md:text-base sm:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
          مشاهده همه
          <MdKeyboardArrowLeft />
        </button>
      </div>
      <div className="grid xl:grid-cols-4 grid-cols-3 gap-5 xl:h-auto h-[400px]">
        <div
          className="col-span-1 rounded-lg bg-[#eaecf1] dark:bg-black p-7 xl:block hidden"
          data-aos="fade-left"
        >
          <div className="flex justify-between px-2 items-center">
            <div className="flex justify-center gap-3 items-center">
              <AiOutlineUser
                className="text-[#333] dark:text-white"
                size={"30px"}
              />
              <span className="text-[#333] dark:text-white">مدرسین</span>
            </div>
            <div>
              <button className="text-[#2196f3] md:text-sm text-xs border border-[#2196f3] px-4 py-[2px] h-8 rounded-md hover:text-white hover:bg-[#2196f3] transition-colors flex items-center">
                مشاهده همه
                <MdKeyboardArrowLeft />
              </button>
            </div>
          </div>
          <div className="w-[80%] mx-auto mt-5 overflow-hidden h-full">
            <Swiper
              effect={"coverflow"}
              grabCursor={true}
              centeredSlides={true}
              slidesPerView={"auto"}
              coverflowEffect={{
                rotate: 50,
                stretch: 0,
                depth: 100,
                modifier: 1,
                slideShadows: true,
              }}
              modules={[EffectCoverflow]}
              className="mySwiper rounded-xl"
            >
              {TopTeachersData.map((teacher) => (
                <SwiperSlide key={teacher.id}>
                  <div className="relative">
                    <img src={teacher.image} className="w-full h-[250px]" />
                    <div className="bg-white dark:bg-[#2e2e2e] text-[#333] dark:text-white text-center leading-3 text-lg p-4">
                      {teacher.fullName}
                    </div>
                  </div>
                </SwiperSlide>
              ))}
            </Swiper>
          </div>
        </div>
        <div
          className="col-span-3 rounded-lg bg-[#eaecf1] dark:bg-black h-[100%] relative p-3"
          data-aos="flip-left"
        >
          <Swiper
            navigation={true}
            modules={[Navigation]}
            className="mySwiper mySwiper !absolute top-0 right-0 h-full w-full"
          >
            {TopTeachersData.map((teacher) => (
              <SwiperSlide
                className="w-full h-full p-10 px-20 rounded-lg overflow-hidden bg-[#eaecf1] dark:bg-black overflow-y-auto"
                key={teacher.id}
              >
                <img
                  src={teacher.image}
                  alt=""
                  className="rounded-full h-20 w-20 mx-auto border-4 border-white mb-3"
                />
                <h1 className="text-black dark:text-white text-2xl text-center">
                  {teacher.fullName}
                </h1>
                <p className="text-gray-500 dark:text-gray-300 md:text-lg text-sm mt-3">
                  {teacher.description}
                </p>
                <div className="flex text-[#2396f0]  justify-center mt-5 gap-5">
                  {teacher.medias.includes("linkdin") ? (
                    <BsLinkedin size={"30px"} className="cursor-pointer" />
                  ) : null}
                  {teacher.medias.includes("instagram") ? (
                    <FaInstagramSquare
                      size={"30px"}
                      className="cursor-pointer"
                    />
                  ) : null}
                  {teacher.medias.includes("twitter") ? (
                    <FaTwitterSquare size={"30px"} className="cursor-pointer" />
                  ) : null}
                  {teacher.medias.includes("facebook") ? (
                    <AiFillFacebook size={"30px"} className="cursor-pointer" />
                  ) : null}
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
};

export default Teacher;
