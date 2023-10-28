import Layout from "@/layout/Layout";
import { useContext, useEffect, useState } from "react";
import Aboutus from "@/components/IndexPage/Aboutus";
import {
  AboutUsData,
  CategoriData,
  CoursesData,
  TopCommentData,
} from "@/DB/DataBase";
import IndexCourses from "@/components/IndexPage/IndexCourse/IndexCourses";
import LastArticles from "@/components/IndexPage/LastArticles";
import LatestNews from "@/components/IndexPage/LatestNews";
import Teacher from "@/components/IndexPage/Teacher";
import TopCmments from "@/components/IndexPage/TopCmments";
import Rating from "@/components/IndexPage/IndexRating/Rating";
import AOS from "aos";
import "aos/dist/aos.css";
import Link from "next/link";
import Categori from "@/components/IndexPage/Categori";
import mainContext from "@/context/mainContext";
import { useRouter } from "next/router";
import useFetch from "@/hooks/useFetch";

export default function Home() {
  const contextData = useContext(mainContext);
  const router = useRouter();

  useEffect(() => {
    AOS.init();
  }, []);

  const [comments, setComments] = useState(TopCommentData);

  const handleSubmit = (values, events) => {
    if (contextData.userIsLogin) {
      values.profile = "images/icons/profile.jpg";
      const newComments = [...comments, values];
      setComments(newComments);
      events.resetForm();
      contextData.handleShowSnack("نظر شما ثبت شد", 3000, "seccess");
    } else {
      contextData.handleShowSnack("لطفا در سایت ثبت نام کنید", 2000, "error");
      setTimeout(() => {
        router.replace("/Authentication/login");
      }, 2000);
    }
  };

  const categoris = [...new Set(CoursesData.map((course) => course.categori))];

  return (
    <div>
      <Layout>
        <div
          className=" w-full md:h-[480px] h-[580px] relative sm:rounded-lg text-white"
          data-aos="zoom-in-up"
          style={{
            backgroundImage: "url(/images/herosection.jpg)",
            backgroundRepeat: "repeat",
          }}
        >
          <div className="absolute top-0 w-full h-full bg-[#4b9fffcc] sm:rounded-lg">
            <div className="mx-auto md:w-[700px] w-full h-full">
              <h1 className="w-full text-center mt-14 text-4xl font-bold">
                آموزش آنلاین ویدیویی، مهارت برای اشتغال
              </h1>
              <p className="text-center mt-5 text-xl">
                برای حرفه‌ای شدن حرفه‌ای آموزش ببینید
              </p>
              <div className="w-full flex justify-center gap-4 mt-5">
                <Link href={"/courses"}>
                  <button className="border border-white text-white bg-transparent px-3 py-1 hover:bg-white rounded-md transition-all duration-150 hover:-translate-y-[2px] hover:text-blue-400">
                    شروع یادگیری
                  </button>
                </Link>
                <Link href={"/about"}>
                  <button className="border border-white text-white bg-transparent px-3 py-1 hover:bg-white rounded-md transition-all duration-150 hover:-translate-y-[2px] hover:text-blue-400">
                    درباره ما
                  </button>
                </Link>
              </div>
              <div className="w-full flex justify-center mt-9 gap-5 flex-wrap flex-row">
                {AboutUsData.map((item) => {
                  const { id, icon: IconComponent, number, text } = item;
                  return (
                    <>
                      <Aboutus
                        key={number}
                        icon={<IconComponent size="40px" />}
                        number={number}
                        text={text}
                      />
                    </>
                  );
                })}
              </div>
            </div>
          </div>
        </div>
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-9">
          {CategoriData.map((item, index) => (
            <Categori {...item} key={item.id} index={index} />
          ))}
        </div>
        <IndexCourses />
        <LastArticles />
        <LatestNews />
        <Teacher />
        <TopCmments comments={comments} />
        <Rating handleSubmit={handleSubmit} />
      </Layout>
    </div>
  );
}
