import React from "react";
import Header from "./home/header";

function Home() {
  return (
    <div className="md:flex">
      <div className="md:w-3/4">
        <h1>Home</h1>
        <Header />
      </div>
      <div className="md:w-1/4 bg-neutral">
        <h2>Info section</h2>
      </div>
    </div>
  );
}

export default Home;
