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
import { getAllCourses } from "@/core/services/API/course";
import { getAllCategories, getAllReports } from "@/core/services/API/Home";
import HeroSection from "@/components/IndexPage/HeroSection";

export default function Home(props) {
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

  return (
    <div>
      <Layout>
        <HeroSection AboutUsData={props.Aboutus} />
        <div className="grid lg:grid-cols-3 grid-cols-2 gap-5 mt-9">
          {props.categoris.slice(0, 6).map((item, index) => (
            <Categori {...item} key={item.id} index={index} />
          ))}
        </div>
        <IndexCourses CoursesData={props.coursesData} />
        <LastArticles />
        <LatestNews />
        <Teacher />
        <TopCmments comments={comments} />
        <Rating handleSubmit={handleSubmit} />
      </Layout>
    </div>
  );
}

export async function getServerSideProps() {
  const getCourses = async () => {
    return await getAllCourses();
  };
  const getCategories = async () => {
    return await getAllCategories();
  };
  const getAboutUsData = async () => {
    return await getAllReports();
  };
  return {
    props: {
      coursesData: await getCourses().then((data) => data.data),
      categoris: await getCategories().then((data) => data.data),
      Aboutus: await getAboutUsData().then((data) => data.data),
    },
  };
}
