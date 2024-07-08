import React from "react";
import learningModules, { TLearningModule } from "../../utils/learningModules";
import { LuFileSpreadsheet } from "react-icons/lu";
import { MdOutlineLibraryAddCheck } from "react-icons/md";
import { BsPeople } from "react-icons/bs";
import { Progress } from "../../../@/components/ui/progress";

function LearnCard({ learningModule }: { learningModule: TLearningModule }) {
  const completedPercent =
    learningModule.completed === 0
      ? 0
      : (learningModule.completed / learningModule.slides) * 100;
  return (
    <div className="shadow-xl mx-2 rounded-lg relative my-2 hover:scale-95 cursor-pointer duration-300 transition-all">
      <img
        src={learningModule.image}
        alt={learningModule.title}
        className="rounded-lg h-1/2 w-full object-cover"
      />
      <div>
        <h1 className="font-heading font-bold text-xl p-2">
          {learningModule.title}
        </h1>
      </div>
      <div className="flex items-center justify-between mx-2">
        <div className="flex items-center ">
          <LuFileSpreadsheet />
          <p className="font-body text-sm ">{learningModule.slides}</p>
        </div>
        <div className="flex items-center p-1">
          <MdOutlineLibraryAddCheck />
          <p className="font-body text-sm p-1">{learningModule.completed}</p>
        </div>
        <div className="flex items-center ">
          <BsPeople />
          <p className="font-body text-sm p-1">{learningModule.enrolled}</p>
        </div>
      </div>

      <div className="py-2 px-2">
        <span id="ProgressLabel" className="sr-only">
          Loading
        </span>

        <span
          role="progressbar"
          aria-labelledby="ProgressLabel"
          aria-valuenow={completedPercent}
          className="block rounded-full bg-gray-200"
        >
          <span
            className="block h-2 rounded-full bg-primary transition-all"
            style={{ width: `${completedPercent}%` }}
          ></span>
        </span>
      </div>
      <div className="absolute bottom-5 flex justify-between w-full">
        <p className="font-body text-sm text-gray-500 p-2">
          {learningModule.completed}% complete.
        </p>
        <p className="font-body text-sm text-gray-500 p-2">
          {learningModule.points} XP
        </p>
      </div>
    </div>
  );
}

function Learn() {
  return (
    <section className="">
      <div className="mx-auto max-w-[1340px] px-4 py-4 sm:px-6 lg:me-0 lg:py-4 lg:pe-0 lg:ps-8 xl:py-12">
        <h1 className="text-3xl font-heading font-bold">Your Courses</h1>
        <div className="grid grid-cols-1 gap-4 lg:grid-cols-3 lg:items-center">
          <div className="max-w-xl text-center w-3/4">
            <div className="">
              <div className="p-2">
                <div className="my-4">
                  <h1 className="text-5xl font-heading font-bold">3</h1>
                  <p className="text-xl font-body p-2">Learning Paths</p>
                </div>
                <div>
                  <h1 className="text-5xl font-heading font-bold">0</h1>
                  <p className="text-xl font-body p-2">Points Earned</p>
                </div>
              </div>
            </div>
          </div>

          <div className="-mx-6 lg:col-span-2 lg:mx-0">
            <div id="keen-slider" className="grid md:grid-cols-3">
              {learningModules.map((module) => (
                <LearnCard key={module.id} learningModule={module} />
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

export default Learn;
