import { useEffect, useState } from "react";
import backgroundImage from "../assets/onboarding.gif";
import Auth from "../components/Auth";
import {
  signIn,
  authSubscribe,
  User,
  setDoc,
  getDoc,
  setManyDocs,
} from "@junobuild/core";
import Skeleton from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import logo from "../assets/logo.png";
import { TOnboarding } from "../utils/types/onboarding";
import Stepper from "../components/Stepper";
import onb1 from "../assets/onb1.svg";
import onb2 from "../assets/onb3.svg";
import { useNavigate } from "react-router-dom";
import useWindowSize from "react-use/lib/useWindowSize";
import CustomDropdown from "../components/CustomDropdown";
import { avatars } from "../utils/avatars";
import { roles } from "../utils/roles";
import Confetti from "react-confetti";
import finish from "../assets/onb3.png";
import { financeTypes } from "../utils/financeTypes";
import toast, { Toaster } from "react-hot-toast";
import Loader from "../components/Loader";

export type TAvatar = {
  id: number;
  name: string;
  image: any;
};

export type TRoles = {
  id: number;
  name: string;
  image: any;
};

export type TFinanceType = {
  id: number;
  name: string;
  image: any;
};

export type Theme = "dark" | "light";
export type UserType = {
  id: string;
  username: string;
  financeType: string;
  theme: string;
  avatar: string;
  role: string;
  isOnboarded: boolean;
  userBalance: number;
  transactions: any[];
  monthlySpend: any[];
  chamas: any[];
  hasCreatedChama: boolean;
  stakingInformation: any;
  notifications: any[];
  courses: any[];
  hasCreatedProposal: boolean;
  proposals: any[];
  votedOnProposal: any[];
  adminChama: any[];
};

