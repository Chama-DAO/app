import { IoWalletOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineGeneratingTokens } from "react-icons/md";

export const items = [
  {
    name: "Wallet",
    icon: IoWalletOutline,
    content: (
      <div>
        <h1>Wallet features</h1>
      </div>
    ),
  },
  {
    name: "My Chama",
    icon: GrGroup,
    content: (
      <div>
        <h1>My Chama features</h1>
      </div>
    ),
  },
  {
    name: "Loans & Savings",
    icon: TbPigMoney,
    content: (
      <div>
        <h1>Loans & Savings features</h1>
      </div>
    ),
  },
  {
    name: "Stake",
    icon: MdOutlineGeneratingTokens,
    content: (
      <div>
        <h1>Staking Report</h1>
      </div>
    ),
  },
];
