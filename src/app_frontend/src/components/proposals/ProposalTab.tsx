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

function ProposalTab() {
  const [activeTab, setActiveTab] = React.useState("all");
  return (
    <Tabs defaultValue="account" className="md:w-[400px] lg:w-[900px]">
      <TabsList className="flex justify-between">
        <TabsTrigger
          value="projects"
          className={`${
            activeTab === "all"
              ? "border-secondaryAccent text-secondaryAccent"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("projects")}
        >
          All
        </TabsTrigger>
        <TabsTrigger
          value="members"
          className={`${
            activeTab === "members"
              ? "border-secondaryAccent text-secondaryAccent"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("members")}
        >
          Treasury
        </TabsTrigger>
        <TabsTrigger
          value="details"
          className={`${
            activeTab === "treasury"
              ? "border-secondaryAccent text-secondaryAccent"
              : "bg-transparent"
          } font-heading font-bold px-4 py-2 border-none rounded-md`}
          onClick={() => setActiveTab("details")}
        >
          Members
        </TabsTrigger>
      </TabsList>
      <TabsContent value="all">
        <None />
      </TabsContent>
      <TabsContent value="treasury">
        <None />
      </TabsContent>
      <TabsContent value="members">
        <None />
      </TabsContent>
      {/* <TabsContent value="settings">Settings Details here</TabsContent> */}
    </Tabs>
  );
}

export default ProposalTab;
