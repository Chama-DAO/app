import React from "react";
import Header from "./home/header";
import InfoSection from "./home/info-section";
import Learn from "./home/learn";

function Home({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  return (
    <div className="md:flex justify-between">
      <div className="md:w-[65%] lg:w-[75%]">
        <Header theme={theme} />
        <Learn />
        {/* <Proposals /> */}
      </div>
      <div className="md:w-[35%] lg:w-[35%]">
        <InfoSection setTheme={setTheme} theme={theme} />
      </div>
    </div>
  );
}

export default Home;
