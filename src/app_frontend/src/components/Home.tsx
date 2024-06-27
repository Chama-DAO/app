import React from "react";
import Header from "./home/header";
import InfoSection from "./home/info-section";

function Home() {
  return (
    <div className="md:flex">
      <div className="md:w-[65%]">
        <Header />
      </div>
      <div className="md:w-[35%]">
        <InfoSection />
      </div>
    </div>
  );
}

export default Home;
