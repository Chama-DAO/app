import React from "react";
import { OnboardingData, TOnboarding } from "../utils/types/onboarding";

function Stepper({ stepData }: { stepData: OnboardingData }) {
  return (
    <div className="flex items-center">
      <div className="lg:w-3/4 ">
        <div>{stepData.logo}</div>
        <div className="mt-8">
          <div className="flex md:gap-2 gap-1 items-center ">
            <div className="w-[30px] bg-black rounded-lg h-1"></div>
            <div
              className={`w-[30px] ${
                stepData.id >= 2 ? "bg-black" : "bg-gray-400"
              } rounded-lg h-1`}
            ></div>
            <div
              className={`w-[30px] ${
                stepData.id >= 3 ? "bg-black" : "bg-gray-400"
              } rounded-lg h-1`}
            ></div>
            <div
              className={`w-[30px] ${
                stepData.id >= 4 ? "bg-black" : "bg-gray-400"
              } rounded-lg h-1`}
            ></div>
          </div>
          <h1 className="font-heading text-black font-bold mt-4">
            {stepData.id} of 4
          </h1>
        </div>
        <h1 className="font-heading text-xl md:text-3xl text-black mt-4">
          {stepData.title}
        </h1>
        <div>{stepData.content}</div>
        <p className="text-gray-500 leading-relaxed font-body font-light text-sm w-3/4">
          {stepData.alt}
        </p>
      </div>
      <div className="w-1/4 h-full hidden lg:flex">
        <div>{stepData.sideImage}</div>
      </div>
    </div>
  );
}

export default Stepper;
