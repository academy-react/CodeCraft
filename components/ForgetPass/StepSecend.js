import { forgetPasswordStepTwo } from "@/core/validation/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect, useRef, useState } from "react";
import * as yup from "yup";

const StepOne = ({ next, prev, handleSendCode, code }) => {
  const [remainingTime, setRemainingTime] = useState(60);
  const number = useRef(60);

  const handleSubmit = (values) => {
    next(values, true);
  };

  useEffect(() => {
    const timer = setInterval(() => {
      number.current -= 1;
      setRemainingTime(number.current);
    }, 1000);

    return () => {
      clearInterval(timer);
    };
  }, []);

  return (
    <Formik
      initialValues={{ code: "" }}
      onSubmit={handleSubmit}
      validationSchema={forgetPasswordStepTwo}
    >
      {(formProps) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap w-full">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <p className="text-xl font-bold text-center mb-8">
              کد فرستاده شده را وارد کنید
            </p>
          </div>
          <div className="relative">
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="کد"
              name="code"
            />
            {number.current >= 0 ? (
              <span
                className="block absolute top-7 left-3 h-8 text-[#2395f3] cursor-pointer"
                onClick={handleSendCode}
              >
                {number.current}
              </span>
            ) : (
              <button
                className="absolute top-6 left-3 text-[#2396f3] rounded-md cursor-pointer w-16 h-8 text-sm"
                onClick={() => {
                  handleSendCode();
                  number.current = 60;
                  setRemainingTime(number.current);
                }}
              >
                ارسال مجدد
              </button>
            )}
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="code" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            بعدی
          </button>
          <button
            type="button"
            class="w-full bg-[#2396f3] text-white py-2 rounded-md cursor-pointer mt-4 h-12"
            onClick={() => prev(formProps.values)}
          >
            قبلی
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
