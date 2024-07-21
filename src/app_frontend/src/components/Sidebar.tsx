import React from "react";
import logo from "../assets/logo.png";
import {
  FaBell,
  FaBook,
  FaCog,
  FaFileAlt,
  FaHome,
  FaUsers,
  FaWallet,
} from "react-icons/fa";
import { MdGeneratingTokens } from "react-icons/md";
import avatar from "../assets/gamer.png";
import { FaSignOutAlt } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaMessage } from "react-icons/fa6";

type SidebarItemProps = {
  activeTab: number;
  setActiveTab: (tab: number) => void;
  leave: () => void;
  theme: boolean;
};

export function SidebarHeader({
  title,
  theme,
}: {
  title?: string;
  theme?: boolean;
}) {
  return (
    <div className="p-1 pb-2 flex justify-center items-center my-4">
      {title !== "no" ? (
        <img src={logo} alt="logo" className="h-8 w-8" />
      ) : (
        <FaBell className="text-neutral" size={24} />
      )}
      {title && (
        <h1
          className={`${theme ? "" : ""} font-bold
        }`}
        >
          {title}
        </h1>
      )}
    </div>
  );
}

function Sidebar({ activeTab, setActiveTab, leave, theme }: SidebarItemProps) {
  const toggleTabs = (tab: number) => {
    switch (tab) {
      case 1:
        setActiveTab(1);
        break;
      case 2:
        setActiveTab(2);
        break;
      case 3:
        setActiveTab(3);
        break;
      case 4:
        setActiveTab(4);
        break;
      case 5:
        setActiveTab(5);
        break;
      case 6:
        setActiveTab(6);
        break;
      case 7:
        setActiveTab(7);
        break;
      default:
        setActiveTab(1);
        break;
    }
  };
  return (
    <aside className="h-screen md:py-4 py-2 px-1 md:px-4">
      <nav className="h-full flex flex-col bg-primary shadow-lg my-2 mx-1 px-2 rounded-lg items-center">
        <SidebarHeader theme={theme} />
        <ul className="flex flex-col items-center justify-center">
          <li
            className={`flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer`}
            onClick={() => setActiveTab(1)}
          >
            <Link to="/dashboard">
              <FaHome
                className={`${
                  activeTab === 1 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>Home</span>
            </Link>
          </li>
          <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(2)}
          >
            <Link to="/wallet">
              <FaWallet
                className={`${
                  activeTab === 2 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>Wallet</span>
            </Link>
          </li>
          <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(3)}
          >
            <Link to="/my-chama">
              <FaUsers
                className={`${
                  activeTab === 3 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>My Chama</span>
            </Link>
          </li>
          {/* <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(4)}
          >
            <MdGeneratingTokens
              className={`${
                activeTab === 4 ? "text-secondaryAccent" : "text-neutral"
              }`}
              size={24}
            />
            <span className={`text-neutral hidden`}>Stake</span>
          </li> */}
          <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(5)}
          >
            <Link to="/learn">
              <FaBook
                className={`${
                  activeTab === 5 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>Learn</span>
            </Link>
          </li>
          {/* <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(6)}
          >
            <FaBell
              className={`${
                activeTab === 6 ? "text-secondaryAccent" : "text-neutral"
              }`}
              size={24}
            />
            <span className={`text-neutral hidden`}>Notifications</span>
          </li> */}
          <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(7)}
          >
            <Link to="/proposals">
              <FaFileAlt
                className={`${
                  activeTab === 7 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>Proposals</span>
            </Link>
          </li>
          <li
            className="flex items-center justify-center w-full py-2 my-2 transition-all duration-300 ease-in-out cursor-pointer"
            onClick={() => setActiveTab(8)}
          >
            <Link to="/settings">
              <FaMessage
                className={`${
                  activeTab === 8 ? "text-secondaryAccent" : "text-neutral"
                }`}
                size={24}
              />
              <span className={`text-neutral hidden`}>Chat</span>
            </Link>
          </li>
        </ul>
        <button className="mt-8 absolute bottom-20 flex items-center">
          <img src={avatar} alt="avatar" className="h-8 w-8 rounded-full" />
        </button>
        <button
          className="mt-8 absolute bottom-7 flex items-center pl-1"
          onClick={() => leave()}
        >
          <FaSignOutAlt className="text-neutral" size={24} />
          <div className={`text-neutral hidden`}>Sign out</div>
        </button>
      </nav>
    </aside>
  );
}

export default Sidebar;
