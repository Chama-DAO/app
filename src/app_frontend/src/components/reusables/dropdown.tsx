import React from "react";
import { BsThreeDotsVertical } from "react-icons/bs";

export default function DropDown({ children }: { children: React.ReactNode }) {
  return (
    <details className="dropdown">
      {/* <summary className="btn m-1">
        <BsThreeDotsVertical className="dark:text-white text-black" />
      </summary> */}
      {children}
    </details>
  );
}
