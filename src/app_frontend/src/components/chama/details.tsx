import React, { useEffect } from "react";
import { IoIosCash } from "react-icons/io";
import { FiInfo } from "react-icons/fi";
import equity from "../../../public/equity.png";
import { listDocs } from "@junobuild/core";
import Loader from "../Loader";
import { formatDistanceToNow } from "date-fns";

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

  return (
    <div className="flex flex-col gap-2 my-4 mx-2">
      <div className="flex justify-between items-center w-full">
        <h1 className="text-xl font-heading font-bold py-2">
          {currentChama?.name}
        </h1>
        <div className="flex flex-col text-xs">
          <p>{timeDifference} old</p>
          <p>{currentChama?.type}</p>
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
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Project Allocations</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Total Payouts</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Banker</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <img src={equity} className="w-15 h-8" />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Total Fees</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">KES 0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
        <div className="flex items-center justify-between w-full max-w-[750px]">
          <div className="flex items-center gap-2">
            <IoIosCash className="text-lg" />
            <h1 className="font-body text-lg">Proposals Made</h1>
          </div>
          <div className="flex gap-1 items-center justify-center">
            <h1 className="font-body font-light">0</h1>
            <FiInfo />
          </div>
        </div>
        <div className="h-[1px] bg-slate-400 w-full max-w-[750px] my-2"></div>
      </div>
    </div>
  );
}

export default Details;
