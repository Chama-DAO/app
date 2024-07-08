import React from "react";
import Header from "./home/header";
import InfoSection from "./home/info-section";
import LearnSummary from "./home/learn-summary";
import Learn from "./home/learn";
import Proposals from "./home/proposals";

function Home() {
  return (
    <div className="md:flex justify-between">
      <div className="md:w-[75%]">
        <Header />
        <Learn />
        <Proposals />
      </div>
      <div className="md:w-[25%]">
        <InfoSection />
      </div>
    </div>
  );
}

export default Home;
