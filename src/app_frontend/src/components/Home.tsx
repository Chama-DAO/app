import React from "react";
import Header from "./home/header";
import InfoSection from "./home/info-section";
import LearnSummary from "./home/learn-summary";
import Learn from "./home/learn";
import Proposals from "./home/proposals";

function Home({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="md:flex justify-between">
      <div className="md:w-[75%]">
        <Header theme={theme} />
        <Learn />
        <Proposals />
      </div>
      <div className="md:w-[25%]">
        <InfoSection setTheme={setTheme} theme={theme} />
      </div>
    </div>
  );
}

export default Home;
