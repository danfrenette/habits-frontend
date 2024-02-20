"use client";

import { Button } from "@/app/components/ui/button";
import {
  Command,
  CommandEmpty,
  CommandGroup,
  CommandInput,
  CommandItem,
} from "@/app/components/ui/command";
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
import { TimePicker } from "@/app/components/ui/time-picker";
import { cn } from "@/app/lib/utils";
import { CaretSortIcon, CheckIcon } from "@radix-ui/react-icons";
import RecurrenceForm from "./RecurrenceForm";

export function CueForm({ form, onSubmit }: { form: any; onSubmit: any }) {
  const cueTypes = [
    { label: "Environmental", value: "environmental" },
    { label: "Time-Based", value: "time_based" },
    { label: "Emotional", value: "emotional" },
    { label: "Preceding Action", value: "preceding_action" },
  ];
  const selectedCueType = form.watch("cueType");
  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="cueDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input placeholder="My Cue" {...field} />
              </FormControl>
              <FormDescription>
                This is the cue for your habit. It could be a time, a place, an
                emotion, or an action that triggers your habit. You can also
                re-use cues across habits.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <FormField
          control={form.control}
          name="cueType"
          render={({ field }) => (
            <FormItem className="flex flex-col">
              <FormLabel>Type</FormLabel>
              <Popover>
                <PopoverTrigger asChild>
                  <FormControl>
                    <Button
                      variant="outline"
                      role="combobox"
                      className={cn(
                        "w-[200px] justify-between",
                        !field.value && "text-muted-foreground"
                      )}
                    >
                      {field.value
                        ? cueTypes.find(
                            (cueType) => cueType.value === field.value
                          )?.label
                        : "Select Cue Type"}
                      <CaretSortIcon className="ml-2 h-4 w-4 shrink-0 opacity-50" />
                    </Button>
                  </FormControl>
                </PopoverTrigger>
                <PopoverContent className="w-[200px] p-0">
                  <Command>
                    <CommandInput placeholder="Search language..." />
                    <CommandEmpty>No language found.</CommandEmpty>
                    <CommandGroup>
                      {cueTypes.map((cueType) => (
                        <CommandItem
                          value={cueType.value}
                          key={cueType.value}
                          onSelect={() => {
                            form.setValue("cueType", cueType.value);
                          }}
                        >
                          <CheckIcon
                            className={cn(
                              "mr-2 h-4 w-4",
                              cueType.value === field.value
                                ? "opacity-100"
                                : "opacity-0"
                            )}
                          />
                          {cueType.label}
                        </CommandItem>
                      ))}
                    </CommandGroup>
                  </Command>
                </PopoverContent>
              </Popover>
              <FormDescription>
                This is the type of Cue you want to track. This is mostly used
                for analytics to see what you respond to best.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        {selectedCueType === "time_based" && (
          <>
            <FormField
              control={form.control}
              name="cueTime"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Time</FormLabel>
                  <FormControl>
                    <TimePicker
                      value={field.value}
                      onChange={(value) => {
                        form.setValue("cueTime", value);
                      }}
                    />
                  </FormControl>
                  <FormDescription>
                    Assuming this is a time-based cue, what time does it occur?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="cueRrule"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Recurrence</FormLabel>
                  <FormControl>
                    <RecurrenceForm form={form} />
                  </FormControl>
                  <FormDescription>
                    How often does this cue occur?
                  </FormDescription>
                  <FormMessage />
                </FormItem>
              )}
            />
          </>
        )}
      </form>
    </Form>
  );
}
