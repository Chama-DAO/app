import React from "react";
import LearningPaths from "./learning-paths";

function LearnSummary() {
  return (
    <div className="flex justify-between">
      <div className="md:w-[35%]">
        <div>
          <h1>3</h1>
          <p>Learning Paths</p>
        </div>
        <div>
          <h1>0</h1>
          <p>Points Earned</p>
        </div>
      </div>
      <div>
        <LearningPaths />
      </div>
    </div>
  );
}

export default LearnSummary;
