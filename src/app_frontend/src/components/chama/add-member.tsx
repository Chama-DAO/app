import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { toast } from "../../../@/hooks/use-toast";
import { Button } from "../../../@/components/ui/button";
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
import { getDoc, listDocs } from "@junobuild/core";

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

  const onSubmit = async (data: z.infer<typeof FormSchema>) => {
    //setLoading to true
    //check if user exist in juno db
    //Push a notification about the invite
    //setLoading to false, and memberAdded to true
    //Inform the admin that the invite has been sent
    //If user doesn't exist, setLoading to false, & ask admin to try again

    try {
      setLoading(true);
      const userDoc = await getDoc({
        collection: "users",
        key: data.key,
      });
      console.log(userDoc);
    } catch (error) {
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
            <Form {...form}>
              <form onSubmit={form.handleSubmit(onSubmit)} className="w-[95%]">
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
          </div>
          <div className="flex items-center justify-center mt-10">
            <button
              className="btn w-1/2 bg-gray-200 text-primary"
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
