import React from "react";
import { FaChevronLeft, FaWallet } from "react-icons/fa";
import { SidebarHeader } from "../components/Sidebar";
import { TAccount, userAccounts } from "../utils/userAccounts";
import card1 from "../../public/card.png";
import card2 from "../../public/card2.png";
import card3 from "../../public/card3.png";
import card4 from "../../public/card4.avif";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { Link } from "react-router-dom";
import Transactions from "../components/wallet/transactions";
import { FaCircle } from "react-icons/fa6";
import Chart from "../components/wallet/Chart";

function AccountCard({ account }: { account: TAccount }) {
  let PRICE;
  if (account.token === "ICP") {
    PRICE = 903;
  } else if (account.token === "CMC") {
    PRICE = 12;
  } else {
    PRICE = 129;
  }
  return (
    <div className="w-full rounded-lg my-4 px-4 pt-4 shadow-lg">
      <h1 className="font-heading font-bold text-xl py-2">{account.title}</h1>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-body font-semibold text-lg">
            KES {account.tokens * PRICE}
          </h1>
          <h1 className="font-body ">{account.token}</h1>
          <h1 className="font-body flex gap-2 items-center">
            <span>
              <FaCircle
                size={10}
                className={`${
                  account.active ? "text-secondaryAccent" : "text-gray-300"
                }`}
              />
            </span>
            {account.active ? "Active" : "Activate"}
          </h1>
        </div>
        <div>
          <img
            src={
              account.id === 1
                ? card1
                : account.id === 2
                ? card2
                : account.id === 3
                ? card3
                : card4
            }
            alt="card"
            className="object-contain h-44 w-44 rounded-md"
          />
        </div>
      </div>
    </div>
  );
}

function Wallet() {
  return (
    <div className="px-2 md:px-10">
      <div className="flex items-center md:justify-normal justify-between">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <SidebarHeader title="My Wallet" />
      </div>
      <div className="flex md:flex-row flex-col gap-4 justify-between">
        <div className="flex flex-col md:mx-2 mx-1 md:w-[45%]">
          {userAccounts.map((account) => (
            <AccountCard account={account} key={account.id} />
          ))}
        </div>
        <div className="flex flex-col md:w-[55%] ">
          <div className="md:flex justify-between">
            <div className="bg-secondaryAccent p-4 rounded-lg md:w-1/2 md:h-64 w-full m-1">
              <FaWallet className="text-white" size={24} />
              <h1 className="text-xl font-heading mt-8 text-gray-300">
                Total Balance
              </h1>
              <div className="lg:flex justify-between items-center mt-4 md:mt-10">
                <h1 className="text-3xl font-bold font-body text-white">
                  KES 0
                </h1>
                <p className="text-gray-300 py-2">+0.0%</p>
              </div>
            </div>
            <div className="bg-primary p-4 rounded-lg md:w-1/2 md:h-64 w-full m-1">
              <MdOutlineGeneratingTokens className="text-white" size={24} />
              <h1 className="text-xl font-heading mt-8 text-gray-300">
                Total Spending
              </h1>
              <div className="lg:flex justify-between items-center mt-4 md:mt-10">
                <h1 className="text-3xl font-bold font-body text-white">
                  KES 0
                </h1>
                <p className="text-gray-300 py-2">+0.0%</p>
              </div>
            </div>
          </div>
          <div className="">
            <Chart />
          </div>
        </div>
      </div>
      <Transactions />
    </div>
  );
}

export default Wallet;
