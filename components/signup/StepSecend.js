import { signUpStepTwo } from "@/core/validation/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React from "react";
import * as yup from "yup";

const StepSecend = ({ next, prev, data }) => {
  const handleSubmit = (values) => {
    next(values);
  };
  return (
    <Formik
      initialValues={data}
      onSubmit={handleSubmit}
      validationSchema={signUpStepTwo}
    >
      {(formprops) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <h1 className="text-3xl font-bold text-center mb-8">مرحله دوم</h1>
          </div>
          <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="کد ملی"
              name="nationalCode"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="nationalCode" />
            </span>
          </div>
          <div>
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="شماره تلفن"
              name="phoneNumber"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="phoneNumber" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            بعدی
          </button>
          <button
            onClick={() => prev(formprops.values)}
            type="button"
            className="w-full bg-[#2396f3] text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            قبلی
          </button>
        </Form>
      )}
    </Formik>
  );
};

export default StepSecend;
