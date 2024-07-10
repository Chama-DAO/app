import React, { useEffect } from "react";
import { authSubscribe, signOut, User } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import noUser from "../assets/onb1.svg";
import logo from "../assets/logo.png";
function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(1);
  const [user, setUser] = React.useState<User | null>(null);
  const [sidebar, setSidebar] = React.useState(false);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUser(user) : null;
    });
  }, []);

  if (leaving) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader size="lg" />
      </div>
    );
  }
  if (!user) {
    return (
      <div className="flex-col flex items-center justify-center p-4 h-screen">
        <img src={noUser} alt="No user" className="w-1/2 md:w-1/3" />
        <p className="text-gray-500 font-body text-center text-lg">
          You're not logged in😞
        </p>
        <button
          className="bg-primary py-2 px-8 font-body text-white rounded-lg my-4"
          onClick={leave}
        >
          Login
        </button>
      </div>
    );
  }
  return (
    <div className={`${darkMode ? "dark" : ""}`}>
      <div
        className="px-8 flex items-center my-4 cursor-pointer"
        onClick={() => setSidebar(!sidebar)}
      >
        <img src={logo} alt="logo" className="h-12 w-12" />
        <h1 className="text-primary text-xl font-bold font-heading ">
          ChamaDAO
        </h1>
      </div>
      <div className="flex h-screen lg:pl-4">
        <div className="md:flex-3 flex-4 transition-all duration-150 ease-linear">
          {sidebar && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              leave={leave}
            />
          )}
        </div>
        <div className="flex-1">
          <div className="py-4">
            {/* <button
              onClick={() => setDarkMode(!darkMode)}
              className="py-4 px-1 bg-primary text-neutral font-body"
            >
              Toggle Theme
            </button> */}
            <Home theme={darkMode} setTheme={setDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
