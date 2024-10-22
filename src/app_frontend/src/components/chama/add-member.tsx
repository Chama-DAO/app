import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import toast from "react-hot-toast";
import { Button } from "../../../@/components/ui/button";
import done from "../../../public/done.gif";

import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { Input } from "../../../@/components/ui/input";
import React from "react";
import { getDoc, listDocs, setDoc } from "@junobuild/core";
import Loader from "../Loader";
import { format, set } from "date-fns";

const FormSchema = z.object({
  username: z.string().min(2, {
    message: "Username must be at least 2 characters.",
  }),
  key: z.string().min(60, {
    message: "User ID must be at least 60 characters.",
  }),
});

function AddMemberModal({ currentChama }: { currentChama: any }) {
  const form = useForm<z.infer<typeof FormSchema>>({
    resolver: zodResolver(FormSchema),
    defaultValues: {
      username: "",
      key: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [memberAdded, setMemberAdded] = React.useState(false);
  const [memberToAdd, setMemberToAdd] = React.useState<any>();

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //setLoading to true
    //check if user exist in juno db
    //Push a notification about the invite
    //setLoading to false, and memberAdded to true
    //Inform the admin that the invite has been sent
    //If user doesn't exist, setLoading to false, & ask admin to try again

    try {
      setLoading(true);
      const userExists = currentChama?.members?.some(
        (existingUser: { id: any }) => existingUser.id === data.key
      );
      const isInvited = currentChama?.invites?.some(
        (invite: string) => invite === data.key
      );

      if (userExists || isInvited) {
        setLoading(false);
        toast.error("User already in Chama or Invited already", {
          duration: 4000,
          icon: "🤔",
          position: "top-center",
          style: {
            fontFamily: "inherit",
            zIndex: 10,
          },
        });
        return;
      }
      const userDoc: any = await listDocs({
        collection: "users",
        filter: {
          matcher: {
            key: data.key,
          },
        },
      });
      if (userDoc.items.length === 0) {
        setLoading(false);
        toast.error("User not found", {
          duration: 4000,
          icon: "😬",
          position: "top-center",
          style: {
            fontFamily: "inherit",
            zIndex: 10,
          },
        });
        return;
      }

      const chamaDoc: any = await listDocs({
        collection: "chama",
        filter: {
          matcher: {
            key: currentChama.id,
          },
        },
      });

      const updatedChama = {
        ...chamaDoc.items[0].data,
        invites: [...chamaDoc.items[0].data.invites, data.key],
      };
      await setDoc({
        collection: "chama",
        doc: {
          ...chamaDoc.items[0],
          data: updatedChama,
        },
      });

      const memberToAddNotifications = userDoc.items[0].data.notifications;
      const updatedNotifications = [
        ...memberToAddNotifications,
        {
          id: "1",
          title: "Chama Invite",
          type: "invite",
          description: `You have been invited to join ${currentChama.name}`,
          read: false,
          time: format(new Date(), "EEEE do yyyy ha"),
          chamaID: currentChama.id,
        },
      ];
      const updatedMemberToAdd = {
        ...userDoc.items[0].data,
        invitedChama: currentChama.id,
        notifications: updatedNotifications,
      };
      await setDoc({
        collection: "users",
        doc: {
          ...userDoc.items[0],
          data: updatedMemberToAdd,
        },
      });
      setMemberAdded(true);
      toast.success("Invite sent successfully", {
        duration: 4000,
        icon: "🚀",
        position: "top-center",
        style: {
          fontFamily: "inherit",
          zIndex: 10,
        },
      });
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };

  return (
    <div>
      <dialog id="add_member" className="modal">
        <div className="modal-box">
          <div>
            <h1 className="font-heading text-lg">
              Invite members to join your Chama
            </h1>
            {/* @ts-ignore */}
          </div>
          <div className="h-[0.2px] w-full bg-slate-300 my-4"></div>

          <div className="modal-action">
            {loading ? (
              <div className="flex flex-col items-center justify-center w-full">
                <Loader size="sm" />
                <h1 className="font-heading text-lg ml-2 animate-pulseColor">
                  Sending invite...
                </h1>
              </div>
            ) : memberAdded ? (
              <div className="flex flex-col items-center justify-center w-full">
                <h1 className="font-body text-center ml-2">
                  Invite sent successfully! Refresh page to invite more members.
                </h1>
                <img src={done} alt="done" className="w-1/2" />
              </div>
            ) : (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(onSubmit)}
                  className="w-[95%]"
                >
                  <FormField
                    control={form.control}
                    name="username"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">Username</FormLabel>
                        <FormControl className="mt-1">
                          <Input
                            placeholder="Member username"
                            className="font-body px-2 outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 font-body" />
                      </FormItem>
                    )}
                  />
                  <p className="my-2"></p>
                  <FormField
                    control={form.control}
                    name="key"
                    render={({ field }) => (
                      <FormItem>
                        <FormLabel className="font-heading">User ID</FormLabel>
                        <FormControl className="mt-1">
                          <Input
                            placeholder="Member ID"
                            className="font-body px-2 outline-none"
                            {...field}
                          />
                        </FormControl>
                        <FormMessage className="text-xs text-red-500 font-body" />
                      </FormItem>
                    )}
                  />
                  <Button type="submit" className="text-white font-body mt-4">
                    Send Invite
                  </Button>
                </form>
              </Form>
            )}
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              className="btn w-1/2 "
              onClick={() => {
                const dialog = document.getElementById(
                  "add_member"
                ) as HTMLDialogElement;
                dialog?.close();
              }}
            >
              Close
            </button>
          </div>
        </div>
      </dialog>
    </div>
  );
}

export default AddMemberModal;
