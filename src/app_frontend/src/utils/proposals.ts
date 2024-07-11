import adminAvatar from "../assets/admin.png";

export type TProposal = {
  id: number;
  author: string;
  area: string;
  areaAvatar: any;
  title: string;
  desc: string;
  time: string;
  votesFor: number;
  votesAgainst: number;
  deadline: string;
  totalVotes: number;
};

export const proposals: TProposal[] = [
  {
    id: 1,
    author: "Admin",
    area: "E-Learning",
    areaAvatar: adminAvatar,
    title: "More Materials",
    desc: "Proposal to add more materials on the DAO",
    time: "2021-09-01T12:00:00Z",
    votesFor: 0,
    votesAgainst: 0,
    deadline: "2021-10-01T12:00:00Z",
    totalVotes: 0,
  },
  {
    id: 2,
    author: "Admin",
    area: "E-Learning",
    areaAvatar: adminAvatar,
    title: "Points Increment",
    desc: "Proposal to increase number of points awarded on completion of core courses.",
    time: "2021-09-01T12:00:00Z",
    votesFor: 0,
    votesAgainst: 0,
    deadline: "2021-10-01T12:00:00Z",
    totalVotes: 0,
  },
  {
    id: 3,
    author: "Admin",
    area: "ChamaDAO",
    areaAvatar: adminAvatar,
    title: "Dashboard UI Revamp",
    desc: "Proposal to update ChamaDAO dashboard UI design and associated areas",
    time: "2021-09-01T12:00:00Z",
    votesFor: 0,
    votesAgainst: 0,
    deadline: "2021-10-01T12:00:00Z",
    totalVotes: 0,
  },
];
