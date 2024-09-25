import React, { useEffect, useState } from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "../../../@/components/ui/select";
import { avatars } from "../../utils/avatars";
import { authSubscribe, getDoc, setDoc, User } from "@junobuild/core";
import Loader from "../Loader";
import { Link } from "react-router-dom";
import { v4 as uuidv4 } from "uuid";
import { format } from "date-fns";

interface FinanceType {
  id: number;
  name: string;
  image: string;
}

interface Avatar {
  id: number;
  name: string;
  image: string;
}

interface Role {
  id: number;
  name: string;
  image: string;
}

interface UserBalance {
  account: string;
  balance: number;
}

export interface Chama {
  name: string;
  description: string;
  contributionAmount: string;
  contributionCycle: string;
  customContributionCycle: string;
  type: string;
  accountBalance: number;
  members: any[];
  meetings: any[];
  nextMeeting: string;
  projects: any[];
  transactions: any[];
  avatar: string;
  fundingCycle: string;
  settings: any[];
}

interface StakingInformation {
  amount: number;
  dateStaked: string;
  votingPower: number;
  maturityDate: string;
}

export interface UserData {
  id: string;
  username: string;
  financeType: FinanceType;
  theme: string;
  avatar: Avatar;
  role: Role;
  isOnboarded: boolean;
  userBalance: UserBalance[];
  transactions: any[];
  monthlySpend: any[];
  chamas: Chama[];
  hasCreatedChama: boolean;
  stakingInformation: StakingInformation;
  notifications: any[];
  courses: any[];
  hasCreatedProposal: boolean;
  proposals: any[];
  votedOnProposal: any[];
  adminChama: any[];
  invitedChama: string;
}

const formSchema = zod
  .object({
    name: zod.string().min(5).max(50),
    description: zod.string().min(100).max(450),
    contributionAmount: zod.string().min(1),
    contributionCycle: zod.enum(["weekly", "monthly", "custom"]),
    customContributionCycle: zod.string().optional(),
  })
  .refine(
    (data) => {
      if (data.contributionCycle === "custom") {
        return !!data.customContributionCycle;
      }
      return true;
    },
    {
      message: "Custom contribution cycle is required",
      path: ["customContributionCycle"],
    }
  );

function CreateChama() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(false);
  const [chamaCreatedSuccessfully, setChamaCreatedSuccessfully] =
    useState(false);

  useEffect(() => {
    authSubscribe((user: User | null) => {
      user ? setCurrentUser(user) : null;
    });
  }, []);
  const handleSubmit = async (values: zod.infer<typeof formSchema>) => {
    const chamas = {
      id: uuidv4(),
      ...values,
      type: "⭐️basic",
      accountBalance: 0,
      members: [],
      meetings: [],
      nextMeeting: "",
      projects: [],
      transactions: [],
      avatar: avatars[Math.floor(Math.random() * avatars.length)].image,
      fundingCycle: "Monthly",
      settings: [],
      created: Date.now().toString(),
      notifications: [
        {
          id: Math.floor(Math.random()).toString(),
          title: "Welcome to your new chama",
          type: "chama",
          description: `${values.name} has been created successfully. You can now invite your friends to join.`,
          time: format(new Date(), "EEEE do yyyy ha"),
        },
      ],
      invites: [],
      proposals: [],
      fees: [],
      balances: [],
      payouts: [],
    };
    const chamaCreationNotification = {
      id: Math.random().toString(),
      title: "Chama created successfully",
      type: "chama",
      description: `${values.name} has been created successfully. You can now invite your friends to join.`,
      read: false,
      time: format(new Date(), "EEEE do yyyy ha"),
    };
    try {
      setLoading(true);
      if (currentUser) {
        const userDoc = await getDoc({
          collection: "users",
          key: currentUser.key,
        });
        const userData = userDoc?.data as UserData | undefined;
        const chama = {
          ...chamas,
          members: [userData],
        };
        const newChamas = [...(userData?.chamas ?? []), chama];
        await setDoc({
          collection: "chama",
          doc: {
            key: chamas.id,
            data: chama,
            description: chama.id,
          },
        });
        const newData = {
          ...userData,
          chamas: newChamas,
          hasCreatedChama: true,
          adminChama: [...(userData?.adminChama ?? []), chama],
          notifications: [
            ...(userData?.notifications ?? []),
            chamaCreationNotification,
          ],
        };
        if (userDoc) {
          await setDoc({
            collection: "users",
            doc: {
              ...userDoc,
              data: newData,
            },
          });
        }
      }
      setChamaCreatedSuccessfully(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  const form = useForm<zod.infer<typeof formSchema>>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      name: "",
      description: "",
      contributionAmount: "",
      contributionCycle: "monthly",
      customContributionCycle: "",
    },
  });

  if (loading) {
    return (
      <div className="flex items-center justify-center">
        <Loader size="sm" />
      </div>
    );
  }
  if (chamaCreatedSuccessfully) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-heading text-lg text-center my-4">
          Chama created successfully🎉
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
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(handleSubmit)}
        className="max-w-md w-full flex flex-col gap-4"
      >
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-heading">Chama Name</FormLabel>
                <FormControl>
                  <Input
                    placeholder="What is the name of your chama?"
                    className="font-body text-sm p-2 mt-2 border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs font-body" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="description"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-heading">
                  Chama Description
                </FormLabel>
                <FormControl>
                  <Textarea
                    placeholder="Tell us about your chama."
                    className="font-body text-sm p-2 mt-2 border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs font-body" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="contributionCycle"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-heading">
                  Contribution Cycle
                </FormLabel>
                <Select onValueChange={field.onChange} {...field}>
                  <FormControl>
                    <SelectTrigger className="text-sm text-gray-500 font-body p-2">
                      <SelectValue placeholder="Select contribution cycle" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent className="text-sm text-gray-500 font-body">
                    <SelectItem value="weekly">Weekly</SelectItem>
                    <SelectItem value="monthly">Monthly</SelectItem>
                    <SelectItem value="custom">Custom</SelectItem>
                  </SelectContent>
                </Select>
                <FormMessage className="text-red-500 text-xs font-body" />
              </FormItem>
            );
          }}
        />
        <FormField
          control={form.control}
          name="contributionAmount"
          render={({ field }) => {
            return (
              <FormItem>
                <FormLabel className="font-heading">
                  Contribution Amount
                </FormLabel>
                <FormControl>
                  <Input
                    placeholder="Contribution amount for each cycle in KES"
                    className="font-body text-sm p-4 mt-4 border-gray-500"
                    {...field}
                  />
                </FormControl>
                <FormMessage className="text-red-500 text-xs font-body" />
              </FormItem>
            );
          }}
        />
        <Button
          type="submit"
          className="w-full bg-primary text-white font-body"
        >
          Submit
        </Button>
      </form>
    </Form>
  );
}

export default CreateChama;
