import React, { useEffect, useState } from "react";
import { FaChevronLeft } from "react-icons/fa";
import { Link, useNavigate } from "react-router-dom";
import { SidebarHeader } from "../components/Sidebar";
import headerImage from "../assets/sns-image.webp";
import ChamaTab, { None } from "../components/chama/Tabs";
import chamaAvatar from "../assets/saccoo.png";
import Transactions from "../components/wallet/transactions";
import {
  authSubscribe,
  getDoc,
  listDocs,
  setManyDocs,
  signOut,
  User,
} from "@junobuild/core";
import noUser from "../assets/nouser.png";
import CreateChama from "../components/chama/create-chama";
import Loader from "../components/Loader";
import { UserData } from "../components/chama/create-chama";
import invite from "../../public/invite.gif";
import { format, set } from "date-fns";
import toast from "react-hot-toast";

function Chamas() {
  const navigate = useNavigate();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | undefined>(undefined);
  const [userDoc, setUserDoc] = useState<any>(undefined);
  const [leaving, setLeaving] = React.useState(false);
  const [chamaDetails, setChamaDetails] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [isInvited, setIsInvited] = useState(false);
  const [invitedChama, setInvitedChama] = useState<any>(null);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  const goHome = async () => {
    setLeaving(true);
    await signOut();
    navigate("/dashboard");
    setLeaving(false);
  };

  const joinChama = async () => {
    setLoading(true);
    //check if users is already part of a chama
    try {
      const isInChama = userData?.chamas?.length === 0 ? false : true;
      // const isInvited = userData?.invitedChama === "" ? false : true;
      if (isInChama) {
        setLoading(false);
        toast.error("You're already part of a chama or have an invite");
        return;
      }
      if (invitedChama && userDoc) {
        const chamaID = invitedChama.key;
        const userID = userDoc.key;

        //add user to the members property of that chama,
        const updatedChama = {
          ...invitedChama.data,
          members: [...invitedChama.data.members, userDoc.data],
          invites: invitedChama.data.invites.filter(
            (id: string) => id !== userID
          ),
        };
        //update users chama property
        const updatedUser = {
          ...userDoc.data,
          notifications: [
            ...userDoc.data.notifications,
            {
              id: 1,
              title: "Welcome to the chama",
              type: "invite",
              description: `You have successfully joined ${invitedChama.data.name}.`,
              read: false,
              time: format(new Date(), "EEEE do yyyy ha"),
            },
          ],
          chamas: [...userDoc.data.chamas, invitedChama.data],
        };

        const chamaUpdate = {
          collection: "chama",
          doc: {
            ...invitedChama,
            data: updatedChama,
          },
        };

        const userUpdate = {
          collection: "users",
          doc: {
            ...userDoc,
            data: updatedUser,
          },
        };

        const docs = await setManyDocs({ docs: [chamaUpdate, userUpdate] });
        if (docs) {
          toast.success("You have successfully joined the chama");
          window.location.reload();
        }
      }
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
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
            setUserDoc(userDoc);
            if (userDoc && userDoc.data) {
              const userData = userDoc.data as UserData | undefined;
              setUserData(userData);
              //@ts-ignore
              const userInvited = userData?.invitedChama === "" ? false : true;
              setIsInvited(userInvited);
              setChamaDetails(userData?.chamas);
              if (true) {
                const chamaList = await listDocs({
                  collection: "chama",
                  filter: {
                    matcher: {
                      //@ts-ignore
                      key: userData?.invitedChama,
                    },
                  },
                });

                setInvitedChama(chamaList.items[0]);
              }
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
    <div className="px-1 md:px-10">
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
        <div className="">
          <div className="flex flex-col md:flex-row justify-between mt-10 ">
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
                    {invitedChama?.data?.name}
                  </h1>
                  <h1 className="font-body py-2">
                    Active Members:{" "}
                    <span className="font-body">
                      {" "}
                      {invitedChama?.data?.members?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Active Projects:{" "}
                    <span className="font-body text-primary">
                      {" "}
                      {invitedChama?.data?.projects?.length}
                    </span>
                  </h1>
                  <h1 className="font-body py-2">
                    Funding Cycle:{" "}
                    <span className="font-body">
                      {invitedChama?.data?.fundingCycle}
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
          <h1 className="font-heading text-3xl text-center mt-12 mb-4">
            Transactions
          </h1>
          {chamaDetails[0].transactions?.length > 1 ? (
            <Transactions />
          ) : (
            <None />
          )}
        </div>
      ) : isInvited ? (
        <div className="flex flex-col items-center mx-2">
          <div className="flex flex-col items-center mt-4 shadow-lg lg:w-1/2 rounded-md">
            <img src={invite} alt="invite" className="w-1/2" />
            <h1 className="text-lg font-heading flex items-center">
              <span className="font-heading text-lg">
                You have a chama invite
              </span>
            </h1>
            <div>
              <p className="font-body text-center">
                You have been invited to join the {invitedChama?.data?.name}{" "}
                chama.
              </p>
            </div>
            <div className="flex lg:w-1/2 items-center gap-2 lg:gap-0 lg:justify-between">
              <button
                className="font-body bg-primary text-white py-3 px-4 rounded-lg my-12 shadow-md"
                onClick={() => joinChama()}
              >
                Accept Invite
              </button>
              <button
                className="font-body bg-gray-300 text-primary py-3 px-4 rounded-lg my-12 shadow-md"
                onClick={() => goHome()}
              >
                Maybe Later
              </button>
            </div>
          </div>
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
