import React from "react";
import { FaChevronLeft, FaPlus } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarHeader } from "../components/Sidebar";
import logo from "../assets/logo.png";
import ProposalTab from "../components/proposals/ProposalTab";
import { proposals } from "../utils/proposals";

function Proposals() {
  return (
    <div className="px-2 md:px-10">
      <div className="flex items-center md:justify-normal justify-between">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <div className="mt-2">
          <SidebarHeader title="ChamaDAO Proposals" />
        </div>
      </div>
      <div className="max-w-[900px] mx-auto my-0">
        <div className="flex justify-between items-center">
          <div className="px-2 py-4">
            <div className="flex gap-2 items-center">
              <img src={logo} alt="logo" className="w-8 h-8" />
              <h1 className="font-heading font-bold md:text-xl">
                ChamaDAO Proposals
              </h1>
            </div>
            <p className="text-sm font-body my-4 mx-10 text-gray-400">
              4 Proposals
            </p>
          </div>
          <button className="flex items-center gap-2 bg-secondaryAccent rounded-lg md:py-3 md:px-3 p-2 shadow-lg">
            <FaPlus size={20} className="text-white" />
            <h1 className="font-body font-bold text-white md:text-lg text-sm">
              New Proposal
            </h1>
          </button>
        </div>
        {/* <ProposalTab /> */}
        <h1 className="text-gray-500 font-heading my-4 px-2">All</h1>
        <div>
          {proposals.map((proposal) => {
            const deadline = new Date(proposal.deadline);
            return (
              <div
                key={proposal.id}
                className="hover:shadow-sm hover:shadow-secondaryAccent rounded-md my-4 px-4 py-10 scale-105 transition-all ease-in-out duration-150 mx-2"
              >
                <div className="flex items-center">
                  <img
                    src={proposal.areaAvatar}
                    alt="proposal"
                    className="w-8 h-8 rounded-full object-contain"
                  />
                  <h1 className="font-body text-sm text-gray-500 px-2">
                    ChamaDAO by
                  </h1>
                  <h1 className="font-body text-sm font-bold">
                    {proposal.author}
                  </h1>
                  <button
                    className={`rounded ${
                      proposal.active
                        ? "bg-secondaryAccent/20 text-secondaryAccent border-secondaryAccent"
                        : "bg-red-400 text-black border-red-300"
                    } px-2 py-1.5 text-xs font-body ml-12 border-[1px] `}
                  >
                    {proposal.active ? "Active" : "Closed"}
                  </button>
                </div>
                <div className="h-[.2px] bg-gray-700 w-1/4 my-4"></div>
                <div className="my-2 mx-2">
                  <h1 className="font-heading font-bold py-2">
                    {proposal.title}
                  </h1>
                  <p className="font-body text-sm md:text-basel g:w-3/4">
                    {proposal.desc}
                  </p>
                </div>
                <div className="flex gap-2 items-center mt-8">
                  <h1 className="text-gray-400">{proposal.totalVotes} Votes</h1>
                  <h1 className="text-gray-500 font-body font-bold text-sm">
                    {deadline.toDateString()}
                  </h1>
                </div>
              </div>
            );
          })}
        </div>
      </div>
      <div className="flex justify-center items-center my-4">
        <button className="bg-transparent font-body text-sm md:text-lg rounded-md md:px-4 px-2 py-2 md:mt-8 mt-4 hover:bg-secondaryAccent hover:text-black transition-all ease-in duration-150 border-secondaryAccent border-[1px]">
          Load More
        </button>
      </div>
    </div>
  );
}

export default Proposals;
