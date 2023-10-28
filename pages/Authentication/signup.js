import Progress from "@/components/common/Progress";
import StepOne from "@/components/signup/StepOne";
import StepSecend from "@/components/signup/StepSecend";
import StepThree from "@/components/signup/StepThree";
import mainContext from "@/context/mainContext";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import HomeButton from "@/components/common/HomeButton";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";

const signup = () => {
  const contextData = useContext(mainContext);
  const router = useRouter();

  const [data, setData] = useState({
    fullName: "",
    barthDate: "",
    nationalCode: "",
    phoneNumber: "",
    email: "",
    password: "",
  });
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepSecend next={handleNextStep} prev={handlePrevStep} data={data} />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  const [currentStep, setCurrentStep] = useState(0);

  function handleNextStep(newData, finalStep = false) {
    setData((prev) => ({ ...prev, ...newData }));
    if (finalStep) {
      newData.id = contextData.users.length + 1;
      newData.profile = "images/icons/profile.jpg";
      contextData.users.push(newData);
      axios.post("http://localhost:8000/users", newData);
      useLocalStorage("users", contextData.users, true);
      contextData.handleLoginUser(true);
      router.replace("/Authentication/login");
      return;
    }
    setCurrentStep((prev) => prev + 1);
  }

  function handlePrevStep(newData) {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  }
  return (
    <>
      <HomeButton />
      <div className="flex justify-between">
        <div className="h-[100vh] dark:lg:bg-[#2396f3] bg-[#2396f3] dark:bg-[#2e2e2e] lg:w-1/3 w-full flex items-center lg:justify-end justify-center right-0 top-0 lg:rounded-e-[200px]">
          <div className="">
            <Progress currentStep={currentStep} stepsNumber={3} />
            <div className="rounded-b-3xl relative lg:-left-24 shadow-lg lg:w-[400px] w-[350px] z-[2] bg-white p-6">
              {steps[currentStep]}
            </div>
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

export default signup;
