import React from "react";
import { signOut } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";

function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(true);
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
          <div className="py-4">
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="py-4 px-1 bg-primary text-neutral font-body"
            >
              Toggle Theme
            </button> */}
            <Home />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
