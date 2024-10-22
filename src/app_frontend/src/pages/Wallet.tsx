import React, { useEffect, useState } from "react";
import { FaChevronLeft, FaWallet } from "react-icons/fa";
import { SidebarHeader } from "../components/Sidebar";
import { TAccount, userAccounts } from "../utils/userAccounts";
import card1 from "../../public/card.png";
import card2 from "../../public/card2.png";
import card3 from "../../public/card3.png";
import card4 from "../../public/card4.avif";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { Link, useNavigate } from "react-router-dom";
import Transactions from "../components/wallet/transactions";
import { FaCircle } from "react-icons/fa6";
import Chart from "../components/wallet/Chart";
import {
  authSubscribe,
  getDoc,
  listDocs,
  signOut,
  User,
} from "@junobuild/core";
import { Chama, UserData } from "../components/chama/create-chama";
import noUser from "../assets/nouser.png";
import Loader from "../components/Loader";

type TBalances = {
  title: string;
  description: string;
  balance: number;
};
type TChamaBalances = {
  merry_go_round: number;
  project: number;
  loan: number;
};

function AccountCard({ balance }: { balance: TBalances }) {
  return (
    <div className="w-full rounded-lg my-4 px-4 pt-4 shadow-sm">
      <h1 className="font-heading font-bold text-xl py-2">{balance.title}</h1>
      <div className="flex justify-between">
        <div className="flex flex-col gap-4">
          <h1 className="font-body font-semibold text-lg">
            KES {balance.balance}
          </h1>
          <h1 className="font-body text-sm text-gray-500">
            {balance.description}
          </h1>
          <h1
            className={`font-body flex gap-2 items-center ${
              balance.balance > 0 ? "" : "cursor-pointer"
            }`}
          >
            <span>
              <FaCircle
                size={10}
                className={`${
                  balance.balance > 0 ? "text-secondaryAccent" : "text-gray-300"
                }`}
              />
            </span>
            {balance.balance > 0 ? "Active" : "Activate"}
          </h1>
        </div>
        <div>
          <img
            src={
              balance.title === "Loans Fund"
                ? card1
                : balance.title === "Merry-Go-Round"
                ? card2
                : balance.title === "Projects Fund"
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
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [userData, setUserData] = React.useState<UserData | undefined>();
  const [userDoc, setUserDoc] = React.useState<any>();
  const [userChama, setUserChama] = React.useState<Chama | null>(null);
  const [leaving, setLeaving] = useState(false);
  const [balances, setBalances] = useState<TBalances[] | null>(null);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  useEffect(() => {
    authSubscribe((u: User | null) => {
      if (u !== null) {
        const fetchUserData = async (id: string) => {
          setLoading(true);
          try {
            const userDoc = await getDoc({
              collection: "users",
              key: id,
            });
            setUserDoc(userDoc);
            if (userDoc && userDoc.data) {
              const userData = userDoc.data as UserData | undefined;
              setUserData(userData);
              //@ts-ignore
              const chamaID = userData?.chamas[0]?.id;
              if (chamaID) {
                const chamaList = await listDocs({
                  collection: "chama",
                  filter: {
                    matcher: {
                      //@ts-ignore
                      key: chamaID,
                    },
                  },
                });
                //@ts-ignore
                setUserChama(chamaList?.items[0]?.data);
                const balances: TBalances[] = [
                  {
                    title: "Loans Fund",
                    description: "Total Balance",
                    //@ts-ignore
                    balance: chamaList?.items[0]?.data?.accountBalances?.loan,
                  },
                  {
                    title: "Merry-Go-Round",
                    description: "Payouts Balance",

                    balance:
                      //@ts-ignore
                      chamaList?.items[0]?.data?.accountBalances?.project,
                  },
                  {
                    title: "Projects Fund",
                    description: "Projects Balance",

                    balance:
                      //@ts-ignore
                      chamaList?.items[0]?.data?.accountBalances?.project,
                  },
                ];
                setBalances(balances);
              }
            }
            setLoading(false);
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false);
          }
        };
        setCurrentUser(u);
        fetchUserData(u.key);
      } else {
        setCurrentUser(null);
      }
    });
  }, []);

  if (!currentUser) {
    return (
      <div className="flex-col flex items-center justify-center p-4 h-screen">
        <img src={noUser} alt="No user" className="w-1/2 md:w-1/3" />
        <p className="text-gray-500 font-body text-center text-lg">
          You're not logged in😞
        </p>
        <button
          className="bg-primary py-2 px-8 font-body text-white rounded-lg my-4"
          onClick={leave}
        >
          Login
        </button>
      </div>
    );
  }

  if (loading || currentUser === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  return (
    <div className="px-2 md:px-10">
      <div className="flex items-center md:justify-normal justify-between">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <div className="mt-2">
          <SidebarHeader title="My Wallet" />
        </div>
      </div>
      <div className="flex md:flex-row flex-col gap-4 justify-between">
        <div className="flex flex-col md:mx-2 mx-1 md:w-[45%]">
          {balances &&
            balances.map((balance) => (
              <AccountCard balance={balance} key={balance.title} />
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
                  KES{" "}
                  {balances &&
                    balances[0].balance +
                      balances[1].balance +
                      balances[2].balance}
                </h1>
                <p className="text-gray-300 py-2 font-body text-sm">
                  Total funds on {userChama?.name}
                </p>
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
                <p className="text-gray-300 py-2">{userChama?.name} Spending</p>
              </div>
            </div>
          </div>
          <div className="">
            <Chart />
          </div>
        </div>
      </div>
      <Transactions />
      <p className="py-2 italic font-body text-gray-500 text-sm text-center">
        *This page is still in development
      </p>
    </div>
  );
}

export default Wallet;
