import React, { useState } from "react";
import { cn } from "../../@/lib/utils";
import Loader from "../components/Loader";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "../../@/components/ui/card";
import { Switch } from "../../@/components/ui/switch";
import {
  authSubscribe,
  getDoc,
  listDocs,
  setDoc,
  signOut,
  User,
} from "@junobuild/core";
import { useEffect } from "react";
import noUser from "../assets/nouser.png";
import { useNavigate, Link } from "react-router-dom";
import { FaChevronLeft } from "react-icons/fa";
import { SidebarHeader } from "../components/Sidebar";
import { UserData } from "../components/chama/create-chama";
import avatar from "../../src/assets/member.png";

type CardProps = React.ComponentProps<typeof Card>;

function Settings({ className, ...props }: CardProps) {
  const navigate = useNavigate();
  const [user, setUser] = React.useState<User | null>(null);
  const [leaving, setLeaving] = React.useState(false);
  const [currentUser, setCurrentUser] = React.useState<UserData | undefined>(
    undefined
  );
  const [loading, setLoading] = React.useState(false);
  const [userDoc, setUserDoc] = useState<any>(undefined);
  const [membershipLength, setMembershipLength] = useState("0");

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setUser(user) : null;
    });
  }, []);

  useEffect(() => {
    const fetchUserData = async (id: string) => {
      try {
        setLoading(true);
        const userDoc = await getDoc({
          collection: "users",
          key: id,
        });
        setUserDoc(userDoc);
        if (userDoc && userDoc.data) {
          const userData = userDoc.data as UserData | undefined;
          setCurrentUser(userData);
        }
      } catch (error) {
        console.error("Error fetching user data:", error);
      } finally {
        setLoading(false);
      }
    };
    if (user) {
      fetchUserData(user.key);
    }
  }, [user]);

  const notifications = [
    {
      title: "My Chama",
      description: currentUser?.chamas[0]?.name,
    },
    {
      title: "Transactions",
      description: currentUser?.transactions?.length,
    },
    {
      title: "Courses enrolled",
      description: currentUser?.courses?.length,
    },
  ];
  const leave = async () => {
    setLeaving(true);
    await signOut();
    navigate("/");
    setLeaving(false);
  };

  if (!user) {
    return (
      <div className="flex-col flex items-center justify-center p-4 h-screen">
        <img src={noUser} alt="No user" className="w-1/2 md:w-1/3" />
        <p className="text-gray-500 font-body text-center text-lg">
          You're not logged in😞
        </p>
        <button
          className="bg-primary py-2 px-8 font-body text-white rounded-lg my-4"
          onClick={leave}
        >
          Login
        </button>
      </div>
    );
  }

  if (loading || currentUser === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader size="lg" />
      </div>
    );
  }
  return (
    <section className="">
      <div className="flex items-center justify-between mx-4">
        <Link to="/dashboard">
          <FaChevronLeft size={24} className="md:mt-2" />
        </Link>
        <div className="mt-2">
          <SidebarHeader title="My Profile" />
        </div>
      </div>
      <div className="flex items-center justify-center h-screen flex-col">
        <Card className={cn("w-[380px]", className)} {...props}>
          <CardHeader>
            <CardTitle>My Profile</CardTitle>
            <CardDescription>
              Manage your profile settings and notifications.
            </CardDescription>
          </CardHeader>
          <CardContent className="grid gap-4">
            <div className=" flex items-center space-x-4 rounded-md border p-4 justify-between w-full bg-secondaryAccent">
              <img
                src={`../..${currentUser?.avatar?.image}` || avatar}
                alt="avatar"
                className="h-8 w-8 rounded-full"
              />
              <div className="flex flex-col gap-2">
                <p className="text-sm font-medium leading-none font-body text-white underline">
                  {currentUser?.username}
                </p>
                <p className="text-xs font-medium leading-none font-body text-white text-wrap w-[80px]">
                  Joined 09/01/2024
                </p>
              </div>
            </div>
            <div>
              {notifications.map((notification, index) => (
                <div
                  key={index}
                  className="mb-4 grid grid-cols-[25px_1fr] items-start pb-4 last:mb-0 last:pb-0"
                >
                  <span className="flex h-2 w-2 translate-y-1 rounded-full bg-sky-500" />
                  <div className="space-y-1">
                    <p className="text-sm font-medium leading-none font-heading">
                      {notification.title}
                    </p>
                    <p className="text-sm text-muted-foreground text-gray-500 font-body">
                      {notification.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </CardContent>
          <CardFooter>
            <button
              className="font-heading font-semibold bg-primary text-white p-2 w-full rounded-md cursor-not-allowed"
              disabled
            >
              More Details
            </button>
          </CardFooter>
        </Card>
      </div>
    </section>
  );
}

export default Settings;
