import React from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link } from "react-router-dom";
import { SidebarHeader } from "../components/Sidebar";
import headerImage from "../assets/sns-image.webp";
import ChamaTab from "../components/chama/Tabs";
import chamaAvatar from "../assets/saccoo.png";
import Transactions from "../components/wallet/transactions";

function ChamaSummary() {
  return (
    <div className="md:hidden flex flex-col my-8">
      <div className="flex gap-10">
        <div className="flex flex-col items-center">
          <img
            src={chamaAvatar}
            alt="chama-avatar"
            className="h-36 rounded-full"
          />
        </div>
        <div>
          <h1 className="font-bold font-heading">Chama Name</h1>
          <h1 className="font-body py-2">
            Active Members: <span className="font-body">0</span>
          </h1>
          <h1 className="font-body py-2">
            Active Projects: <span className="font-body text-primary">0</span>
          </h1>
          <h1 className="font-body py-2">
            Next Meeting: <span className="font-body">27/06/2024</span>
          </h1>
        </div>
      </div>
      <div className="my-4">
        <h1 className="font-bold font-heading px-2 mt-4 text-xl">About</h1>
        <p className="font-body p-2 leading-relaxed text-sm">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam, at
          aliquid. Explicabo quidem qui, aperiam illum eum itaque culpa quisquam
          cum esse voluptatibus aliquid neque impedit harum reiciendis similique
          quas. Molestias inventore quaerat esse nulla iusto vitae omnis magni
          iste possimus?
        </p>
      </div>
    </div>
  );
}

function Chamas() {
  return (
    <div className="px-2 md:px-10">
      <div className="flex items-center md:justify-normal justify-between">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <SidebarHeader title="My Chama" />
      </div>
      <div className="md:mx-4 mb-4 rounded-md p-2 shadow-xl flex items-center justify-between bg-gradient-to-r from-primary to-primary/40 py-4">
        <div className="md:mx-8 mx:2">
          <h1 className="lg:text-5xl md:text-3xl text-xl font-bold font-heading text-white">
            Let's Build Communities
          </h1>
          <button className="bg-secondaryAccent text-white text-sm md:text-lg rounded-md font-heading font-semibold md:px-4 px-2 py-2 md:mt-8 mt-4 hover:bg-transparent transition-all ease-in duration-150 border-secondaryAccent border-[2px]">
            Dashboard
          </button>
        </div>
        <img
          src={headerImage}
          alt="header-image"
          className="object-contain md:h-44 h-32"
        />
      </div>
      <div>
        <div className="flex flex-col md:flex-row justify-between mt-10">
          <ChamaSummary />
          <ChamaTab />
          <div className="hidden md:flex flex-col my-8 w-[40%]">
            <div className="flex gap-10 w-full">
              <div className="flex flex-col items-center">
                <img
                  src={chamaAvatar}
                  alt="chama-avatar"
                  className="h-36 md:h-28 rounded-full"
                />
              </div>
              <div>
                <h1 className="font-bold font-heading">Chama Name</h1>
                <h1 className="font-body py-2">
                  Active Members:{" "}
                  <span className="font-body text-primary font-bold">0</span>
                </h1>
                <h1 className="font-body py-2">
                  Active Projects:{" "}
                  <span className="font-body text-primary font-bold">0</span>
                </h1>
                <h1 className="font-body py-2">
                  Next Meeting:{" "}
                  <span className="font-heading text-primary font-bold">-</span>
                </h1>
              </div>
            </div>
            <div className="my-4">
              <h1 className="font-bold font-heading px-2 mt-4 text-xl">
                About
              </h1>
              <p className="font-body p-2 leading-relaxed text-sm">
                Lorem ipsum dolor sit amet consectetur adipisicing elit. Ipsam,
                at aliquid. Explicabo quidem qui, aperiam illum eum itaque culpa
                quisquam cum esse voluptatibus aliquid neque impedit harum
                reiciendis similique quas. Molestias inventore quaerat esse
                nulla iusto vitae omnis magni iste possimus?
              </p>
            </div>
          </div>
        </div>
        <Transactions />
      </div>
    </div>
  );
}

export default Chamas;
