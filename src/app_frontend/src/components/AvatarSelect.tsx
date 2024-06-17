import React from "react";
import { avatars } from "../utils/avatars";

function Select() {
  return (
    <div>
      <div>
        <label
          htmlFor="HeadlineAct"
          className="block text-sm font-medium text-gray-900 font-body"
        >
          {" "}
          Choose you avatar{" "}
        </label>

        <div className="relative mt-1.5 mb-4">
          <input
            type="text"
            list="HeadlineActArtist"
            id="HeadlineAct"
            className="w-full rounded-lg border-gray-300 pe-10 text-gray-700 sm:text-sm [&::-webkit-calendar-picker-indicator]:opacity-0 py-2 px-6 focus:outline-none"
            placeholder="Please select"
          />

          <span className="absolute inset-y-0 end-0 flex w-8 items-center">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth="1.5"
              stroke="currentColor"
              className="size-5 text-gray-500"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M8.25 15L12 18.75 15.75 15m-7.5-6L12 5.25 15.75 9"
              />
            </svg>
          </span>
        </div>

        <datalist id="HeadlineActArtist">
          {avatars.map((avatar) => (
            <div key={avatar.id}>
              <option value={avatar.name} className="font-body">
                {avatar.name}
                <img src={avatar.image} alt={avatar.name} />
              </option>
            </div>
          ))}
        </datalist>
      </div>
    </div>
  );
}

export default Select;
