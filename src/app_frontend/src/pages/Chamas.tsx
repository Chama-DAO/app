import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SidebarHeader } from "../components/Sidebar";
import headerImage from "../assets/sns-image.webp";
import ChamaTab, { None } from "../components/chama/Tabs";
import chamaAvatar from "../assets/saccoo.png";
import Transactions from "../components/wallet/transactions";
import { authSubscribe, getDoc, signOut, User } from "@junobuild/core";
import noUser from "../assets/nouser.png";
import CreateChama from "../components/chama/create-chama";
import Loader from "../components/Loader";
import { UserData } from "../components/chama/create-chama";

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
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [leaving, setLeaving] = React.useState(false);
  const [chamaDetails, setChamaDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  useEffect(() => {
    authSubscribe((u: User | null) => {
      if (u) {
        const fetchUserData = async (id: string) => {
          setLoading(true);
          try {
            const userDoc = await getDoc({
              collection: "users",
              key: id,
            });
            if (userDoc && userDoc.data) {
              console.log("User data:", userDoc);
              const userData = userDoc.data as UserData | undefined;
              setChamaDetails(userData?.chamas);
            }
          } catch (error) {
            console.error("Error fetching user data:", error);
          } finally {
            setLoading(false);
          }
        };
        fetchUserData(u.key);
        setCurrentUser(u);
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
          <SidebarHeader title="My Chama" />
        </div>
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
      {chamaDetails.length > 0 ? (
        <div>
          <div className="flex flex-col md:flex-row justify-between mt-10">
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
                  <h1 className="font-bold font-heading">
                    {" "}
                    {chamaDetails[0]?.name}
                  </h1>
                  <h1 className="font-body py-2">
                    Active Members:{" "}
                    <span className="font-body">
                      {" "}
                      {chamaDetails[0]?.members?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Active Projects:{" "}
                    <span className="font-body text-primary">
                      {" "}
                      {chamaDetails[0]?.projects?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Funding Cycle:{" "}
                    <span className="font-body">
                      {chamaDetails[0]?.fundingCycle}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="my-4">
                <h1 className="font-bold font-heading px-2 mt-4 text-xl">
                  About
                </h1>
                <p className="font-body p-2 leading-relaxed text-sm">
                  {chamaDetails[0]?.description}
                </p>
              </div>
            </div>
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
                  <h1 className="font-bold font-heading">
                    {chamaDetails[0]?.name}
                  </h1>
                  <h1 className="font-body py-2">
                    Active Members:{" "}
                    <span className="font-body text-primary font-bold">
                      {chamaDetails[0]?.members?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Active Projects:{" "}
                    <span className="font-body text-primary font-bold">
                      {chamaDetails[0]?.projects?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Funding Cycle:{" "}
                    <span className="font-heading text-primary font-bold">
                      {chamaDetails[0]?.fundingCycle}
                    </span>
                  </h1>
                </div>
              </div>
              <div className="my-4">
                <h1 className="font-bold font-heading px-2 mt-4 text-xl">
                  About
                </h1>
                <p className="font-body p-2 leading-relaxed text-sm">
                  {chamaDetails[0]?.description}
                </p>
              </div>
            </div>
          </div>
          <h1 className="font-heading text-3xl text-center mt-6 mb-4">
            Transactions
          </h1>
          {chamaDetails[0].transactions?.length > 1 ? (
            <Transactions />
          ) : (
            <None />
          )}
        </div>
      ) : (
        <div className="mt-12">
          <None />
          <div className="flex flex-col items-center justify-center mx-2">
            <h1 className="text-lg font-heading">
              You're not part of a chama yet
            </h1>
            <button
              className="font-body bg-primary text-white py-3 px-4 rounded-lg my-12 shadow-md"
              onClick={() =>
                (
                  document?.getElementById("my_modal_3") as HTMLDialogElement
                )?.showModal()
              }
            >
              Create one!
            </button>

            <dialog id="my_modal_3" className="modal">
              <div className="modal-box">
                <form method="dialog">
                  <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                    ✕
                  </button>
                </form>
                <CreateChama />
              </div>
            </dialog>
          </div>
        </div>
      )}
    </div>
  );
}

export default Chamas;
