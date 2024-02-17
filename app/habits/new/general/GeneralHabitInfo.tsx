"use client";

import { Button } from "@/app/components/ui/button";
import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import { Switch } from "@/app/components/ui/switch";
import { toast } from "@/app/components/ui/use-toast";
import { useCreateHabit } from "@/app/lib/queries/useCreateHabit";
import { useSession } from "next-auth/react";
import { Resolver, useForm } from "react-hook-form";

interface FormValues {
  name: string;
  current: boolean;
}

const validateName = (name: string): string | null => {
  if (!name) return "Name is required";
  if (name.length < 3) return "Name must be at least 3 characters long";
  return null;
};

const customResolver: Resolver<FormValues> = async (values) => {
  const errors: Record<string, { message: string }> = {};
  const { name } = values;

  const nameError = validateName(name);
  if (nameError) errors.name = { message: nameError };

  return {
    values: errors.name ? {} : values,
    errors: errors,
  };
};

export function GeneralHabitInfo() {
  const { data: session } = useSession();
  const createHabit = useCreateHabit(session?.user.id as string);

  const form = useForm<FormValues>({
    resolver: customResolver,
    defaultValues: {
      current: false,
      name: "",
    },
  });

  const onSubmit = (data: FormValues) => {
    createHabit.mutate(data, {
      onSuccess: () => {
        toast({
          title: "you submitted the following values:",
          description: (
            <pre className="mt-2 w-[340px] rounded-md bg-slate-950 p-4">
              <code className="text-white">
                {JSON.stringify(data, null, 2)}
              </code>
            </pre>
          ),
        });
      },
    });
  };

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="name"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Name</FormLabel>
              <FormControl>
                <Input placeholder="My Habit" {...field} />
              </FormControl>
              <FormDescription>
                This is the name of the habit you want to track. It doesn&apos;t
                need to be all-encompassing, because we&apos;ll ask for more
                details in the next step.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="current"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3 shadow-sm">
              <div className="space-y-0.5">
                <FormLabel>Current</FormLabel>
                <FormDescription>
                  Is this a habit you currently have?
                </FormDescription>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />
        <Button type="submit">Create Habit</Button>
      </form>
    </Form>
  );
}
