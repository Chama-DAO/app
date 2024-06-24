import React from "react";
import { items } from "../../utils/HeaderItems";
import DropDown from "../reusables/dropdown";
import { IoWalletOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";

type TModalType = "wallet" | "chama" | "investment" | "staking" | null;

function Header() {
  const [currentModal, setCurrentModal] = React.useState<TModalType>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  const showModals = (modal: TModalType) => {
    // console.log(modal);
    setShowModal(true);
    setCurrentModal(modal);
  };

  return (
    <div className="md:grid flex flex-col items-center md:grid-cols-2 xl:grid-cols-4">
      <div className="shadow rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative">
        <div className="flex items-center justify-between px-4 my-4">
          <IoWalletOutline className="text-2xl" />
          <BsThreeDotsVertical
            className="cursor-pointer text-2xl"
            onClick={() => showModals("wallet")}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading md:text-xl px-2 font-bold">Ksh. 0</h1>
          <h2 className="font-body text-sm px-2">0 ChamCoins</h2>
        </div>
        <p className="font-body text-sm text-gray-300 mt-4 w-3/4 p-2">
          Your account balance
        </p>
        {showModal && currentModal === "wallet" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 bg-white shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[0].content}
            </div>
          </div>
        )}
      </div>
      <div className="shadow rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative">
        <div className="flex items-center justify-between px-4 my-4">
          <GrGroup className="text-2xl" />
          <BsThreeDotsVertical
            className="cursor-pointer text-2xl"
            onClick={() => showModals("chama")}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading md:text-xl px-2 font-bold">My Chama</h1>
          <h2 className="font-body text-sm px-2">Create or Join one!</h2>
        </div>
        <p className="font-body text-sm text-gray-300 mt-4 w-3/4 p-2">
          Manage your Chama on chain.
        </p>
        {showModal && currentModal === "chama" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 bg-white shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[1].content}
            </div>
          </div>
        )}
      </div>
      <div className="shadow rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative">
        <div className="flex items-center justify-between px-4 my-4">
          <TbPigMoney className="text-2xl" />
          <BsThreeDotsVertical
            className="cursor-pointer text-2xl"
            onClick={() => showModals("investment")}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading md:text-xl px-2 font-bold">Investment</h1>
          <h2 className="font-body text-sm px-2">Start an investment today</h2>
        </div>
        <p className="font-body text-sm text-gray-300 mt-4 w-3/4 p-2">
          Provide liquidity and earn.
        </p>
        {showModal && currentModal === "investment" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 bg-white shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[2].content}
            </div>
          </div>
        )}
      </div>
      <div className="shadow rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative">
        <div className="flex items-center justify-between px-4 my-4">
          <MdOutlineGeneratingTokens className="text-2xl" />
          <div onClick={() => showModals("staking")}>
            {" "}
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading text-xl px-2 font-bold">Ksh. 0</h1>
          <h2 className="font-body text-sm text-primary px-2">0 ChamCoins</h2>
        </div>
        <p className="font-body text-sm text-gray-300 mt-4 w-1/2 p-2">
          Staked balance
        </p>
        {showModal && currentModal === "staking" && (
          <div className="absolute top-0 right-0 bg-white shadow rounded-md mx-1">
            <div className="p-2">
              <IoCloseSharp onClick={() => setShowModal(false)} />
            </div>
            {items[3].content}
          </div>
        )}
      </div>
    </div>
  );
}

export default Header;
