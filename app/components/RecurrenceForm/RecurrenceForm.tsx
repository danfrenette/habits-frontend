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
import React, { useEffect } from "react";
import { Calendar } from "../ui/calendar";
import { Popover, PopoverTrigger } from "../ui/popover";
import { Button } from "../ui/button";
import { CalendarIcon } from "@radix-ui/react-icons";
import { PopoverContent } from "@radix-ui/react-popover";
import { format } from "date-fns";
import { datetime, Frequency, RRule, RRuleSet, rrulestr, Weekday } from "rrule";

export type RecurrenceFormValues = {
  rrule: string;
  // startDate?: string;
  frequency?: Frequency;
  byWeekday?: string[];
  byMonthDay?: string[];
  // byMonthDay?: string[];
  // interval?: number;
  // count?: number;
  // untilDate?: string;
};

const RecurrenceForm = ({ form }: { form: any }) => {
  // can this component easily extend the types of form that use it?
  // fafruch.github.io/react-rrule-generator/

  const rruleFields = form.watch([
    "startDate",
    "frequency",
    "byWeekday",
    "byMonthDay",
    "interval",
    "count",
    "until",
  ]);
  const frequency = form.watch("frequency");
  const interval = form.watch("interval");
  const untilDate = form.watch("until");
  const startDate = form.watch("startDate");
  const today = new Date();
  const selectedUntilDay = untilDate ? new Date(untilDate) : today;
  const selectedStartDay = startDate ? new Date(startDate) : today;
  const ends = form.watch("endsOn");
  const days = [
    { label: "Sunday", value: RRule.SU },
    { label: "Monday", value: RRule.MO },
    { label: "Tuesday", value: RRule.TU },
    { label: "Wednesday", value: RRule.WE },
    { label: "Thursday", value: RRule.TH },
    { label: "Friday", value: RRule.FR },
    { label: "Saturday", value: RRule.SA },
  ];
  const frequencies = [
    { label: "Daily", value: RRule.DAILY },
    { label: "Weekly", value: RRule.WEEKLY },
    { label: "Monthly", value: RRule.MONTHLY },
    { label: "Yearly", value: RRule.YEARLY },
  ];

  const intervalLabel = () => {
    switch (frequency) {
      case RRule.DAILY.toString():
        return "Days";
      case RRule.WEEKLY.toString():
        return "Weeks";
      case RRule.MONTHLY.toString():
        return "Months";
      case RRule.YEARLY.toString():
        return "Years";
      default:
        return "Interval";
    }
  };

  const handleDayToggle = (e: React.MouseEvent<HTMLElement>) => {
    const dayName = e.currentTarget.textContent;
    const day = days.find(({ label }) => label === dayName)?.value;
    const selectedWeekdays = form.getValues().byWeekday;

    if (selectedWeekdays.includes(day)) {
      const newWeekdays = selectedWeekdays.filter(
        (selectedDay: Weekday) => selectedDay !== day
      );

      form.setValue("byWeekday", newWeekdays);
    } else {
      form.setValue("byWeekday", [...form.getValues().byWeekday, day]);
    }
  };

  useEffect(() => {
    const [
      startDate,
      frequency,
      byWeekday,
      byMonthDay,
      interval,
      count,
      until,
    ] = rruleFields;
    const freq = frequency;
    const byweekday = byWeekday;
    // const byweekday = byWeekday.map((day: string) => RRule[day]);
    const bymonthday = byMonthDay.map((day: Date) => day.getDate());

    const rule = new RRule({
      freq,
      interval,
      count,
      byweekday,
      bymonthday,
      dtstart: startDate,
      // until, // the value works but sending this breaks the ruby library
    });

    form.setValue("rrule", rule.toString());
  }, [rruleFields, form.setValue, form]);

  return (
    <>
      <FormField
        control={form.control}
        name="rrule"
        render={({ field }) => (
          <FormItem>
            <FormControl>
              <Input type="text" {...field} />
            </FormControl>
            <FormMessage />
          </FormItem>
        )}
      />
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
            <Select
              onValueChange={field.onChange}
              defaultValue={field.value.toString()}
            >
              <FormControl>
                <SelectTrigger>
                  <SelectValue placeholder="Frequency" />
                </SelectTrigger>
              </FormControl>
              <SelectContent>
                {frequencies.map(({ label, value }) => (
                  <SelectItem key={value} value={value.toString()}>
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
      {frequency == RRule.WEEKLY && (
        <div className="flex flex-row">
          {days.map((day) => (
            <FormField
              key={day.value.toString()}
              control={form.control}
              name="byWeekday"
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
      {(frequency === RRule.MONTHLY.toString() ||
        frequency === RRule.YEARLY.toString()) && (
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
