import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarHeader } from "../components/Sidebar";
import headerImage from "../assets/elearn.png";
import learningModules from "../utils/learningModules";
import { LearnCard } from "../components/home/learn";

function ELearning() {
  return (
    <div className="">
      <div className=" px-2 md:px-10 flex items-center md:justify-normal justify-between">
        <Link to="/dashboard" className="">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <div className="mt-2">
          <SidebarHeader title="E-Learning" />
        </div>
      </div>
      <div
        className="hidden mb-4 p-2 md:flex items-center justify-between py-4 h-[400px] bg-[#E8E6DF]"
        style={{
          backgroundImage: `url(${headerImage})`,
          backgroundSize: "contain",
          backgroundPosition: "right",
          backgroundRepeat: "no-repeat",
        }}
      >
        <div className="md:mx-8 mx:2">
          <h1 className="lg:text-5xl md:text-3xl text-xl font-bold font-heading text-gray-700 ">
            E-Learn. Build your Skills.
          </h1>
          <p className="font-body text-gray-600 leading-relaxed py-2 text-lg md:w-1/2">
            Get access to numerous curated electronic courses and materials to
            help you grow you skills and business as well.
          </p>
          <div className="flex items-center gap-4 mt-4">
            <input
              className="bg-white w-[70%] h-12 px-4 rounded-lg"
              placeholder="Search for topics"
            />
            <button className="md:text-lg bg-primary px-4 py-2 rounded-md text-white w-1/4">
              Search
            </button>
          </div>
        </div>
      </div>
      <div className="md:hidden p-2 flex items-center justify-between py-4 h-[350px] text-gray-700 bg-[#E8E6DF] max-w-[1140px]">
        <div className="md:mx-8 mx:2">
          <h1 className="lg:text-5xl md:text-3xl text-xl font-bold font-heading">
            E-Learn. Build your Skills.
          </h1>
          <p className="font-body text-base leading-relaxed py-2 text-gray-600">
            Get access to numerous curated electronic courses and materials to
            help you grow you skills and business as well.
          </p>
          <div className="flex items-center gap-4 mt-8">
            <input
              className="bg-white w-[70%] h-12 px-4 rounded-lg"
              placeholder="Search for topics"
            />
            <button className="md:text-lg bg-primary px-4 py-2 rounded-md text-white w-1/4">
              Search
            </button>
          </div>
        </div>
      </div>
      <h1 className="font-heading text-3xl my-4 px-4">Trending Picks</h1>
      <div className="px-2 lg:mx-12 mt-4 grid md:grid-cols-3">
        {learningModules.map((module) => (
          <LearnCard key={module.id} learningModule={module} />
        ))}
      </div>
      <div className="flex justify-center items-center my-4">
        <button className="bg-transparent font-body text-sm md:text-lg rounded-md md:px-4 px-2 py-2 md:mt-8 mt-4 hover:bg-primary transition-all ease-in duration-150 border-primary border-[1px] hover:text-white">
          Load More
        </button>
      </div>
    </div>
  );
}

export default ELearning;
