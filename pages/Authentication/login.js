import HomeButton from "@/components/common/HomeButton";
import mainContext from "@/context/mainContext";
import { loginValidation } from "@/core/validation/validation";
import useLocalStorage from "@/hooks/useLocalStorage";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import { AiFillEye, AiFillEyeInvisible } from "react-icons/ai";

const Login = () => {
  const [passwordInputIsHidden, setPasswordInputIsHidden] = useState(true);

  const contextData = useContext(mainContext);
  const router = useRouter();
  const handleSubmit = (values, events) => {
    if (
      contextData.users.some(
        (user) =>
          user.password === values.password && user.email === values.email
      )
    ) {
      const currentUser = contextData.users.find((user) => {
        console.log(user.password);
        return user.password === values.password && user.email === values.email;
      });
      useLocalStorage("userData", currentUser, true);
      contextData.setCurrentUser(currentUser);
      contextData.handleLoginUser(true);
      contextData.handleShowSnack("ورود با موفقیت انجام شد", 2000, "seccess");

      setTimeout(() => {
        router.replace("/");
      }, 5000);
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
              initialValues={{ password: "", email: "" }}
              onSubmit={handleSubmit}
              validationSchema={loginValidation}
            >
              <Form>
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
