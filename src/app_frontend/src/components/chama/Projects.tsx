import { listDocs } from "@junobuild/core";
import React, { useEffect } from "react";
import { FaPlus, FaWhatsapp } from "react-icons/fa";
import {
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalTrigger,
} from "../../../@/components/ui/animated-modal";
import CreateProject from "./create-project";
import { format } from "date-fns";
import Loader from "../Loader";
import { ProjectModal } from "./project-modal";

function NoProjects({ currentChama }: any) {
  return (
    <div className="flex justify-center items-center w-full py-4">
      <button
        className="bg-primary text-white font-body font-semibold px-4 py-2 rounded-md mt-4 flex items-center justify-between gap-4"
        onClick={() =>
          (
            document?.getElementById("my_modal_3") as HTMLDialogElement
          )?.showModal()
        }
      >
        <h1>Create a project</h1>
        <FaPlus className="inline-block" />
      </button>
      <div className="mt-12">
        <div className="flex flex-col items-center justify-center mx-2">
          <dialog id="my_modal_3" className="modal">
            <div className="modal-box">
              <form method="dialog">
                <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
                  ✕
                </button>
              </form>
              {currentChama && <CreateProject id={currentChama?.id} />}
            </div>
          </dialog>
        </div>
      </div>
    </div>
  );
}

function Projects({ chamas }: any) {
  const chamaID = chamas?.id;
  const [currentChama, setCurrentChama] = React.useState<any>();
  const [loading, setLoading] = React.useState(false);

  useEffect(() => {
    const fetchCurrentChama = async () => {
      setLoading(true);
      try {
        const chamaList = await listDocs({
          collection: "chama",
          filter: {
            matcher: {
              key: chamaID,
            },
          },
        });
        setCurrentChama(chamaList?.items[0]?.data);
        setLoading(false);
      } catch (error) {
        console.log(error);
      }
    };
    fetchCurrentChama();
  }, [chamaID]);
  if (loading) {
    return (
      <div className="flex items-center justify-center mt-12">
        <Loader size="sm" />
      </div>
    );
  }
  console.log(currentChama?.projects);

  return (
    <div className="flex flex-col items-center justify-center mx-2">
      <div className=" w-full">
        {currentChama?.projects.length > 0 ? (
          <div className="w-full">
            {currentChama?.projects.map((project: any, index: number) => (
              <div
                key={index}
                className="w-full"
                onClick={() =>
                  (
                    document?.getElementById("my_modal_3") as HTMLDialogElement
                  )?.showModal()
                }
              >
                <div className="flex-col flex gap-2 px-1 shadow-sm rounded-md md:mx-2 md:px-4 py-8 w-full cursor-pointer hover:scale-95 ease-in-out transition-all duration-150">
                  <p className="text-sm font-body text-gray-500 text-center">
                    {project.approved ? "Approved" : "Pending Review"}
                  </p>
                  <div className="flex justify-between">
                    <div>
                      <h1 className="font-bold font-heading">
                        {project.title}
                      </h1>
                      <h1 className="font-heading text-sm my-2">
                        KES {project.fundsCollected} / KES{" "}
                        {project.fundsAllocated}{" "}
                      </h1>
                    </div>
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <p className="font-heading">
                          {Math.round(project.progress)}% done
                        </p>
                        <FaWhatsapp className="text-green-500" size={22} />
                      </div>
                      <div>
                        {/* <p className="font-body text-sm text-gray-500">Sylus</p> */}
                        <p className="font-body text-sm text-gray-500 my-2">
                          {format(project.date, "EEEE do yyyy")}
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        ) : (
          <NoProjects currentChama={currentChama} />
        )}
      </div>

      <dialog id="my_modal_3" className="modal">
        <div className="modal-box">
          <form method="dialog">
            <button className="btn btn-sm btn-circle btn-ghost absolute right-2 top-2">
              ✕
            </button>
          </form>
          {currentChama?.projects && (
            <ProjectModal
              project={currentChama?.projects[0]}
              chamaID={currentChama?.id}
            />
          )}
        </div>
      </dialog>
    </div>
  );
}

export default Projects;
