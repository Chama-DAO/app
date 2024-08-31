import React, { useEffect } from "react";
import { authSubscribe, getDoc, setDoc, signOut, User } from "@junobuild/core";
import { useNavigate } from "react-router-dom";
import Loader from "../components/Loader";
import Sidebar from "../components/Sidebar";
import Home from "../components/Home";
import noUser from "../assets/nouser.png";
import { IoMdMenu } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import toast from "react-hot-toast";

function Dashboard() {
  const navigate = useNavigate();
  const [leaving, setLeaving] = React.useState(false);
  const [darkMode, setDarkMode] = React.useState(false);
  const [activeTab, setActiveTab] = React.useState(1);
  const [user, setUser] = React.useState<User | null>(null);
  const [sidebar, setSidebar] = React.useState(false);
  const [loading, setLoading] = React.useState(false);

  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };
  const addUserToGeneralAppData = async () => {
    try {
      setLoading(true);
      const userString = localStorage.getItem("user");
      if (!userString) {
        throw new Error("User not found in localStorage");
      }
      const u = JSON.parse(userString);
      if (user) {
        console.log("fetching all userdocs");
        const allUsersDocs = await getDoc({
          collection: "app",
          key: "allUsers",
        });
        console.log("ssss", allUsersDocs);
        //@ts-ignore
        const allUsers = allUsersDocs?.data.allUsers || [];
        console.log(allUsers);
        const userExists = allUsers.some(
          (existingUser: { id: any }) => existingUser.id === u.id
        );
        if (userExists) {
          setLoading(false);
          toast.error("You're already in the community", {
            duration: 4000,
            icon: "🤔",
            position: "top-center",
            style: {
              fontFamily: "inherit",
            },
          });
          return;
        }
        if (allUsersDocs) {
          console.log("setting doc");
          await setDoc({
            collection: "app",
            doc: {
              ...allUsersDocs!,
              data: {
                allUsers: [...allUsers, u],
              },
            },
          });
        } else {
          await setDoc({
            collection: "app",
            doc: {
              key: "allUsers",
              data: {
                allUsers: [u],
              },
            },
          });
        }
        setLoading(false);
        // toast.success("");
        toast.success("You've been added to the community", {
          duration: 4000,
          position: "top-center",
          style: {
            fontFamily: "inherit",
          },
          className: "",
          icon: "🥳",
          iconTheme: {
            primary: "#0052cc",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUser(user) : null;
    });
    // addUserToGeneralAppData();
  }, []);

  if (leaving || loading) {
    return (
      <div className="flex items-center h-screen justify-center p-4">
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
      <div className="flex items-center justify-between lg:mx-2 mr-2">
        <div
          className="px-2 flex items-center my-4 cursor-pointer transition-all ease-in duration-300"
          onClick={() => setSidebar(!sidebar)}
        >
          {!sidebar ? (
            <IoMdMenu size={44} className=" mx-2" />
          ) : (
            <IoClose size={44} className=" mx-2" />
          )}
          <h1 className="text-3xl font-bold font-heading ">ChamaDAO</h1>
        </div>
        {/* <button
          className="font-body text-xs md:text-sm lg:text-base bg-primary rounded-md text-white py-2 px-2"
          onClick={() => addUserToGeneralAppData()}
        >
          Join the community🥳
        </button> */}
      </div>
      <div className="flex h-screen lg:pl-4">
        <div className="md:flex-3 flex-4 transition-all duration-150 ease-linear">
          {sidebar && (
            <Sidebar
              activeTab={activeTab}
              setActiveTab={setActiveTab}
              leave={leave}
              theme={darkMode}
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
            {/* <BrowserRouter>
            <Routes>

            </Routes>
            </BrowserRouter> */}
            <Home theme={darkMode} setTheme={setDarkMode} />
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
