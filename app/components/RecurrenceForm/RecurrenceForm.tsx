import {
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from "@/app/components/ui/form";
import { Input } from "@/app/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/app/components/ui/select";
import { Toggle } from "@/app/components/ui/toggle";
import React from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";

export type RecurrenceFormValues = {
  startDate?: string;
  frequency?: string;
  byDay?: string[];
  byMonthDay?: string[];
  interval?: number;
  count?: number;
};

const RecurrenceForm = ({ form }: { form: any }) => {
  // can this component easily extend the types of form that use it?
  // fafruch.github.io/react-rrule-generator/

  const frequency = form.watch("frequency");
  const interval = form.watch("interval");
  const untilDate = form.watch("until");
  const startDate = form.watch("startDate");
  const today = new Date();
  const selectedUntilDay = untilDate ? new Date(untilDate) : today;
  const selectedStartDay = startDate ? new Date(startDate) : today;
  const ends = form.watch("endsOn");
  const days = [
    { label: "Sunday", value: "SU" },
    { label: "Monday", value: "MO" },
    { label: "Tuesday", value: "TU" },
    { label: "Wednesday", value: "WE" },
    { label: "Thursday", value: "TH" },
    { label: "Friday", value: "FR" },
    { label: "Saturday", value: "SA" },
  ];
  const frequencies = [
    { label: "Daily", value: "DAILY" },
    { label: "Weekly", value: "WEEKLY" },
    { label: "Monthly", value: "MONTHLY" },
    { label: "Yearly", value: "YEARLY" },
  ];

  const intervalLabel = () => {
    switch (frequency) {
      case "DAILY":
        return "Days";
      case "WEEKLY":
        return "Weeks";
      case "MONTHLY":
        return "Months";
      case "YEARLY":
        return "Years";
      default:
        return "Interval";
    }
  };

  const handleDayToggle = (e: React.MouseEvent<HTMLElement>) => {
    const dayName = e.currentTarget.textContent;
    const day = days.find((d) => d.label === dayName)?.value;

    if (form.getValues().byDay.includes(day)) {
      form.setValue(
        "byDay",
        form.getValues().byDay.filter((dayValue: string) => dayValue !== day)
      );
    } else {
      form.setValue("byDay", [...form.getValues().byDay, day]);
    }
  };

  return (
    <>
      <FormField
        control={form.control}
        name="startDate"
        render={({ field }) => (
          <FormItem className="flex flex-col">
            <FormLabel>Start Date</FormLabel>
            <Popover>
              <PopoverTrigger asChild>
                <FormControl>
                  <Button
                    variant={"outline"}
                    className={"w-[240px] pl-3 text-left font-normal"}
                  >
                    {format(selectedStartDay, "PPP")}
                    <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                  </Button>
                </FormControl>
              </PopoverTrigger>
              <PopoverContent className="w-auto p-0" align="start">
                <Calendar
                  mode="single"
                  selected={selectedStartDay}
                  onSelect={field.onChange}
                  disabled={{ before: today }}
                />
              </PopoverContent>
            </Popover>
            <FormDescription>
              Specifies the date on which the event recurrence begins.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      <FormField
        control={form.control}
        name="frequency"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Frequency</FormLabel>
            <Select onValueChange={field.onChange} defaultValue={field.value}>
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {frequencies.map(({ label, value }) => (
                  <SelectItem key={value} value={value}>
                    {label}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <FormDescription>
              Specifies the frequency of the event recurrence
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
      {frequency === "WEEKLY" && (
        <div className="flex flex-row">
          {days.map((day) => (
            <FormField
              key={day.value}
              control={form.control}
              name="byDay"
              render={({ field }) => (
                <FormItem>
                  <FormControl>
                    <Toggle
                      className="mr-4"
                      pressed={field.value.includes(day.value)}
                      onClick={handleDayToggle}
                    >
                      {day.label}
                    </Toggle>
                  </FormControl>
                </FormItem>
              )}
            />
          ))}
        </div>
      )}
      {(frequency === "MONTHLY" || frequency === "YEARLY") && (
        <FormField
          control={form.control}
          name="byMonthDay"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={"w-[240px] pl-3 text-left font-normal"}
                    >
                      {frequency === "MONTHLY"
                        ? "Day of the month"
                        : "Day and month of the year"}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    onSelect={field.onChange}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {frequency && (
        <>
          <FormField
            control={form.control}
            name="interval"
            render={({ field }) => (
              <FormItem>
                <FormLabel>
                  Every {interval || "N"} {intervalLabel()}
                </FormLabel>
                <FormControl>
                  <Input type="number" {...field} placeholder="Interval" />
                </FormControl>
                <FormDescription>
                  Defines the interval between each event occurrence within the
                  specified frequency. For example, an Interval of 2 with a
                  Frequency of &quot;Daily&quot; means the event occurs every
                  other day.
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
          <FormField
            control={form.control}
            name="endsOn"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Ends</FormLabel>
                <Select
                  onValueChange={field.onChange}
                  defaultValue={field.value}
                >
                  <FormControl>
                    <SelectTrigger>
                      <SelectValue placeholder="Never" />
                    </SelectTrigger>
                  </FormControl>
                  <SelectContent>
                    <SelectItem value="NEVER">Never</SelectItem>
                    <SelectItem value="COUNT">After</SelectItem>
                    <SelectItem value="UNTIL">On Date</SelectItem>
                  </SelectContent>
                </Select>
                <FormDescription>
                  Specifies the frequency of the event recurrence
                </FormDescription>
                <FormMessage />
              </FormItem>
            )}
          />
        </>
      )}
      {ends === "COUNT" && (
        <FormField
          control={form.control}
          name="count"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Count</FormLabel>
              <FormControl>
                <Input type="number" {...field} placeholder="Count" />
              </FormControl>
              <FormDescription>
                Specifies how many instances of the event will occur before
                stopping.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
      {ends === "UNTIL" && (
        <FormField
          control={form.control}
          name="until"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={"w-[240px] pl-3 text-left font-normal"}
                    >
                      {format(selectedUntilDay, "PPP")}
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="single"
                    selected={selectedUntilDay}
                    onSelect={field.onChange}
                    disabled={{ before: today }}
                    initialFocus
                  />
                </PopoverContent>
              </Popover>
              <FormDescription>
                Specifies the date on which the event recurrence ends.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      )}
    </>
  );
};

export default RecurrenceForm;
