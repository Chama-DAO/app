import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";

import React from "react";

export function None() {
  return (
    <div className="flex items-center justify-center w-full h-[100px]">
      <h1 className=" font-heading py-2">Nothing here yet</h1>
    </div>
  );
}

function ChamaTab() {
  const [activeTab, setActiveTab] = React.useState("projects");

  return (
    <Tabs defaultValue="account" className="md:w-[600px] lg:w-[900px]">
      <TabsList className="flex justify-between px-1">
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
          Summary
        </TabsTrigger>
      </TabsList>
      <TabsContent value="projects">
        <None />
      </TabsContent>
      <TabsContent value="members">
        <None />
      </TabsContent>
      <TabsContent value="details">
        <None />
      </TabsContent>
      <TabsContent value="settings">
        <None />
      </TabsContent>
      <TabsContent value="summary">Settings Details here</TabsContent>
    </Tabs>
  );
}

export default ChamaTab;
