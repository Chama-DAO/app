import React from "react";

function Loader({ size }: { size: string }) {
  return (
    <div>
      <span className={`loading loading-infinity loading-${size}`}></span>
    </div>
  );
}

export default Loader;
