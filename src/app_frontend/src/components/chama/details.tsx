import React from "react";
import { IoIosCash } from "react-icons/io";

function Details() {
  return (
    <div className="flex flex-col gap-2 items-center md:mt-4">
      <div className="flex items-center justify-between w-full max-w-[600px]">
        <div className="flex items-center gap-2">
          <IoIosCash className="text-lg" />
          <h1 className="font-heading text-lg">Treasury</h1>
        </div>
        <div>
          <h1 className="font-body font-extralight">KES 0</h1>
        </div>
      </div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
    </div>
  );
}

export default Details;
