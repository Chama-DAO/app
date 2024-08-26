import React, { useEffect } from "react";
import avatar from "../../assets/man2.png";
import { FaPlus } from "react-icons/fa";
import { listDocs } from "@junobuild/core";
import Loader from "../Loader";

function Members({ chamas }: any) {
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

  //   console.log(currentChama);

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className="mx-2 md:mx-8 mt-4">
      {currentChama?.members.map((member: any) => {
        let originalPath = member?.avatar?.image;
        let modifiedPath = originalPath ? originalPath.substring(4) : "";
        let pic = `../..${modifiedPath}`;
        return (
          <div key={member.id} className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 py-4">
                <img
                  src={avatar}
                  alt="avatar"
                  className="w-10 h-10 rounded-full"
                />
                <p className="font-heading">{member.username}</p>
              </div>
              <div>
                <p className="font-body text-sm">Joined Monday 22nd August</p>
              </div>
            </div>
            <div className="h-[0.5px] w-full bg-slate-300"></div>
          </div>
        );
      })}

      <div className="flex justify-center items-center w-full py-4">
        <button className="bg-primary text-white font-body font-semibold px-4 py-2 rounded-md mt-4 flex items-center justify-between gap-4">
          <h1>Add Members</h1>
          <FaPlus className="inline-block" />
        </button>
      </div>
    </div>
  );
}

export default Members;
