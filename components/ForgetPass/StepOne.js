// import { forgetPasswordStepOne } from "@/core/validation/validation";
// import { ErrorMessage, Field, Form, Formik } from "formik";
// import Link from "next/link";
// import React, { useRef } from "react";
// import * as yup from "yup";

// const StepOne = ({ next }) => {
//   const farstField = useRef();
//   const handleSubmit = (values) => {
//     next(values);
//   };
//   if (typeof window !== "undefined") {
//     window.addEventListener("load", () => {});
//   }

//   return (
//     <Formik
//       initialValues={{ email: "" }}
//       onSubmit={handleSubmit}
//       validationSchema={forgetPasswordStepOne}
//     >
//       <Form>
//         <div className="flex justify-center flex-row flex-wrap w-full">
//           <div className="w-full flex justify-center">
//             <img src="/images/logo.png" alt="logo" className="w-[100px]" />
//           </div>
//           <h1 className="text-3xl font-bold text-center mb-8">فرماموشی رمز</h1>
//         </div>
//         <div>
//           <Field
//             className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
//             placeholder="ایمیل"
//             name="email"
//           />
//           <span className="text-[#ff3434] font-bold">
//             <ErrorMessage name="email" />
//           </span>
//         </div>
//         <button
//           type="submit"
//           className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
//         >
//           بعدی
//         </button>
//         <Link href="/Authentication/login">
//           <span className="text-[#2396f3] block mt-5 w-full text-center">
//             ورود
//           </span>
//         </Link>
//       </Form>
//     </Formik>
//   );
// };

// export default StepOne;

import { forgetPasswordStepOne } from "@/core/validation/validation";
import { ErrorMessage, Field, Form, Formik } from "formik";
import Link from "next/link";
import React, { useEffect } from "react";
import { useLocation } from "react-use";

const StepOne = ({ next }) => {
  const url = useLocation();

  const handleSubmit = (values) => {
    next(values);
  };

  return (
    <Formik
      initialValues={{ email: "" }}
      onSubmit={handleSubmit}
      validationSchema={forgetPasswordStepOne}
    >
      {(formProps) => (
        <Form>
          <div className="flex justify-center flex-row flex-wrap w-full">
            <div className="w-full flex justify-center">
              <img src="/images/logo.png" alt="logo" className="w-[100px]" />
            </div>
            <p className="text-xl font-bold text-center mb-8">
              ایمیل خود را وارد کنید
            </p>
          </div>
          <div className="relative">
            <Field
              className="shadow-md border w-full rounded-md outline-none pr-3 my-4 h-12 dark:text-gray-700"
              placeholder="ایمیل"
              name="email"
            />
            <span className="text-[#ff3434] font-bold">
              <ErrorMessage name="email" />
            </span>
          </div>
          <button
            type="submit"
            className="w-full bg-green-400 text-white py-2 rounded-md cursor-pointer mt-4 h-12"
          >
            بعدی
          </button>
          <Link href="/Authentication/login">
            <span className="text-[#2396f3] block mt-5 w-full text-center">
              ورود
            </span>
          </Link>
        </Form>
      )}
    </Formik>
  );
};

export default StepOne;
