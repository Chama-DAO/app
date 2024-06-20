import React from "react";
import { signOut } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";

function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  if (leaving) {
    return <Loader size="lg" />;
  }
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div className="h-screen dark:bg-black">
        <h1 className="dark:text-white">Dashboard</h1>
        <button
          onClick={leave}
          disabled={leaving}
          className="dark:text-white bg-primary rounded-md"
        >
          Sign Out
        </button>
        <button
          onClick={() => setDarkMode(!darkMode)}
          disabled={leaving}
          className="dark:text-white bg-primary rounded-md"
        >
          Toggle
        </button>
      </div>
    </div>
  );
}

export default Dashboard;
