import HomeButton from "@/components/common/HomeButton";
import mainContext from "@/context/mainContext";
import {
  loginValidation,
  loginValidationEmail,
  loginValidationPhone,
} from "@/core/validation/validation";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useState } from "react";
import { AiFillEye, AiFillEyeInvisible, AiTwotonePhone } from "react-icons/ai";
import { LuAtSign } from "react-icons/lu";

const Login = () => {
  const [passwordInputIsHidden, setPasswordInputIsHidden] = useState(true);
  const [AllUsers, setAllUsers] = useState([]);
  const [loginWithEmail, setLoginWithEmail] = useState(false);

  const contextData = useContext(mainContext);
  const router = useRouter();

  useEffect(() => {
    const getUsers = async () => {
      const AllUsers = await axios.get("http://localhost:8000/users");
      setAllUsers(AllUsers.data);
    };
    getUsers();
  }, []);
  const handleSubmit = async (values, events) => {
    const newValue = {
      phoneOrGmail: values.phone ? values.phone : values.email,
      password: values.password,
      rememberMe: values.rememberMe ? true : false,
    };
    const userData = await axios.post(
      "https://api-academy.iran.liara.run/api/Sign/Login",
      newValue
    );
    if (userData.data.seccess) {
      // const currentUser = AllUsers.find((user) => {
      //   return user.password === values.password && user.email === values.email;
      // });
      // useLocalStorage("userData", currentUser, true);
      // contextData.setCurrentUser(currentUser);
      // contextData.handleLoginUser(true);
      // contextData.handleShowSnack("ورود با موفقیت انجام شد", 2000, "seccess");
      // setTimeout(() => {
      //   router.replace("/");
      // }, 5000);
      alert("yes");
    } else {
      contextData.handleShowSnack(
        "ایمیل یا رمز عبور شما اشتباه است",
        3000,
        "error"
      );
    }
    events.resetForm();
  };
  return (
    <>
      <HomeButton />
      <div className="flex justify-between">
        <div className="h-[100vh] dark:lg:bg-[#2396f3] bg-[#2396f3] dark:bg-[#2e2e2e] lg:w-1/3 w-full flex items-center lg:justify-end justify-center right-0 top-0 lg:rounded-e-[200px]">
          <div className="rounded-3xl relative lg:-left-24 shadow-lg lg:w-[400px] w-[350px] z-[2] bg-white p-6">
            <Formik
              initialValues={
                loginWithEmail
                  ? { password: "", email: "" }
                  : { password: "", phone: "" }
              }
              onSubmit={handleSubmit}
              validationSchema={
                loginWithEmail ? loginValidationEmail : loginValidationPhone
              }
            >
              <Form>
                <button
                  className="absolute right-3 top-3 w-20 h-10 flex justify-center gap-3 items-center bg-blue-400 rounded-full"
                  onClick={() => setLoginWithEmail((prev) => !prev)}
                >
                  <div className="z-[2]">
                    <LuAtSign
                      color={loginWithEmail ? "#2396f3" : "white"}
                      size={25}
                    />
                  </div>
                  <div className="z-[2]">
                    <AiTwotonePhone
                      color={loginWithEmail ? "white" : "#2396f3"}
                      size={25}
                    />
                  </div>
                  <div
                    className={`absolute top-[4px] h-[80%] w-[30px] bg-white rounded-full z-[1] ${
                      loginWithEmail ? "right-[6px]" : "left-[6px]"
                    }`}
                  ></div>
                </button>
                <div className="flex justify-center flex-row flex-wrap">
                  <div className="w-full flex justify-center">
                    <img
                      src="/images/logo.png"
                      alt="logo"
                      className="w-[100px]"
                    />
                  </div>
                  <h1 className="text-3xl font-bold text-center mb-8">ورود</h1>
                </div>
                {loginWithEmail ? (
                  <div>
                    <Field
                      className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
                      placeholder="ایمیل"
                      name="email"
                    />
                    <span className="text-[#ff3434] font-bold">
                      <ErrorMessage name="email" />
                    </span>
                  </div>
                ) : (
                  <div>
                    <Field
                      className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
                      placeholder="شماره تماس"
                      name="phone"
                    />
                    <span className="text-[#ff3434] font-bold">
                      <ErrorMessage name="phone" />
                    </span>
                  </div>
                )}
                <div className="relative">
                  <Field
                    className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
                    placeholder="رمز عبور"
                    name="password"
                    type={passwordInputIsHidden ? "password" : "text"}
                  />
                  <div className="absolute left-3 top-7 text-black">
                    {passwordInputIsHidden ? (
                      <AiFillEyeInvisible
                        onClick={() =>
                          setPasswordInputIsHidden((prev) => !prev)
                        }
                        size={"25px"}
                        className="cursor-pointer"
                      />
                    ) : (
                      <AiFillEye
                        onClick={() =>
                          setPasswordInputIsHidden((prev) => !prev)
                        }
                        size={"25px"}
                        className="cursor-pointer"
                      />
                    )}
                  </div>
                  <span className="text-[#ff3434] font-bold">
                    <ErrorMessage name="password" />
                  </span>
                </div>
                <div className="flex justify-start gap-3 items-center mt-3">
                  <Field
                    type="checkbox"
                    className="cursor-pointer"
                    name="rememberMe"
                  />
                  <span className="text-gray-600">مرا به خاطر بسپار</span>
                </div>
                <button
                  type="submit"
                  className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
                >
                  ورود
                </button>
                <Link href="/Authentication/signup">
                  <span className="text-[#2396f3] block mt-5 w-full text-center">
                    ثبت نام
                  </span>
                </Link>
                <Link href="/Authentication/forgetPass">
                  <span className="text-[#2396f3] block mt-5 w-full text-center">
                    بازیابی رمز
                  </span>
                </Link>
              </Form>
            </Formik>
          </div>
        </div>
        <img
          src="/images/Authentication/signup.png"
          alt="ثبت نام"
          className="w-[1000px] lg:block hidden"
        />
      </div>
    </>
  );
};

export default Login;
