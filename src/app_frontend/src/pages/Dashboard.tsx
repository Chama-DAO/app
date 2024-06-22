import React from "react";
import { signOut } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";

function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(1);

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
      <div className="flex h-screen lg:pl-4">
        <div className="md:flex-3 flex-4">
          <Sidebar
            activeTab={activeTab}
            setActiveTab={setActiveTab}
            leave={leave}
          />
        </div>
        <div className="flex-1">
          <div className="p-4">
            <h1 className="text-2xl font-bold">Dashboard</h1>
            <p>Welcome to your dashboard</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
