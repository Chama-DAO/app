import React from "react";
import { IoChatboxEllipses } from "react-icons/io5";
import ThemeController from "../reusables/themecontroller";
import { FaBell } from "react-icons/fa";
import { IoIosArrowDown } from "react-icons/io";
import avatar from "../../assets/gamer.png";
import { notifications } from "../../utils/notifications";
import { FaGear } from "react-icons/fa6";
<FaGear />;

function InfoSection() {
  return (
    <div className="mx-2 mt-8 md:mt-0 bg-[#F9F8FB] rounded-xl p-1 md:p-2">
      <div className="flex items-center md:justify-center px-4 my-4 justify-between md:gap-4 lg:gap-8">
        <ThemeController theme="light" />

        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          <IoIosArrowDown />
        </div>
      </div>
      <div className="bg-white rounded-md p-2 md:p-4 mx-2">
        <h1 className="font-heading font-bold ld:text-xl">Voting Power</h1>
        <p className="font-body text-sm text-gray-500">Current: 0 VP</p>
        <div className="md:my-4 my-2">
          <p className="font-heading font-bold text-sm text-gray-500">
            Next reward
          </p>
          <p className="font-body text-sm text-gray-500">
            Expected VP increase:{" "}
            <span className="text-primary font-bold">0 VP</span>
          </p>
          <progress
            className="progress progress-primary"
            value="0"
            max="100"
          ></progress>
          <p className="font-body text-xs md:text-sm text-gray-300 text-center">
            Approximately 0 days remaining
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button className="w-full md:w-3/4 bg-primary font-body text-center py-2 px-4 rounded-lg text-white my-2 md:my-4">
            Details
          </button>
        </div>
      </div>
      <div className="my-4 md:my-6">
        <h1 className="font-heading font-bold text-lg mt-4 md:mt-8 p-2">
          Notifications
        </h1>
        <div className="flex-col">
          {notifications.map((notifications) => (
            <div key={notifications.id} className="rounded-md p-2 md:p-4">
              <div className="flex items-center gap-2 rounded-md">
                <div className="flex items-center w-16 h-16 rounded-full bg-[#e3e5f5] justify-center">
                  {notifications.type === "system" ? (
                    <FaGear className="text-primary text-2xl" />
                  ) : (
                    <FaBell className="text-primary text-2xl" />
                  )}
                </div>
                <div className="w-[80%]">
                  <h1 className="font-heading font-bold text-sm">
                    {notifications.title}
                  </h1>
                  <h1 className="font-body text-gray-500 text-xs">
                    {notifications.description.substring(0, 50)}
                  </h1>
                  <p className="font-body text-sm text-gray-500 py-2">
                    {notifications.time.substring(0, 10)}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

export default InfoSection;