function Onboarding() {
  const navigate = useNavigate();
  const { width, height } = useWindowSize();
  const [authUser, setAuthUser] = useState<Boolean>(false);
  const [userAvailable, setUserAvailable] = useState<User | null>(null);
  const [step, setStep] = useState<number>(0);
  const [theme, setTheme] = useState<Theme>("dark");
  const [selectedAvatar, setSelectedAvatar] = useState<TAvatar | null>(null);
  const [selectedRole, setSelectedRole] = useState<TRoles | null>(null);
  const [selectedFinanceType, setSelectedFinanceType] =
    useState<TFinanceType | null>(null);
  const [username, setUsername] = useState<string>("");
  const [savingData, setSavingData] = useState<boolean>(false);
  const [checkUser, setCheckingUser] = useState<boolean>(false);

  function validateForm() {
    switch (step) {
      case 0:
        return username !== "" && selectedFinanceType !== null;
      case 1:
        return selectedAvatar !== null;
      case 2:
        return selectedRole !== null;
      default:
        return true;
    }
  }

  const userBalances = [
    {
      account: "Main",
      balance: 0,
    },
    {
      account: "Staking",
      balance: 0,
    },
    {
      account: "Investment",
      balance: 0,
    },
  ];

  const stakingInformation = {
    amount: 0,
    dateStaked: "",
    votingPower: 0,
    maturityDate: "",
  };

  async function nextStep() {
    if (step === 3) {
      if (userAvailable) {
        const currUser = {
          id: userAvailable.key,
          username,
          financeType: selectedFinanceType,
          theme,
          avatar: selectedAvatar,
          role: selectedRole,
          isOnboarded: true,
          userBalance: userBalances,
          transactions: [],
          monthlySpend: [],
          chamas: [],
          hasCreatedChama: false,
          stakingInformation: stakingInformation,
          notifications: [],
          courses: [],
          hasCreatedProposal: false,
          proposals: [],
          votedOnProposal: [],
          adminChama: [],
        };
        try {
          setSavingData(true);
          localStorage.setItem("user", JSON.stringify(currUser));
          await setDoc({
            collection: "users",
            doc: {
              key: userAvailable.key,
              data: currUser,
              description: currUser.username,
            },
          });
          setSavingData(false);
          toast.success("Profile saved successfully");
          navigate("/dashboard");
        } catch (error) {
          toast.error("An error occurred!");
        }
      } else {
        toast.error("An error occurred");
      }
    } else {
      const checkForm = validateForm();
      if (checkForm) {
        setStep((prev) => prev + 1);
      } else {
        toast.error("Please fill all fields", {
          duration: 4000,
          position: "top-center",
          className: "font-body",
          icon: "❌",
          iconTheme: {
            primary: "#000",
            secondary: "#fff",
          },
          ariaProps: {
            role: "status",
            "aria-live": "polite",
          },
        });
        return;
      }
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
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div className="md:w-1/2 w-3/4">
            <CustomDropdown
              avatars={financeTypes}
              selectedAvatar={selectedFinanceType}
              setSelectedAvatar={setSelectedFinanceType}
              title="What best describes your finance group?"
            />
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
          <div className="flex gap-2 my-4 py-2 md:w-1/2 w-3/4">
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
              className="h-28 w-28 bg-neutral rounded-lg text-black flex items-center justify-center font-body cursor-pointer relative"
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
          <div className="md:w-1/2 w-3/4">
            <CustomDropdown
              avatars={avatars}
              selectedAvatar={selectedAvatar}
              setSelectedAvatar={setSelectedAvatar}
              title="Pick an avatar"
            />
          </div>
        </div>
      ),
      sideImage: (
        <div className="h-full">
          <img src={onb1} alt="onboarding image" />
        </div>
      ),
      alt: "Select app appearance. Choose between light and dark mode. You can also select an avatar that will be used to represent you in the application.",
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
        <div className="flex gap-2 my-4 py-2 w-3/4">
          <CustomDropdown
            avatars={roles}
            selectedAvatar={selectedRole}
            setSelectedAvatar={setSelectedRole}
            title="What will be your community role?"
          />
        </div>
      ),
      sideImage: (
        <div>
          <img src={onb2} alt="onboarding image" />
        </div>
      ),
      alt: "Select your role. Choose between the roles of a member, admin or an investor. This will help us customize in-app features to match your role",
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
      title: "Congratulations you made it!",
      progress: (
        <div>
          <h1>Progress</h1>
        </div>
      ),
      content: (
        <div>
          <Confetti
            width={width}
            height={height}
            recycle={false}
            colors={["#0052cc", "#D3D3D3", "#FFD700", "#28a745"]}
          />
          <img src={finish} alt="finish image" className="object-cover" />
        </div>
      ),
      sideImage: (
        <div>
          <img src={onb1} alt="onboarding image" />
        </div>
      ),
      alt: "You have successfully completed the onboarding process. You can now start using the application. We recommend starting with our Educational center to learn more about who we are, and the features we'll be rolling out.",
    },
  ];

  const createUser = async () => {
    setAuthUser(true);
    await signIn({
      allowPin: true,
    });
    setAuthUser(false);
  };
  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUserAvailable(user) : null;
      //check if user exists in the db
      const checkUser = async () => {
        if (userAvailable) {
          try {
            setCheckingUser(true);
            const currUser = await getDoc({
              collection: "users",
              key: userAvailable?.key,
            });
            currUser ? navigate("/dashboard") : null;
          } catch (error) {
            console.error("Error getting document:", error);
          }
        }
      };
      checkUser();
    });
  }, [authUser, userAvailable]);

  if (savingData) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="sm" />
      </div>
    );
  }
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
      <h1 className="text-black font-heading text-3xl">
        {step >= 2 ? "Almost There.." : "User Onboarding"}
      </h1>
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
                className={`font-body font-semibold text-white rounded-md px-6 py-2 bg-black
                }`}
                onClick={nextStep}
              >
                {step === 3 ? "Finish 🎉" : "Next"}
              </button>
            </div>
          </div>
        )}
      </div>
      <Toaster />
    </div>
  );
}

export default Onboarding;
