import React from "react";
import * as zod from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import {
  Form,
  FormControl,
  FormDescription,
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

const handleSubmit = (values: zod.infer<typeof formSchema>) => {
  console.log(values);
};

function CreateChama() {
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
