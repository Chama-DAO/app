import React from "react";
import { signOut } from "@junobuild/core";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  if (leaving) {
    return <div>Signing out...</div>;
  }
  return (
    <div>
      <h1>Dashboard</h1>
      <button onClick={leave} disabled={leaving}>
        Sign Out
      </button>
    </div>
  );
}

export default Dashboard;
