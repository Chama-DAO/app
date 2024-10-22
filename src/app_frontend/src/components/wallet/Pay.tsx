import React from "react";
import mpesaLogo from "../../../public/mpesa.png";
import equityLogo from "../../../public/equity1.png";

function Pay() {
  return (
    <div className="mt-8">
      <h1 className="text-2xl font-body font-bold">
        Monthly Chama Contribution
      </h1>
      <div className="flex gap-4 mt-4 justify-between flex-col md:flex-row">
        <div className="flex justify-center items-center rounded-md bg-secondaryAccent w-full md:w-1/2 cursor-pointer">
          <img src={mpesaLogo} alt="Mpesa Logo" className="h-20 w-30" />
        </div>
        <div className="flex justify-center items-center rounded-md bg-gray-500 w-full md:w-1/2 cursor-not-allowed">
          <img src={equityLogo} alt="Mpesa Logo" className="h-20 w-50 " />
          <p className="text-text font-semibold font-body pt-2">Bank Payment</p>
        </div>
      </div>
    </div>
  );
}

export default Pay;
