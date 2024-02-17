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

export function CueForm({ form, onSubmit }: { form: any; onSubmit: any }) {
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cueName"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Cue Name</FormLabel>
              <FormControl>
                <Input placeholder="My Cue" {...field} />
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
        <Button type="submit">Create Habit</Button>
      </form>
    </Form>
  );
}
