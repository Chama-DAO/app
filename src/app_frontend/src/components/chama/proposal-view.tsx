import { authSubscribe, getDoc, listDocs, setDoc, User } from "@junobuild/core";
import React, { useEffect, useState } from "react";
import { UserData } from "./create-chama";
import { proposals } from "../../utils/proposals";
import { set } from "date-fns";
import toast from "react-hot-toast";

function ProposalView({
  proposal,
  members,
  currentChama,
}: {
  proposal: any;
  members: any[];
  currentChama: any;
}) {
  const [userData, setUserData] = useState<UserData | undefined>();
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [hasVote, setHasVote] = useState(true);

  const voteOnProposal = async () => {
    if (currentUser) {
      setLoading(true);
      try {
        // Fetch current chama data using currentChama.id
        const chamaList = await listDocs({
          collection: "chama",
          filter: {
            matcher: {
              key: currentChama.id,
            },
          },
        });

        // Get the proposals of the current chama
        //@ts-ignore
        const chamaProposals = chamaList?.items[0]?.data.proposals;

        // Find the proposal being voted on
        const proposalBeingVotedOn = chamaProposals.find(
          (p: any) => p.id === proposal.id
        );

        if (!proposalBeingVotedOn) {
          throw new Error("Proposal not found");
        }

        if (proposalBeingVotedOn.voters.includes(currentUser.key)) {
          toast.error("You have already voted");
          setLoading(false);
          return;
        }

        // Update the proposal with the new voters array & increment votesFor
        const updatedProposal = {
          ...proposalBeingVotedOn,
          voters: [...proposalBeingVotedOn.voters, currentUser.key],
          votesFor: proposalBeingVotedOn.votesFor + 1,
          totalVotes: proposalBeingVotedOn.totalVotes + 1,
        };

        // Replace the old proposal with the updated one in the proposals array
        const updatedProposals = chamaProposals.map((p: any) =>
          p.id === proposal.id ? updatedProposal : p
        );

        // Post the new chama data to the db
        const updatedChama = {
          //@ts-ignore
          ...chamaList.items[0].data,
          proposals: updatedProposals,
        };

        // You need to implement the logic to update the chama data in the database
        await setDoc({
          collection: "chama",
          doc: {
            ...chamaList.items[0],
            data: updatedChama,
          },
        });

        console.log(updatedProposal);

        toast.success("Voted successfully");
        setLoading(false);
      } catch (error) {
        toast.error("An error occurred");
        console.log(error);
      } finally {
        setLoading(false);
      }
    }
  };

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

  if (!proposal) {
    return <h1>Nothing to see here</h1>;
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center justify-between">
        <div className="w-3/4">
          <h1 className="font-bold font-heading text-lg">{proposal?.title}</h1>
          <p className="text-xs font-body text-gray-400">
            Proposes a change to chama's {proposal?.area} section
          </p>
        </div>
        <div>
          <h1 className="text-gray-400 text-xs">
            {proposal?.votesFor} approvals
          </h1>
          <h1 className="hover:text-primary text-gray-500 hover:underline font-body font-bold text-xs cursor-pointer">
            {proposal?.author}
          </h1>
        </div>
      </div>
      <div className="h-[.1px] bg-slate-400 w-full max-w-[750px]"></div>
      <div>
        <h1 className="font-heading font-bold py-2">Description</h1>
        <p className="font-body text-sm text-gray-500">{proposal?.desc}</p>
      </div>
      <div className="flex gap-4 mt-4 w-full">
        <button
          className={`bg-primary text-white font-body font-semibold px-4 py-2 rounded-md disabled:opacity-50 disabled:cursor-not-allowed`}
          disabled={
            proposal?.voters.includes(currentUser?.key) || loading
              ? true
              : false
          }
          onClick={voteOnProposal}
        >
          {proposal?.voters.includes(currentUser?.key)
            ? "Already Approved"
            : loading
            ? "Approving..."
            : "Approve"}
        </button>
      </div>
    </div>
  );
}

export default ProposalView;
