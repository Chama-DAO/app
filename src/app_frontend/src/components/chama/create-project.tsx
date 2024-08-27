import React from "react";
import * as zod from "zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "../../../@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Input } from "../../../@/components/ui/input";
import { Button } from "../../../@/components/ui/button";
import { Textarea } from "../../../@/components/ui/textarea";
import { getDoc, setDoc } from "@junobuild/core";
import Loader from "../Loader";
import { Chama } from "./create-chama";
import { Link } from "react-router-dom";

const schema = zod.object({
  title: zod.string().min(5).max(50),
  description: zod.string().min(100).max(450),
  fundsAllocated: zod.string(),
  fundsCollected: zod.string(),
  groupLink: zod.string(),
});

function CreateProject({ id }: any) {
  const handleSubmit = async (values: zod.infer<typeof schema>) => {
    const project = {
      ...values,
      date: new Date(),
      progress:
        (Number(values.fundsCollected) / Number(values.fundsAllocated)) * 100,
      approvals: 1,
      approved: false,
      approvedBy: [],
    };
    try {
      setLoading(true);
      const chamaDoc = await getDoc({
        collection: "chama",
        key: id,
      });
      const chamaData = chamaDoc?.data as Chama;
      const newChamaData = {
        ...chamaData,
        projects: [...chamaData.projects, project],
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
      setProjectCreatedSuccessfully(true);
      setLoading(false);
    } catch (error) {
      setLoading(false);
      console.log(error);
    }
  };
  const form = useForm<zod.infer<typeof schema>>({
    resolver: zodResolver(schema),
    defaultValues: {
      title: "",
      description: "",
      fundsAllocated: "",
      fundsCollected: "",
      groupLink: "",
    },
  });
  const [loading, setLoading] = React.useState(false);
  const [projectedCreatedSuccessfully, setProjectCreatedSuccessfully] =
    React.useState(false);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-full">
        <Loader size="sm" />
      </div>
    );
  }
  if (projectedCreatedSuccessfully) {
    return (
      <div className="flex flex-col items-center justify-center">
        <h1 className="font-heading text-lg text-center my-4">
          Project created successfully🎉
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
    <div>
      <Form {...form}>
        <form
          onSubmit={form.handleSubmit(handleSubmit)}
          className="max-w-md w-full flex flex-col gap-2"
        >
          <FormField
            control={form.control}
            name="title"
            render={({ field }) => {
              return (
                <FormItem className="my-2">
                  <FormLabel className="font-heading">Project Title</FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Name of your project"
                      className="font-body px-2 mt-1"
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
                <FormItem className="my-2">
                  <FormLabel className="font-heading">
                    Project Description
                  </FormLabel>
                  <FormControl>
                    <Textarea
                      {...field}
                      placeholder="Describe your project"
                      className="font-body px-2 mt-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs font-body" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="fundsAllocated"
            render={({ field }) => {
              return (
                <FormItem className="my-2">
                  <FormLabel className="font-heading">
                    Funds Allocated
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="How much does the project cost?(KES)"
                      className="font-body px-2 mt-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs font-body" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="fundsCollected"
            render={({ field }) => {
              return (
                <FormItem className="my-2">
                  <FormLabel className="font-heading">
                    Collected Amount
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="How much have you collected so far?(KES)"
                      className="font-body px-2 mt-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs font-body" />
                </FormItem>
              );
            }}
          />
          <FormField
            control={form.control}
            name="groupLink"
            render={({ field }) => {
              return (
                <FormItem className="my-2">
                  <FormLabel className="font-heading">
                    WhatsApp/Telegram Link
                  </FormLabel>
                  <FormControl>
                    <Input
                      {...field}
                      placeholder="Link to your project group"
                      className="font-body px-2 mt-1"
                    />
                  </FormControl>
                  <FormMessage className="text-red-500 text-xs font-body" />
                </FormItem>
              );
            }}
          />

          <Button
            type="submit"
            className="w-full bg-primary text-white font-body mt-8"
          >
            Submit Project
          </Button>
        </form>
      </Form>
    </div>
  );
}

export default CreateProject;
