import React from "react";
import { IoIosCash } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import equity from "../../../public/equity.png";

function Details() {
  return (
    <div className="flex flex-col gap-2 my-4 mx-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-heading font-bold py-2">ChamaName</h1>
        <div className="flex flex-col text-xs">
          <p>chama age</p>
          <p>chama type</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center md:mt-4">
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Treasury</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Project Allocations</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Total Payouts</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Banker</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <img src={equity} className="w-15 h-8" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Total Fees</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Proposals Made</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
      </div>
    </div>
  );
}

export default Details;
