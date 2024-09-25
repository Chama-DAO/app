import { authSubscribe, getDoc, User } from "@junobuild/core";
import React, { useEffect, useState } from "react";
import { UserData } from "./create-chama";
import { proposals } from "../../utils/proposals";

function ProposalView({
  proposal,
  members,
}: {
  proposal: any;
  members: any[];
}) {
  const [userData, setUserData] = useState<UserData | undefined>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  const voteOnProposal = async () => {};

  const fetchUserInfo = async (key: string) => {
    const userDoc = await getDoc({
      collection: "users",
      key: key,
    });
    const userData = userDoc?.data as UserData | undefined;
    return userData;
  };

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setCurrentUser(user) : null;
    });
    const fetchAndSetUserData = async () => {
      if (currentUser) {
        const user = await fetchUserInfo(currentUser.key);
        if (user) {
          setUserData(user);
        }
      }
    };
    fetchAndSetUserData();
  }, [currentUser]);

  const hasVoted = currentUser
    ? proposals[3]?.voters?.includes(currentUser.key)
    : true;

  if (!proposal) {
    return <h1>Nothing to see here</h1>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-3/4">
          <h1 className="font-bold font-heading text-lg">{proposal?.title}</h1>
          <p className="text-sm font-body text-gray-500">
            Proposes a change to chama's {proposal?.area} section
          </p>
        </div>
        <div>
          <h1 className="text-gray-400 text-xs">
            {proposal?.votesFor} / {members?.length}
          </h1>
          <h1 className="hover:text-primary text-gray-500 hover:underline font-body font-bold text-xs cursor-pointer">
            {proposal?.author}
          </h1>
        </div>
      </div>
      <div className="h-[1px] bg-slate-400 w-full max-w-[750px] mt-2"></div>
      <div>
        <h1 className="font-heading font-bold py-2">Description</h1>
        <p className="font-body text-sm text-gray-500">{proposal?.desc}</p>
      </div>
      <div className="flex gap-4 mt-4 w-full">
        <button
          className={`bg-primary text-white font-body font-semibold px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={hasVoted}
        >
          Approve
        </button>
      </div>
    </div>
  );
}

export default ProposalView;
