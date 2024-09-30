import React, { useEffect } from "react";
import { IoIosCash } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import equity from "../../../public/equity.png";
import equityDark from "../../../public/eqiuity-dark.jpg";
import { listDocs } from "@junobuild/core";
import Loader from "../Loader";
import { formatDistanceToNow } from "date-fns";
import { FaDiagramProject, FaX } from "react-icons/fa6";
import { MdPayment } from "react-icons/md";
import { BsBank2 } from "react-icons/bs";
import { IoIosMore } from "react-icons/io";
import { FaVoteYea } from "react-icons/fa";

function Details({ chamas }: any) {
  const chamaID = chamas?.id;
  const [currentChama, setCurrentChama] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchCurrentChama = async () => {
      setLoading(true);
      try {
        const chamaList = await listDocs({
          collection: "chama",
          filter: {
            matcher: {
              key: chamaID,
            },
          },
        });
        setCurrentChama(chamaList?.items[0]?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentChama();
  }, []);
  let timeDifference = "";

  const createdTimestamp = currentChama?.created;

  if (createdTimestamp) {
    const createdDate = new Date(Number(createdTimestamp));

    if (!isNaN(createdDate.getTime())) {
      timeDifference = formatDistanceToNow(createdDate, { addSuffix: false });
    } else {
      console.error("Invalid created date");
    }
  } else {
    console.error("Created timestamp is undefined or null");
  }

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Loader size="sm" />
      </div>
    );
  }
  console.log(currentChama);

  return (
    <div className="flex flex-col gap-2 my-4 mx-2">
      <div className="flex justify-between items-center w-full mb-4">
        <h1 className="text-xl font-heading font-bold py-2">
          {currentChama?.name}
        </h1>
        <div className="flex flex-col text-xs">
          <p>{timeDifference} old</p>
          <p className="text-primary">{currentChama?.type}</p>
        </div>
      </div>
      <div className="flex flex-col gap-2 items-center md:mt-4">
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Treasury</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo className="cursor-pointer" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <FaDiagramProject className="text-lg" />
            <h1 className="font-body text-lg">Project Allocations</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo className="cursor-pointer" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <MdPayment className="text-lg" />
            <h1 className="font-body text-lg">Total Payouts</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo className="cursor-pointer" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <BsBank2 className="text-lg" />
            <h1 className="font-body text-lg">Banker</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <img src={equityDark} className="w-15 h-10" alt="banker image" />
          </div>
        </div>
        {/* <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Total Fees</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo className="cursor-pointer" />
          </div>
        </div> */}
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <FaVoteYea className="text-lg" />
            <h1 className="font-body text-lg">Proposals Made</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">0</h1>
            <FiInfo className="cursor-pointer" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
      </div>
      <button
        className="bg-primary btn text-white font-body font-semibold hover:text-white px-4 py-2 rounded-md mt-4 flex items-center justify-center gap-1 hover:scale-90 border-primary border-1"
        onClick={() => {
          const dialog = document.getElementById(
            "more_details"
          ) as HTMLDialogElement;
          dialog?.showModal();
        }}
      >
        <h1>More Details</h1>
        <IoIosMore size={22} />
      </button>

      <dialog id="more_details" className="modal">
        <div className="modal-box">
          <div className="flex items-center justify-between">
            <h3 className="font-bold text-lg">{currentChama?.name}</h3>
            <FaX
              className="cursor-pointer"
              onClick={() => {
                const dialog = document.getElementById(
                  "more_details"
                ) as HTMLDialogElement;
                dialog?.close();
              }}
            />
          </div>
          <p className="mb-2 text-xs text-gray-400">
            View more details about this chama
          </p>
          {/* <div className="h-[.1px] bg-slate-400 w-full my-2"></div> */}
          <form method="dialog" className="modal-backdrop">
            <div className="flex-col flex md:flex-row justify-between">
              <div className="flex flex-col gap-2">
                <h1 className="text-primary font-heading underline">Finance</h1>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Contribution Cycle
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    Every {30} days
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Loan contribution allocation
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    {30}%
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Loan interest rate
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    {3}% / month
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Merry go round allocations
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    {20}%
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Premium plan
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    Basic⭐️
                  </p>
                </div>
              </div>
              <div className="h-[.1px] md:h-full md:w-[.1px] bg-slate-400 w-full my-2"></div>
              <div className="flex flex-col gap-2">
                <h1 className="text-primary font-heading underline text-pretty ">
                  Meetings & Others
                </h1>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Meeting cycle
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    Every {14} days
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Meeting platform
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    Zoom
                  </p>
                </div>
                <div className="flex flex-col">
                  <span className="text-sm text-gray-500 font-heading">
                    Maximum proposals
                  </span>
                  <p className="font-semibold text-xs font-body text-gray-400">
                    {3} at a time
                  </p>
                </div>
              </div>
            </div>
          </form>
        </div>
      </dialog>
    </div>
  );
}

export default Details;
