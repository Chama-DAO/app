import { format, set } from "date-fns";
import { FaWhatsapp } from "react-icons/fa6";
import { Progress } from "../../../@/components/ui/progress";
import { FaClock } from "react-icons/fa";
import { Chama } from "./create-chama";
import { authSubscribe, getDoc, listDocs, setDoc, User } from "@junobuild/core";
import React, { useEffect } from "react";
import Loader from "../Loader";
import { Link } from "react-router-dom";

export function ProjectModal({
  project,
  chamaID,
}: {
  project: any;
  chamaID: string;
}) {
  const formattedFundsCollected = project?.fundsCollected
    ? new Intl.NumberFormat("en-US").format(project.fundsCollected)
    : "";
  const formattedFundsAllocated = project?.fundsAllocated
    ? new Intl.NumberFormat("en-US").format(project.fundsAllocated)
    : "";
  const [user, setUser] = React.useState<User | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [hasApproved, setHasApproved] = React.useState<undefined | boolean>();
  const [approvals, setApprovals] = React.useState([]);

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUser(user) : null;
    });
    const getApprovals = async () => {
      try {
        const chamaList = await listDocs({
          collection: "chama",
          filter: {
            matcher: {
              key: chamaID,
            },
          },
        });
        //@ts-ignore
        const approvers = chamaList?.items[0]?.data?.projects[0]?.approvedBy;
        setApprovals(approvers);
      } catch (error) {
        console.log(error);
      }
    };
    getApprovals();
    if (approvals.length > 0 && user) {
      //@ts-ignore
      const checkApproval = approvals?.includes(user.key);

      setHasApproved(checkApproval);
    }
  }, []);

  const approveProject = async () => {
    if (user && !hasApproved) {
      setLoading(true);
      try {
        const chamaDoc = await getDoc({
          collection: "chama",
          key: chamaID,
        });
        const chamaData = chamaDoc?.data as Chama;
        const newProjects = chamaData.projects.map((proj) => {
          if (proj.title === project.title) {
            return {
              ...proj,
              approved: true,
              approvals: proj.approvals + 1,
              approvedBy: [...proj.approvedBy, user?.key],
            };
          }
          return proj;
        });
        const newChamaData = {
          ...chamaData,
          projects: newProjects,
        };
        if (chamaDoc) {
          await setDoc({
            collection: "chama",
            doc: {
              ...chamaDoc,
              data: newChamaData,
            },
          });
        }
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Loader size="sm" />
      </div>
    );
  }

  if (hasApproved) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-heading text-lg text-center my-4">
          Project approved successfully🎉
        </h1>
        <Link
          to="/dashboard"
          className="bg-primary rounded-md font-body font-semibold px-4 py-2 text-white"
        >
          Home
        </Link>
      </div>
    );
  }
  return (
    <div className="flex flex-col gap-4">
      <div className="py-2 flex justify-between items-center">
        <h1 className="font-heading font-bold text-2xl">{project?.title}</h1>
        <div className="flex flex-col items-center">
          <h1 className="text-sm text-gray-400 font-body">
            {project && format(project?.date, "EEEE do yyyy h a")}
          </h1>
          <h1 className="text-sm text-primary font-body">By Sylus</h1>
        </div>
      </div>
      <div className="mt-2">
        <div className="">
          <h1 className="text-lg font-heading font-semibold py-1">
            Project Details
          </h1>
          <p className="text-gray-600 font-body text-sm leading-relaxed">
            {project?.description}
          </p>
        </div>
        <div className="mt-4 flex justify-between items-center">
          <div>
            <h1 className="text-lg font-heading font-semibold py-1">
              Financial Details
            </h1>
            <p className="text-gray-600 font-body text-sm leading-relaxed my-2">
              KES {formattedFundsAllocated} allocated.
            </p>
            <p className="text-gray-600 font-body text-sm leading-relaxed">
              KES {formattedFundsCollected} collected so far.
            </p>
          </div>
          <div className="mt-10 gap-2">
            <a
              href="#"
              className="flex items-center justify-between text-gray-400 text-sm font-body"
            >
              <FaWhatsapp className="text-green-500 mx-1" size={32} />
              Group Link
            </a>
          </div>
        </div>
      </div>
      <Progress value={Math.round(project?.progress)} className="" />
      <div>
        <h1 className="text-lg font-heading font-semibold py-1">
          Project Status
        </h1>
        <p className="text-gray-600 font-body text-sm leading-relaxed">
          {project?.approvals} / 10 members have approved this project.
        </p>
        <p className="text-gray-600 font-body text-sm leading-relaxed flex items-center">
          {project?.approved ? "Approved" : "Pending Review"}
          <FaClock className="text-gray-500 mx-1" size={16} />
        </p>
      </div>
      <div className="flex justify-between items-center gap-2">
        <button
          className="bg-primary text-sm text-white font-body font-semibold px-4 py-2 rounded-md w-1/2"
          onClick={() =>
            (
              document?.getElementById("my_modal_3") as HTMLDialogElement
            )?.close()
          }
        >
          Close
        </button>
        <button
          className={`text-white text-sm font-body font-semibold px-4 py-2 rounded-md w-1/2 ${
            hasApproved
              ? "bg-secondaryAccent"
              : "bg-gray-300 cursor-not-allowed"
          }`}
          onClick={() => approveProject()}
        >
          {!hasApproved ? "Already approved this" : "Approve"}
        </button>
      </div>
    </div>
  );
}
