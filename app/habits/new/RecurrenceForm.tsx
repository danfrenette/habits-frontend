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

const RecurrenceForm = ({ form }: { form: any }) => {
  const frequency = form.watch("frequency");
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

  const handleDayToggle = (e: React.MouseEvent<HTMLElement>) => {
    const dayName = e.currentTarget.textContent;
    const day = days.find((d) => d.label === dayName)?.value;

    if (form.getValues().byWeekday.includes(day)) {
      form.setValue(
        "byWeekday",
        form
          .getValues()
          .byWeekday.filter((dayValue: string) => dayValue !== day)
      );
    } else {
      form.setValue("byWeekday", [...form.getValues().byWeekday, day]);
    }
  };

  return (
    <>
      {/* Frequency Selector */}
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

      {/* Interval Input */}
      {/* <Input type="number" {...register("interval")} placeholder="Interval" /> */}

      {/* Days of the Week Checkboxes */}
      {frequency === "WEEKLY" && (
        <div className="flex flex-row">
          {days.map((day) => (
            <FormField
              key={day.value}
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

      <FormField
        control={form.control}
        name="interval"
        render={({ field }) => (
          <FormItem>
            <FormLabel>Count</FormLabel>
            <FormControl>
              <Input type="number" {...field} placeholder="Count" />
            </FormControl>
            <FormDescription>
              Specifies how many occurrences of the event will occur before
              stopping.
            </FormDescription>
            <FormMessage />
          </FormItem>
        )}
      />
    </>
  );
};

export default RecurrenceForm;
