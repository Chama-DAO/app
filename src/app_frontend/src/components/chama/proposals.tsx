import React, { useEffect } from "react";
import { proposals, TProposal } from "../../utils/proposals";
import { authSubscribe, listDocs, User } from "@junobuild/core";
import Loader from "../Loader";
import ProposalView from "./proposal-view";

function Proposals({ chama }: any) {
  const chamaID = chama?.id;
  const [currentChama, setCurrentChama] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);
  const [fetchedProposals, setFetchedProposals] = React.useState<any[]>([]);
  const [proposalClicked, setProposalClicked] = React.useState<any>();
  const [currentUser, setCurrentUser] = React.useState<User | undefined>(
    undefined
  );
  const [area, setArea] = React.useState<string>("");
  const [settings, setSettings] = React.useState<string[] | undefined>([]);
  const [selectedSetting, setSelectedSetting] = React.useState<string>("");
  const [proposalDescription, setProposalDescription] =
    React.useState<string>("");

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

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setCurrentUser(user) : null;
    });
  }, []);

  useEffect(() => {
    setFetchedProposals(currentChama?.proposals);
  }, [currentChama]);

  const handleProposalClick = (clickedProposal: TProposal) => {
    setProposalClicked(clickedProposal);
    const dialog = document.getElementById(
      "show_proposal"
    ) as HTMLDialogElement;
    dialog?.showModal();
  };

  const handleAreaChange = (e: any) => {
    setArea(e.target.value);
    switch (e.target.value) {
      case "Finance":
        setSettings([
          "Contribution cycle",
          "Contribution amount",
          "Loan allocations",
          "project allocations",
          "Merry go round allocations",
          "Premium plan",
        ]);
        break;
      case "Meetings":
        setSettings(["Meeting platform", "Meeting cycle"]);
        break;
      case "Other":
        setSettings(["Chama name", "Chama description"]);
        break;
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Loader size="sm" />
      </div>
    );
  }

  return (
    <div className="px-2 md:px-10">
      <div className="max-w-[900px] mx-auto my-0">
        <div className="mb-4">
          {fetchedProposals &&
            fetchedProposals?.map((proposal) => {
              const deadline = new Date(proposal.deadline);
              return (
                <div
                  key={proposal.id}
                  className="hover:shadow-sm hover:shadow-primary rounded-md mb-4 px-4 py-10 scale-105 transition-all ease-in-out duration-150 mx-2 cursor-pointer"
                  onClick={() => handleProposalClick(proposal)}
                >
                  <div className="flex items-center justify-between">
                    <div className="flex items-center">
                      <img
                        src={proposal.areaAvatar}
                        alt="proposal"
                        className="w-8 h-8 rounded-full object-contain"
                      />
                      <h1 className="font-body text-sm text-gray-500 px-2">
                        {proposal.area} by{" "}
                        <span className="font-body text-sm font-bold text-gray-700">
                          {proposal.author}
                        </span>
                      </h1>
                    </div>
                    <button
                      className={`rounded ${
                        proposal.active
                          ? "bg-secondaryAccent/20 text-secondaryAccent border-primary"
                          : "bg-red-400 text-black border-red-300"
                      } px-2 py-1.5 text-xs font-body ml-12 border-[1px] `}
                    >
                      {proposal.active ? "Active" : "Closed"}
                    </button>
                  </div>
                  <div className="h-[.2px] bg-gray-700 w-1/4 my-1"></div>
                  <div className="mx-2">
                    <h1 className="font-heading font-bold py-2">
                      {proposal.title}
                    </h1>
                    <p className="font-body text-sm md:text-basel g:w-3/4">
                      {proposal.desc}
                    </p>
                  </div>
                  <div className="flex gap-2 items-center mt-4 px-2">
                    <h1 className="text-gray-400 text-sm">
                      {proposal.totalVotes} Votes
                    </h1>
                    <h1 className="text-gray-500 font-body font-bold text-xs">
                      {deadline.toDateString()}
                    </h1>
                  </div>
                </div>
              );
            })}
        </div>
      </div>
      <div className="flex justify-between items-center my-4">
        <button
          className="bg-transparent hover:text-white font-body text-sm md:text-lg rounded-md md:px-4 px-2 py-2 md:mt-8 mt-4 hover:bg-primary transition-all ease-in duration-150 border-primary border-[1px]"
          onClick={() => {
            const dialog = document.getElementById(
              "add_proposal"
            ) as HTMLDialogElement;
            dialog?.showModal();
          }}
        >
          Add Proposal
        </button>
        <button className="bg-transparent hover:text-white font-body text-sm md:text-lg rounded-md md:px-4 px-2 py-2 md:mt-8 mt-4 hover:bg-primary transition-all ease-in duration-150 border-primary border-[1px]">
          Load More
        </button>
      </div>
      <dialog id="add_proposal" className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg">Add Proposal</h3>
          <p className="mb-2 text-xs text-gray-400">
            This proposal will be visible to all chama members and will have to
            be by approved by all of them to be applied to your chama.
          </p>
          <div className="h-[.1px] bg-gray-300 w-full"></div>
          <div className="modal-action flex flex-col">
            {/* if there is a button in form, it will close the modal */}
            <div className="w-full flex-col gap-2 mb-2">
              <select
                className="select select-secondary max-w-xs border-primary font-body outline-none mb-4 border-[.1px] md:w-[70%] w-full"
                onChange={(e) => handleAreaChange(e)}
              >
                <option disabled selected className="">
                  Which area do you want to change?
                </option>
                <option>Finance</option>
                <option>Meetings</option>
                <option>Other</option>
              </select>
              <select
                className="select select-secondary max-w-xs font-body outline-none mb-4 border-primary border-[.1px] md:w-[70%] w-full"
                onChange={(e) => {
                  setSelectedSetting(e.target.value);
                }}
              >
                <option disabled selected>
                  What do you want to change?
                </option>
                {settings?.map((setting) => (
                  <option>{setting}</option>
                ))}
              </select>
              <input
                type="text"
                placeholder={`New value for ${selectedSetting}`}
                className="input border-[.1px] input-primary w-full border-primary max-w-xs"
              />
              <textarea
                className="textarea textarea-secondary border-primary border-[.1px] w-full max-w-xs mt-4"
                placeholder="Describe your proposal"
                onChange={(e) => setProposalDescription(e.target.value)}
              ></textarea>
            </div>

            <div className="h-[.1px] bg-gray-300 w-full my-2"></div>
            <p className="mb-2 text-[0.6rem] text-gray-400">
              This proposal seeks to change the {selectedSetting || "..."} of
              your chama. Please ensure that the description is clear and
              concise before submitting.
            </p>

            <button className="btn">Submit</button>
          </div>
        </div>
      </dialog>
      <dialog id="show_proposal" className="modal">
        <div className="modal-box">
          <ProposalView
            proposal={proposalClicked}
            members={currentChama?.members}
            currentChama={currentChama}
          />
          <div className="modal-action">
            <form method="dialog">
              <button className="btn">Close</button>
            </form>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default Proposals;
