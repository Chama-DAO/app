import React from "react";
import { useParams, useNavigate, Link } from "react-router-dom";
import learningModules, { TLearningModule } from "../utils/learningModules";
import { Button } from "../../@/components/ui/button";
import { FaChevronLeft } from "react-icons/fa";
import { SidebarHeader } from "../components/Sidebar";
import { set } from "date-fns";

function CourseDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [currentCourse, setCurrentCourse] = React.useState<
    TLearningModule | undefined
  >(undefined);

  const handleNavigate = () => {
    navigate("/dashboard");
  };
  if (id) {
    const course = learningModules.find((course) => course.id === parseInt(id));
    if (!id || !course) {
      return (
        <div className="flex flex-col items-center justify-center h-screen">
          <img src="https://w7.pngwing.com/pngs/658/622/png-transparent-page-not-found-illustration-thumbnail.png" />
          <h1 className="font-body font-semibold">Course not found</h1>
          <Button
            className="text-white font-body mt-4"
            onClick={handleNavigate}
          >
            Back Home
          </Button>
        </div>
      );
    }
  }

  return (
    <div>
      <div className="flex items-center md:justify-normal justify-between">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <div className="mt-2">
          <SidebarHeader title="My Courses" />
        </div>
      </div>
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-heading text-center text-xl p-2 mt-12">
          Course will be available soon
        </h1>
        <Button className="text-white font-body mt-4" onClick={handleNavigate}>
          Back Home
        </Button>
      </div>
    </div>
  );
}

export default CourseDetail;
