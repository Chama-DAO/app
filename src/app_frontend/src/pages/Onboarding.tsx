import { useEffect, useState } from "react";
import backgroundImage from "../assets/onboarding.gif";
import Auth from "../components/Auth";
import { signIn, authSubscribe, User } from "@junobuild/core";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../assets/logo.png";
import { TOnboarding } from "../utils/types/onboarding";
import Stepper from "../components/Stepper";
import onb1 from "../assets/onb1.svg";
import onb2 from "../assets/onb3.svg";
import { useNavigate } from "react-router-dom";
import Select from "../components/Select";
import { TiTickOutline } from "react-icons/ti";

function Onboarding() {
  type Theme = "dark" | "light";
  const navigate = useNavigate();
  const [authUser, setAuthUser] = useState<Boolean>(false);
  const [userAvailable, setUserAvailable] = useState<User | null>(null);
  const [step, setStep] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>("dark");

  function nextStep() {
    // console.log(step);
    if (step === 3) {
      // console.log(step);
      navigate("/dashboard");
    } else {
      setStep((prev) => prev + 1);
    }
  }
  function prevStep() {
    if (step === 0) {
      return;
    }
    setStep((prev) => prev - 1);
  }

  const onboarding: TOnboarding = [
    {
      id: 1,
      logo: (
        <div className="flex items-center md:mt-4 mt-2 mb-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-primary font-heading font-bold">
            Chama<span className="text-secondaryAccent">DAO</span>
          </h1>
        </div>
      ),
      title: "Create a username",
      progress: (
        <div>
          <h1>Progress</h1>
        </div>
      ),
      content: (
        <div className="flex-col flex">
          <div className="my-8 bg-white rounded-xl border-2 border-black flex items-center justify-center p-1 w-3/4">
            <input
              placeholder="Username"
              className="w-full bg-white focus:outline-none text-black font-body py-2 px-4 rounded-lg"
            />
          </div>
          <div className="md:w-1/2 w-3/4">
            <Select />
          </div>
        </div>
      ),
      sideImage: (
        <div>
          <img src={onb2} alt="onboarding image" />
        </div>
      ),
      alt: "Create you application username. This will be used to identify you in the application and will be used by your chama members to search for you, add you to their chama and send you educational materials.",
    },
    {
      id: 2,
      logo: (
        <div className="flex items-center  md:mt-4 mt-2 mb-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-primary font-heading font-bold">
            Chama<span className="text-secondaryAccent">DAO</span>
          </h1>
        </div>
      ),
      title: "Select app appearance",
      progress: (
        <div>
          <h1>Progress</h1>
        </div>
      ),
      content: (
        <div>
          <div className="flex gap-2 my-4 py-2w-3/4">
            <div
              className="h-28 w-28 bg-black rounded-lg flex items-center justify-center font-body cursor-pointer relative"
              onClick={() => setTheme("dark")}
            >
              Dark
              {
                <div
                  className={`w-4 h-4 rounded-tr-lg rounded-bl-lg absolute top-0 right-0 ${
                    theme === "dark" ? "bg-secondaryAccent" : "bg-black"
                  }`}
                ></div>
              }
            </div>
            <div
              className="h-28 w-28 bg-neutral rounded-lg flex items-center justify-center font-body cursor-pointer relative"
              onClick={() => setTheme("light")}
            >
              Light
              {
                <div
                  className={`w-4 h-4 rounded-tr-lg rounded-bl-lg absolute top-0 right-0 ${
                    theme === "light" ? "bg-secondaryAccent" : "bg-neutral"
                  }`}
                ></div>
              }
            </div>
          </div>
        </div>
      ),
      sideImage: (
        <div className="h-full">
          <img src={onb1} alt="onboarding image" />
        </div>
      ),
      alt: "App appearance",
    },
    {
      id: 3,
      logo: (
        <div className="flex items-center md:mt-4 mt-2 mb-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-primary font-heading font-bold">
            Chama<span className="text-secondaryAccent">DAO</span>
          </h1>
        </div>
      ),
      title: "Role",
      progress: (
        <div>
          <h1>Progress</h1>
        </div>
      ),
      content: (
        <div>
          <h1>Contents</h1>
        </div>
      ),
      sideImage: (
        <div>
          <img src={onb2} alt="onboarding image" />
        </div>
      ),
      alt: "Role",
    },
    {
      id: 4,
      logo: (
        <div className="flex items-center md:mt-4 mt-2 mb-2">
          <img src={logo} alt="logo" className="w-10 h-10" />
          <h1 className="text-primary font-heading font-bold">
            Chama<span className="text-secondaryAccent">DAO</span>
          </h1>
        </div>
      ),
      title: "Finish",
      progress: (
        <div>
          <h1>Progress</h1>
        </div>
      ),
      content: (
        <div>
          <h1>Contents</h1>
        </div>
      ),
      sideImage: (
        <div>
          <img src={onb1} alt="onboarding image" />
        </div>
      ),
      alt: "Finish",
    },
  ];

  const createUser = async () => {
    setAuthUser(true);
    await signIn();
    setAuthUser(false);
  };
  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUserAvailable(user) : null;
      //   console.log("User:", user);
    });
  }, []);

  return (
    <div
      style={{
        backgroundImage: `url(${backgroundImage})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
        height: "100vh",
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
      }}
      className="flex flex-col gap-4 items-center justify-center text-white"
    >
      <h1 className="text-black font-heading text-3xl">User Onboarding</h1>
      <div className="p-4 rounded-md bg-neutral/50 md:w-1/2 w-[85%]">
        {authUser !== false ? (
          <Skeleton
            count={5}
            baseColor="#d3d3d3"
            height={30}
            style={{ padding: 10, margin: 10 }}
          />
        ) : userAvailable === null ? (
          <Auth createUser={createUser} />
        ) : (
          <div>
            <Stepper stepData={onboarding[step]} />
            <div className="p-4 flex gap-2 mt-8">
              <button
                className={`font-body font-semibold text-black rounded-md px-8 py-2 bg-transparent border-2 border-black`}
                onClick={prevStep}
              >
                Back
              </button>
              <button
                className={`font-body font-semibold text-white rounded-md px-8 py-2 bg-black
                }`}
                onClick={nextStep}
              >
                {step === 3 ? "Finish" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

export default Onboarding;
