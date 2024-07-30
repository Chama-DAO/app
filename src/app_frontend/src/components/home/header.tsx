import React, { useEffect, useState } from "react";
import { items } from "../../utils/HeaderItems";
import { IoWalletOutline } from "react-icons/io5";
import { BsThreeDotsVertical } from "react-icons/bs";
import { GrGroup } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { IoCloseSharp } from "react-icons/io5";
import { authSubscribe, User } from "@junobuild/core";
import { useUserStore } from "../../store/userStore";

type TModalType = "wallet" | "chama" | "investment" | "staking" | null;

function Header({ theme: darkMode }: { theme: boolean }) {
  const { user, getUser } = useUserStore((state: any) => ({
    user: state.user,
    getUser: state.getUser,
  }));
  const [currentModal, setCurrentModal] = React.useState<TModalType>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);

  useEffect(() => {
    authSubscribe((user: User | null) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      await getUser(currentUser?.key);
    };
    fetchUser();
  }, [getUser, currentUser?.key]);
  // console.log(user);

  const showModals = (modal: TModalType) => {
    setShowModal(true);
    setCurrentModal(modal);
  };
  const totalBalance =
    user?.data?.userBalance[0]?.balance +
    user?.data?.userBalance[1]?.balance +
    user?.data?.userBalance[2]?.balance;

  return (
    <div
      className={`md:grid flex flex-col items-center md:grid-cols-2 xl:grid-cols-4 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={`rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48 ${
          darkMode ? "dark:bg-[#1D232A]" : "bg-[#fff]"
        }`}
      >
        <div className="flex items-center justify-between px-4 my-4">
          <IoWalletOutline className="text-2xl" />
          <BsThreeDotsVertical
            className="cursor-pointer text-2xl"
            onClick={() => showModals("wallet")}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading md:text-xl px-2 font-bold">
            Ksh. {totalBalance}
          </h1>
          <h2 className="font-body text-sm px-2">
            {(totalBalance * 0.0078)?.toPrecision(3)} ckUSDC
          </h2>
        </div>
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Your account balance
        </p>
        {showModal && currentModal === "wallet" && (
          <div className="absolute top-0 right-0">
            <div
              className={`absolute top-0 right-0  shadow rounded-md mx-1 ${
                darkMode ? "dark:bg-[#1D232A]" : "bg-[#fff]"
              }`}
            >
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[0].content}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48 bg-[#fff]  dark:bg-[#1D232A]">
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
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Manage your Chama on chain.
        </p>
        {showModal && currentModal === "chama" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 bg-white dark:bg-[#1D232A] shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[1].content}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48 bg-[#fff] dark:bg-[#1D232A]">
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
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Provide liquidity and earn.
        </p>
        {showModal && currentModal === "investment" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 bg-white dark:bg-[#1D232A] shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[2].content}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48 bg-[#fff] dark:bg-[#1D232A]">
        <div className="flex items-center justify-between px-4 my-4">
          <MdOutlineGeneratingTokens className="text-2xl" />
          <div onClick={() => showModals("staking")}>
            {" "}
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </div>
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading text-xl px-2 font-bold">
            Ksh. {user?.data?.userBalance[1]?.balance}
          </h1>
          <h2 className="font-body text-sm text-primary px-2">
            {user?.data?.userBalance[2]?.balance?.toPrecision(3)} ckUSDC
          </h2>
        </div>
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Staked balance
        </p>
        {showModal && currentModal === "staking" && (
          <div className="absolute top-0 right-0 bg-white dark:bg-[#1D232A] shadow rounded-md mx-1">
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
