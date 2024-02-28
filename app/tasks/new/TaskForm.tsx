"use client";

import { CalendarIcon } from "@radix-ui/react-icons";
import { format } from "date-fns";
import { UseFormReturn } from "react-hook-form";

import { Button } from "@/app/components/ui/button";
import { Calendar } from "@/app/components/ui/calendar";
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
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { FormValues } from "./page";
import { Switch } from "@/app/components/ui/switch";
import RecurrenceForm from "@/app/components/RecurrenceForm/RecurrenceForm";

export function TaskForm({
  form,
  onSubmit,
}: {
  form: UseFormReturn<FormValues, any, FormValues>;
  onSubmit: (data: any) => void;
}) {
  const dueDate = form.getValues().dueDate;
  const today = new Date();
  const selectedDay = dueDate ? new Date(dueDate) : today;
  const isRecurring = form.watch("recurring");

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Title" {...field} />
              </FormControl>
              <FormDescription>
                This is the title that will be displayed in the task table.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="recurring"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Recurring</FormLabel>
              <FormControl>
                <Switch
                  className="ml-4"
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
              <FormDescription>
                Is this a one-time task, or a recurring task?
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {isRecurring ? (
          <RecurrenceForm form={form} />
        ) : (
          <FormField
            control={form.control}
            name="dueDate"
            render={({ field }) => (
              <FormItem className="flex flex-col">
                <FormLabel>Due Date</FormLabel>
                <Popover>
                  <PopoverTrigger asChild>
                    <FormControl>
                      <Button
                        variant={"outline"}
                        className={"w-[240px] pl-3 text-left font-normal"}
                      >
                        {format(selectedDay, "PPP")}
                        <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                      </Button>
                    </FormControl>
                  </PopoverTrigger>
                  <PopoverContent className="w-auto p-0" align="start">
                    <Calendar
                      mode="single"
                      selected={selectedDay}
                      onSelect={field.onChange}
                      disabled={{ before: today }}
                      initialFocus
                    />
                  </PopoverContent>
                </Popover>
                <FormDescription>
                  Your date of birth is used to calculate your age.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        )}
        <Button type="submit">Create Task</Button>
      </form>
    </Form>
  );
}
