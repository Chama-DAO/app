import { authSubscribe, getDoc, User } from "@junobuild/core";
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";

import React, { useEffect, useState } from "react";
import Members from "./members";
import { UserData } from "./create-chama";
import Projects from "../chama/Projects";

export function None() {
  return (
    <div className="flex items-center justify-center w-full">
      <h1 className=" font-heading py-2">Nothing here yet</h1>
    </div>
  );
}

function ChamaTab() {
  const [activeTab, setActiveTab] = React.useState("projects");
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [userData, setUserData] = useState<UserData | undefined>();
  const [loading, setLoading] = useState(false);

  const fetchUserInfo = async (key: string) => {
    const userDoc = await getDoc({
      collection: "users",
      key: key,
    });
    const userData = userDoc?.data as UserData | undefined;
    return userData;
  };

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setCurrentUser(user) : null;
    });
    const fetchAndSetUserData = async () => {
      if (currentUser) {
        const user = await fetchUserInfo(currentUser.key);
        if (user) {
          setUserData(user);
        }
      }
    };
    fetchAndSetUserData();
  }, [currentUser]);

  return (
    <Tabs defaultValue="projects" className="md:w-[600px] lg:w-[900px]">
      <TabsList className="flex justify-between ">
        <TabsTrigger
          value="projects"
          className={`${
            activeTab === "projects"
              ? "bg-secondaryAccent text-white"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("projects")}
        >
          Projects
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className={`${
            activeTab === "members"
              ? "bg-secondaryAccent text-white"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("members")}
        >
          Members
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className={`${
            activeTab === "details"
              ? "bg-secondaryAccent text-white"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("details")}
        >
          Details
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className={`${
            activeTab === "settings"
              ? "bg-secondaryAccent text-white"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("settings")}
        >
          Settings
        </TabsTrigger>
        <TabsTrigger
          value="settings"
          className={`${
            activeTab === "summary"
              ? "bg-secondaryAccent text-white"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("summary")}
        >
          Notifications
        </TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        {currentUser ? <Projects chamas={userData?.chamas[0]} /> : <None />}
      </TabsContent>
      <TabsContent value="members">
        {currentUser ? <Members chamas={userData?.chamas[0]} /> : <None />}
      </TabsContent>
      <TabsContent value="details">
        <None />
      </TabsContent>
      <TabsContent value="settings">
        <None />
      </TabsContent>
      <TabsContent value="summary">Notifications here</TabsContent>
    </Tabs>
  );
}

export default ChamaTab;
