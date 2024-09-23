import React from "react";

function ProposalView({ proposal }: any) {
  if (!proposal) {
    return <h1>Nothing to see here</h1>;
  }
  return (
    <div>
      <h1>{proposal?.title}</h1>
    </div>
  );
}

export default ProposalView;
