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

export function GeneralHabitInfo({
  form,
  onSubmit,
}: {
  form: any;
  onSubmit: any;
}) {
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
