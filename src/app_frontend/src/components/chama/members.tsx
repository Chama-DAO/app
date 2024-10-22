import React, { useEffect } from "react";
import avatar from "../../assets/man.png";
import { listDocs } from "@junobuild/core";
import Loader from "../Loader";
import AddMemberModal from "./add-member";
import { FaCircle, FaPlus } from "react-icons/fa";
import { None } from "./Tabs";

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
        let pic = `/src${modifiedPath}`;
        return (
          <div key={member.id} className="">
            <div className="flex justify-between items-center">
              <div className="flex items-center gap-2 py-4">
                <img
                  src={pic || avatar}
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
        {/* @ts-ignore */}
        <button
          className="bg-primary btn text-white font-body font-semibold px-4 py-2 rounded-md mt-4 flex items-center justify-between gap-4 hover:text-black"
          onClick={() => {
            const dialog = document.getElementById(
              "add_member"
            ) as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          <h1>Add Members</h1>
          <FaPlus />
        </button>
      </div>
      <div className="bg-gray-400 w-full h-[0.5px]"></div>
      <h1 className="font-heading text-lg mt-4 text-center">Invitees</h1>
      {currentChama?.invites?.length > 0 ? (
        currentChama?.invites.map((id: string) => (
          <div key={id} className="">
            <div className="flex gap-2 items-center my-2">
              <FaCircle className="text-gray-400" size={11} />
              <div>
                <p className="font-body text-sm text-gray-400">
                  {id.substring(0, 25)}..
                </p>
              </div>
            </div>
            <div className="h-[0.5px] w-full bg-slate-300"></div>
          </div>
        ))
      ) : (
        <None />
      )}
      <AddMemberModal currentChama={currentChama} />
    </div>
  );
}

export default Members;
