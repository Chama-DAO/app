export const userAccounts = [
  {
    id: 1,
    title: "Main",
    tokens: 0,
    token: "ICP",
    active: true,
  },
  {
    id: 2,
    title: "Staking",
    tokens: 0,
    token: "CMC",
    active: true,
  },
  {
    id: 3,
    title: "Invetsment",
    tokens: 0,
    token: "CMC",
    active: true,
  },
];

export type TAccount = {
  id: number;
  title: string;
  tokens: number;
  token: string;
  active: boolean;
};
