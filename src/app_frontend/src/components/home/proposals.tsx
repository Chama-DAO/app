import React from "react";
import { proposals, TProposal } from "../../utils/proposals";

function ProposalCard({ proposal }: { proposal: TProposal }) {
  return (
    <div className="flex md:gap-4 gap-2 my-4 items-center px-2">
      <div className="hidden md:flex items-center justify-center bg-secondaryAccent rounded-full w-10 h-10">
        <img src={proposal.areaAvatar} alt="admin" className="h-8 w-8" />
      </div>
      <div className="flex items-start md:w-24 mx-2">
        <h1 className="font-body text-sm">{proposal.author}</h1>
      </div>
      <div className=" w-80">
        <h1 className="font-body text-sm">{proposal.title}</h1>
      </div>
      <div className="md:flex items-center gap-4 flex-2 hidden justify-between w-56 mx-4">
        <h1 className="font-body text-sm ">{proposal.votesFor}%</h1>
        <h1 className="font-body text-sm ">{proposal.votesAgainst}%</h1>
      </div>
      <div className="md:flex hidden items-center md:w-32 justify-center mx-2">
        <h1 className="font-body text-sm">{proposal.totalVotes}</h1>
      </div>
      <div className="md:flex hidden items-start md:w-56 mx-2">
        <h1 className="font-body text-sm">{proposal.time}</h1>
      </div>
      <div className="">
        <button className="bg-primary font-body font-semibold rounded-md text-white px-4 md:px-12 py-2">
          Vote
        </button>
      </div>
    </div>
  );
}

function Proposals() {
  return (
    <div>
      <h1 className="text-3xl font-heading font-bold px-2 my-2">
        ChamaDAO Proposals
      </h1>
      <div className="flex flex-col md:mx-2 mx-1">
        <div className="flex md:gap-4 gap-2 my-4 items-center px-2">
          <div className="hidden md:flex items-center justify-center w-10 h-10">
            <h1 className="font-heading font-bold text-sm">Avatar</h1>
          </div>
          <div className="flex items-start md:w-24 mx-2">
            <h1 className="font-heading font-bold text-sm">Author</h1>
          </div>
          <div className=" w-80">
            <h1 className="font-heading font-bold text-sm">Title</h1>
          </div>
          <div className="md:flex items-center gap-4 flex-2 hidden justify-between w-56 mx-4">
            <h1 className="font-heading text-sm font-bold">Votes For</h1>
            <h1 className="font-heading text-sm font-bold">Votes Against</h1>
          </div>
          <div className="md:flex hidden items-center md:w-32 justify-center mx-2">
            <h1 className="font-heading font-bold text-sm">Total Votes</h1>
          </div>
          <div className="md:flex hidden items-start md:w-56 mx-2">
            <h1 className="font-heading font-bold text-sm">Date</h1>
          </div>
          <div className="">
            <h1 className="font-heading font-bold text-sm">Vote</h1>
          </div>
        </div>
        {proposals.map((proposal) => (
          <div key={proposal.id}>
            <ProposalCard proposal={proposal} />
          </div>
        ))}
      </div>
    </div>
  );
}

export default Proposals;
