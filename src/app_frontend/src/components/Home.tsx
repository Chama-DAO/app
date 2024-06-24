import React from "react";
import Header from "./home/header";

function Home() {
  return (
    <div className="md:flex">
      <div className="md:w-[65%]">
        <Header />
      </div>
      <div className="md:w-[35%] bg-neutral">
        <h2>Info section</h2>
      </div>
    </div>
  );
}

export default Home;
