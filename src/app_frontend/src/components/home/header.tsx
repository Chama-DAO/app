import React from "react";
import { items } from "../../utils/HeaderItems";

function Header() {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4">
      {items.map((item, index) => (
        <div
          key={index}
          className="dark:bg-bgDark dark:hover:bg-transparent dark:text-neutral flex flex-col items-center justify-center p-4 rounded-md shadow-lg mx-2 bg-white/50 cursor-pointer hover:scale-95 transition-all duration-300 ease-in-out transform hover:bg-opacity-80 hover:bg-white"
        >
          <item.icon className="text-xl" />
          <h1 className="text-xl">{item.name}</h1>
          {item.content}
        </div>
      ))}
    </div>
  );
}

export default Header;
