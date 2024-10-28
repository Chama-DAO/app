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
import { useNavigate } from "react-router-dom";
import { FaBook } from "react-icons/fa";

type TModalType = "wallet" | "chama" | "investment" | "staking" | null;
type TBalances = {
  account: string;
  balance: number;
};

function Header({ theme: darkMode }: { theme: boolean }) {
  const navigate = useNavigate();
  const { user, getUser } = useUserStore((state: any) => ({
    user: state.user,
    getUser: state.getUser,
  }));
  // console.log(user);
  const [currentModal, setCurrentModal] = React.useState<TModalType>(null);
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [showModal, setShowModal] = React.useState<boolean>(false);
  const [balances, setBalances] = useState<TBalances[] | null>(null);

  useEffect(() => {
    authSubscribe((user: User | null) => {
      if (user) {
        setCurrentUser(user);
      }
    });
  }, []);

  useEffect(() => {
    const fetchUser = async () => {
      if (currentUser && currentUser.key) {
        try {
          await getUser(currentUser.key);
        } catch (error) {
          console.error("Error fetching user:", error);
        }
      } else {
        console.warn("currentUser or currentUser.key is undefined");
      }
    };
    fetchUser();
  }, [currentUser, getUser]);
  // console.log(user);
  // console.log(user.data.chamas);

  useEffect(() => {
    if (user && user.data) {
      setBalances(user.data.userBalance);
    }
  }, [user]);

  const showModals = (modal: TModalType) => {
    setShowModal(true);
    setCurrentModal(modal);
  };

  const handleNavigation = (route: string) => {
    navigate(route);
  };

  return (
    <div
      className={`md:grid flex flex-col items-center md:grid-cols-2 xl:grid-cols-4 ${
        darkMode ? "dark" : ""
      }`}
    >
      <div
        className={`rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48`}
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
            Ksh. {balances ? balances[0].balance : 0}
          </h1>
          <h2 className="font-body text-sm px-2">
            {" "}
            {balances ? balances[0].balance * 130 : 0} ckUSDC
          </h2>
        </div>
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Total Chama Balance
        </p>
        {showModal && currentModal === "wallet" && (
          <div className="absolute top-0 right-0">
            <div className={`absolute top-0 right-0  shadow rounded-md mx-1`}>
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[0].content}
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => handleNavigation("/my-chama")}
        className="rounded-xl cursor-pointer py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48"
      >
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
            <div className="absolute top-0 right-0 shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[1].content}
            </div>
          </div>
        )}
      </div>
      <div
        onClick={() => handleNavigation("/learn")}
        className="cursor-pointer rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48"
      >
        <div className="flex items-center justify-between px-4 my-4">
          <FaBook className="text-2xl" />
          <BsThreeDotsVertical
            className="cursor-pointer text-2xl"
            onClick={() => showModals("investment")}
          />
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading md:text-xl px-2 font-bold">
            My Learning
          </h1>
          <h2 className="font-body text-sm px-2">
            Learn to use ChamaDAO today
          </h2>
        </div>
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Use our learning resources to get started.
        </p>
        {showModal && currentModal === "investment" && (
          <div className="absolute top-0 right-0">
            <div className="absolute top-0 right-0 shadow rounded-md mx-1">
              <div className="p-2">
                <IoCloseSharp onClick={() => setShowModal(false)} />
              </div>
              {items[2].content}
            </div>
          </div>
        )}
      </div>
      <div className="rounded-xl py-2 ease-in-out duration-150 transition-all lg:w-56 md:w-44 w-3/4 m-2 relative h-48">
        <div className="flex items-center justify-between px-4 my-4">
          <MdOutlineGeneratingTokens className="text-2xl" />
          {/* <div onClick={() => showModals("staking")}>
            {" "}
            <BsThreeDotsVertical className="cursor-pointer text-2xl" />
          </div> */}
        </div>
        <div className="flex flex-col">
          <h1 className="font-heading text-xl px-2 font-bold">
            Ksh. {balances ? balances[1].balance : 0}
          </h1>
          <h2 className="font-body text-sm text-primary px-2">
            {balances ? balances[0].balance * 130 : 0} ckUSDC
          </h2>
        </div>
        <p className="font-body text-sm text-gray-500 mt-4 w-3/4 p-2">
          Staked balance
        </p>
        {/* {showModal && currentModal === "staking" && (
          <div className="absolute top-0 right-0 bg-white dark:bg-[#1D232A] shadow rounded-md mx-1">
            <div className="p-2">
              <IoCloseSharp onClick={() => setShowModal(false)} />
            </div>
            {items[3].content}
          </div>
        )} */}
      </div>
    </div>
  );
}

export default Header;
