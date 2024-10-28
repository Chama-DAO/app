import { IoWalletOutline } from "react-icons/io5";
import { GrGroup } from "react-icons/gr";
import { TbPigMoney } from "react-icons/tb";
import { MdOutlineGeneratingTokens } from "react-icons/md";
import { FaBook, FaPlus } from "react-icons/fa";
import { MdOutlineJoinRight } from "react-icons/md";
import { CgDetailsMore } from "react-icons/cg";

export const items = [
  {
    name: "Wallet",
    icon: IoWalletOutline,
    content: (
      <ul className="menu dropdown-content bg-base-100 rounded-box w-36 p-2">
        <li className="font-body text-sm cursor-pointer">
          <CgDetailsMore />
          Account details
        </li>
        <li className="font-body text-sm cursor-pointer">
          <IoWalletOutline />
          Connect Wallet
        </li>
        <li className="font-body text-sm cursor-pointer">
          <MdOutlineGeneratingTokens />
          Buy Tokens
        </li>
      </ul>
    ),
  },
  {
    name: "My Chama",
    icon: GrGroup,
    content: (
      <ul className="menu dropdown-content bg-base-100 rounded-box w-36 p-2">
        <li className="font-body text-sm cursor-pointer">
          <FaPlus />
          Create a Chama
        </li>
        <li className="font-body text-sm cursor-pointer">
          <MdOutlineJoinRight />
          Join a Chama
        </li>
        <li className="font-body text-sm cursor-pointer">
          <FaBook />
          Learn
        </li>
      </ul>
    ),
  },
  {
    name: "My Learning",
    icon: TbPigMoney,
    content: (
      <ul className="menu dropdown-content bg-base-100 rounded-box w-36 p-2 ">
        <li className="font-body text-sm cursor-pointer">
          <CgDetailsMore />
          View Summary
        </li>
        <li className="font-body text-sm cursor-pointer">
          <MdOutlineJoinRight />
          My Courses
        </li>
        <li className="font-body text-sm cursor-pointer">
          <FaBook />
          Learn
        </li>
      </ul>
    ),
  },
  {
    name: "Stake",
    icon: MdOutlineGeneratingTokens,
    content: (
      <ul className="menu dropdown-content bg-base-100 rounded-box w-36">
        <li className="font-body text-sm cursor-pointer">
          <CgDetailsMore />
          ..soon
        </li>
        <li className="font-body text-sm cursor-pointer">
          <MdOutlineGeneratingTokens />
          Stake Tokens
        </li>
        <li className="font-body text-sm cursor-pointer">
          <FaBook />
          Learn
        </li>
      </ul>
    ),
  },
];
