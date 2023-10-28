import { usersData } from "@/DB/DataBase";
import Progress from "@/components/common/Progress";
import StepOne from "@/components/ForgetPass/StepOne";
import StepSecend from "@/components/ForgetPass/StepSecend";
import StepThree from "@/components/ForgetPass/StepThree";
import { useRouter } from "next/router";
import React, { useContext, useState } from "react";
import HomeButton from "@/components/common/HomeButton";
import mainContext from "@/context/mainContext";
import useLocalStorage from "@/hooks/useLocalStorage";
import axios from "axios";

const ForgetPass = () => {
  const router = useRouter();
  const [recoveryCode, setRecoveryCode] = useState(0);

  const contextData = useContext(mainContext);

  const [data, setData] = useState({ email: "" });
  const steps = [
    <StepOne next={handleNextStep} data={data} />,
    <StepSecend
      next={handleNextStep}
      handleSendCode={handleSendCode}
      prev={handlePrevStep}
      data={data}
    />,
    <StepThree next={handleNextStep} prev={handlePrevStep} data={data} />,
  ];
  const [currentStep, setCurrentStep] = useState(0);

  function handleNextStep(newData, secendStep = false, finalStep = false) {
    if (finalStep) {
      const currentUserIndex = contextData.users.findIndex(
        (user) => user.email === data.email
      );
      const currentUser = [...contextData.users][currentUserIndex];
      currentUser.password = newData.password;
      const newUsers = contextData.users.map((user) =>
        user.id === currentUser.id ? currentUser : user
      );
      axios.put("http://localhost:8000/users/" + currentUser.id, currentUser);
      contextData.setUsers(newUsers);
      contextData.currentUser = currentUser;
      useLocalStorage("users", contextData.users, true);
      useLocalStorage("userData", currentUser, true);
      router.replace("/Authentication/login");
      return;
    }
    if (secendStep) {
      if (Number(newData.code) === recoveryCode) {
        setCurrentStep((prev) => prev + 1);
      } else {
        contextData.handleShowSnack("کد وارد شده درست نبود", 3000, "error");
      }
      return;
    }

    const userWithEmailExists = contextData.users.some(
      (user) => user.email === newData.email
    );
    if (userWithEmailExists) {
      setData(newData);
      handleSendCode();
      setCurrentStep((prev) => prev + 1);
    } else {
      contextData.handleShowSnack("ایمیل شما پیدا نشد", 3000, "error");
    }
  }

  function handlePrevStep(newData) {
    setData((prev) => ({ ...prev, ...newData }));
    setCurrentStep((prev) => prev - 1);
  }
  function handleSendCode() {
    const number = Math.round(Math.random() * 1000000);
    setRecoveryCode(number);
    alert(number);
  }
  return (
    <>
      <HomeButton />
      <div className="flex justify-between">
        <div className="h-[100vh] dark:lg:bg-[#2396f3] bg-[#2396f3] dark:bg-[#2e2e2e] lg:w-1/3 w-full flex items-center lg:justify-end justify-center right-0 top-0 lg:rounded-e-[200px]">
          <div>
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

export default ForgetPass;
