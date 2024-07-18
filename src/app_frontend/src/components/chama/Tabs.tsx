import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger,
} from "../../../@/components/ui/tabs";

import React from "react";

function ChamaTab() {
  const [activeTab, setActiveTab] = React.useState("projects");
  return (
    <Tabs defaultValue="account" className="md:w-[400px] lg:w-[600px]">
      <TabsList className="flex justify-between">
        <TabsTrigger
          value="projects"
          className={`${
            activeTab === "projects"
              ? "bg-secondaryAccent text-black"
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
              ? "bg-secondaryAccent text-black"
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
              ? "bg-secondaryAccent text-black"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("details")}
        >
          Financial
        </TabsTrigger>
      </TabsList>
      <TabsContent value="projects">Projects here</TabsContent>
      <TabsContent value="members">Members details here</TabsContent>
      <TabsContent value="details">Financial Details here</TabsContent>
    </Tabs>
  );
}

export default ChamaTab;
