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
import { Frequency, RRule } from "rrule";

export type RecurrenceFormValues = {
  rrule: string;
  startDate?: Date;
  frequency?: Frequency;
  byWeekday?: number[];
  byMonthDay?: Date[];
  byYearDay?: Date[];
  interval?: number | null;
  count?: number | null;
  until?: Date | null;
};

export const recurrenceFormValues = {
  rrule: "",
  startDate: new Date(),
  frequency: RRule.DAILY,
  byWeekday: [],
  byMonthDay: [],
  byYearDay: [],
  interval: null,
  count: null,
  until: null,
};

const RecurrenceForm = ({ form }: { form: any }) => {
  const rruleFields = form.watch([
    "startDate",
    "frequency",
    "byWeekday",
    "byMonthDay",
    "byYearDay",
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
    { label: "Sunday", value: RRule.SU.weekday },
    { label: "Monday", value: RRule.MO.weekday },
    { label: "Tuesday", value: RRule.TU.weekday },
    { label: "Wednesday", value: RRule.WE.weekday },
    { label: "Thursday", value: RRule.TH.weekday },
    { label: "Friday", value: RRule.FR.weekday },
    { label: "Saturday", value: RRule.SA.weekday },
  ];
  const frequencies = [
    { label: "Daily", value: RRule.DAILY },
    { label: "Weekly", value: RRule.WEEKLY },
    { label: "Monthly", value: RRule.MONTHLY },
    { label: "Yearly", value: RRule.YEARLY },
  ];

  const intervalLabel = () => {
    const freq = parseInt(frequency);
    switch (freq) {
      case RRule.DAILY:
        return "Days";
      case RRule.WEEKLY:
        return "Weeks";
      case RRule.MONTHLY:
        return "Months";
      case RRule.YEARLY:
        return "Years";
      default:
        return "Days";
    }
  };

  const handleDayToggle = (e: React.MouseEvent<HTMLElement>) => {
    const dayName = e.currentTarget.textContent;
    const day = days.find(({ label }) => label === dayName)?.value;
    const selectedWeekdays = form.getValues().byWeekday;

    if (selectedWeekdays.includes(day)) {
      const newWeekdays = selectedWeekdays.filter(
        (selectedDay: number) => selectedDay !== day
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
      byYearDay,
      interval,
      count,
      until,
    ] = rruleFields;

    const monthDays = byMonthDay.map((date: Date) => date.getDate());
    const yearDays = byYearDay.map((date: Date) =>
      Math.ceil(
        (date.getTime() - new Date(date.getFullYear(), 0, 1).getTime() + 1) /
          86400000
      )
    );

    const rule = new RRule({
      freq: frequency,
      interval,
      count,
      byweekday: byWeekday,
      bymonthday: monthDays,
      byyearday: yearDays,
      dtstart: startDate,
      until,
      tzid: Intl.DateTimeFormat().resolvedOptions().timeZone,
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
              <Input type="hidden" {...field} />
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
      {parseInt(frequency) == RRule.WEEKLY && (
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
      {parseInt(frequency) === RRule.MONTHLY && (
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
                      Days of the Month
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={field.value}
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
      {parseInt(frequency) === RRule.YEARLY && (
        <FormField
          control={form.control}
          name="byYearDay"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant={"outline"}
                      className={"w-[240px] pl-3 text-left font-normal"}
                    >
                      Days of the Year
                      <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-auto p-0" align="start">
                  <Calendar
                    mode="multiple"
                    selected={field.value}
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
      {frequency ? (
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
      ) : null}
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
