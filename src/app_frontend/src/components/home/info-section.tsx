import React, { useEffect } from "react";
import ThemeController from "../reusables/themecontroller";
import { FaBell } from "react-icons/fa";
import { TNotifications, notifications } from "../../utils/notifications";
import { FaGear } from "react-icons/fa6";
import { User, authSubscribe, getDoc } from "@junobuild/core";
import { FaAngleDoubleRight } from "react-icons/fa";
import Loader from "../Loader";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";

function InfoSection({
  theme,
  setTheme,
}: {
  theme: boolean;
  setTheme: React.Dispatch<React.SetStateAction<boolean>>;
}) {
  const navigate = useNavigate();
  const [currentTheme, setCurrentTheme] = React.useState<"light" | "dark">(
    "light"
  );
  const [user, setUser] = React.useState<User | null>(null);
  const [avatar, setAvatar] = React.useState<string>("/gamer.png");
  // const [userNotifications, setUserNotifications] = React.useState<
  //   TNotifications[] | []
  // >([]);
  const [currentUser, setCurrentUser] = React.useState<any>(null);
  const [loading, setLoading] = React.useState<boolean>(false);

  useEffect(() => {
    authSubscribe((user: User | null) => {
      if (user) {
        setUser(user);
        const getNotifications = async () => {
          try {
            const userDoc = await getDoc({
              collection: "users",
              key: user.key,
            });
            //@ts-ignore
            setCurrentUser(userDoc?.data);
            //@ts-ignore
            let originalPath = userDoc?.data?.avatar?.image;
            let modifiedPath = originalPath ? originalPath.substring(4) : "";
            let pic = `/src${modifiedPath}`;
            setAvatar(pic);
            // setUserNotifications(userDoc?.data.notifications);
          } catch (error) {
            console.log(error);
          }
        };
        setLoading(true);
        getNotifications();
        setLoading(false);
      }
    });

    if (theme) {
      setCurrentTheme("dark");
    } else {
      setCurrentTheme("light");
    }
  }, [currentTheme, theme]);

  if (loading) {
    return (
      <div className="flex items-center justify-center p-4">
        <Loader size="lg" />
      </div>
    );
  }
  const handleNotificationClick = (title: string) => {
    if (title === "Chama Invite" || "Welcome to your new chama") {
      +navigate("my-chama");
    } else {
      toast.success("Hidden gem");
    }
  };
  return (
    <div className="mx-2 mt-8 md:mt-0 rounded-xl p-1 md:p-2 md:h-screen shadow-xl">
      <div className="flex items-center px-4 my-4 justify-between md:gap-4 lg:gap-8">
        <p className="font-body text-sm text-gray-500 cursor-pointer hover:underline hover:text-primary">
          {currentUser?.username || "User"}
        </p>

        <div className="flex items-center gap-2">
          <img src={avatar} alt="avatar" className="w-8 h-8 rounded-full" />
          {/* <IoIosArrowDown /> */}
        </div>
      </div>
      <div className=" rounded-md p-2 md:p-4 mx-2">
        <h1 className="font-heading font-bold ld:text-xl">Voting Power</h1>
        <p className="font-body text-sm text-gray-500">Current: 0 VP</p>
        <div className="md:my-4 my-2">
          <p className="font-body text-sm text-gray-500">
            Transactions made <span className="text-primary font-bold">0</span>
          </p>
          <progress
            className="progress progress-primary"
            value="0"
            max="100"
          ></progress>
          <p className="font-body text-xs md:text-sm text-gray-500 text-center">
            Approximately 0 days remaining
          </p>
        </div>
        <div className="flex items-center justify-center">
          <button className="w-full md:w-3/4 bg-primary font-body text-center py-2 px-4 rounded-lg text-white my-2 md:my-4">
            Details
          </button>
        </div>
      </div>
      <div className="my-4 md:my-6">
        <h1 className="font-heading font-bold text-lg mt-4 md:mt-8 p-2">
          Notifications
        </h1>
        <div className="flex-col">
          {currentUser?.notifications?.length > 0
            ? currentUser?.notifications?.map(
                (notifications: {
                  id: React.Key | null | undefined;
                  read: any;
                  type: string;
                  title:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                  description: string;
                  time:
                    | string
                    | number
                    | boolean
                    | React.ReactElement<
                        any,
                        string | React.JSXElementConstructor<any>
                      >
                    | Iterable<React.ReactNode>
                    | React.ReactPortal
                    | null
                    | undefined;
                }) => (
                  <div
                    key={notifications.id}
                    className="rounded-md p-2 md:p-4 shadow my-2 md:my-4 hover:scale-95 transition-all duration-100 ease-in cursor-pointer"
                  >
                    <div className="flex items-center gap-2 rounded-md">
                      <div className="flex items-center w-14 h-14 rounded-full justify-center relative">
                        <div
                          className={`w-2 h-2 rounded-full bg-primary top-1 ${
                            notifications.read ? "hidden" : "absolute"
                          } left-1`}
                        ></div>
                        {notifications.type === "system" ? (
                          <FaGear className="text-primary text-xl" />
                        ) : (
                          <FaBell className="text-primary text-xl" />
                        )}
                      </div>
                      <div className="w-[80%]">
                        <h1 className="font-heading font-bold text-sm">
                          {notifications.title}
                        </h1>
                        <h1 className="font-body text-gray-500 text-xs">
                          {notifications.description.substring(0, 200)}
                        </h1>
                        <p className="font-body text-xs text-gray-500 py-2">
                          {notifications.time}
                        </p>
                      </div>
                    </div>
                  </div>
                )
              )
            : notifications?.map((notifications) => (
                <div
                  key={notifications.id}
                  className="rounded-md p-2 md:p-4 shadow-lg my-2 md:my-4 hover:scale-95 transition-all duration-100 ease-in cursor-pointer"
                >
                  <div className="flex items-center gap-2 rounded-md">
                    <div className="flex items-center w-14 h-14 rounded-full justify-center relative">
                      <div
                        className={`w-2 h-2 rounded-full bg-primary top-1 ${
                          notifications.read ? "hidden" : "absolute"
                        } left-1`}
                      ></div>
                      {notifications.type === "system" ? (
                        <FaGear className="text-primary text-xl" />
                      ) : (
                        <FaBell className="text-primary text-xl" />
                      )}
                    </div>
                    <div className="w-[80%]">
                      <h1 className="font-heading font-bold text-sm">
                        {notifications.title}
                      </h1>
                      <h1 className="font-body text-gray-500 text-xs">
                        {notifications.description.substring(0, 200)}
                      </h1>
                      <div className="flex items-center justify-between">
                        <p className="font-body text-xs text-gray-500 py-2">
                          {notifications.time}
                        </p>
                        <button
                          onClick={() =>
                            handleNotificationClick(notifications.title)
                          }
                        >
                          <FaAngleDoubleRight className="text-primary" />
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>
      {/* <div className=" my-2 rounded-xl h-24 mb-4">
        <h1 className="font-heading p-2">Ask AI🤖</h1>
        <div className="flex items-center justify-between p-4 rounded-xl">
          <input
            placeholder="Type a message"
            className="w-3/4 p-2 font-body text-sm rounded-lg dark:text-white focus:outline-none border-none"
          />
          <IoChatboxEllipses className="text-2xl text-black " />
        </div>
      </div> */}
    </div>
  );
}

export default InfoSection;
