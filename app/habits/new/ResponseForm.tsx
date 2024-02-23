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
import { cn } from "@/app/lib/utils";
import { MinusIcon } from "@radix-ui/react-icons";
import { useFieldArray } from "react-hook-form";

export function ResponseForm({ form, onSubmit }: { form: any; onSubmit: any }) {
  const { fields, append, remove } = useFieldArray({
    name: "tasks",
    control: form.control,
  });

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        <FormField
          control={form.control}
          name="responseDescription"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Description</FormLabel>
              <FormControl>
                <Input {...field} />
              </FormControl>
              <FormDescription>
                This is the response for your habit. This is what you want to
                accomplish when the cue is triggered.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
        <div>
          {fields.map((field, index) => (
            <FormField
              control={form.control}
              key={field.id}
              name={`tasks.${index}.value`}
              render={({ field }) => (
                <FormItem>
                  <FormLabel className={cn(index !== 0 && "sr-only")}>
                    Tasks
                  </FormLabel>
                  <FormDescription className={cn(index !== 0 && "sr-only")}>
                    Add tasks that you want to accomplish when the cue is
                    triggered.
                  </FormDescription>
                  <FormControl>
                    <div className="flex w-full max-w-sm items-center space-x-2">
                      <Input {...field} />
                      <Button
                        type="button"
                        variant="outline"
                        onClick={() => remove(index)}
                      >
                        <MinusIcon />
                      </Button>
                    </div>
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
          ))}
          <Button
            type="button"
            variant="outline"
            className="mt-2"
            onClick={() => append({ value: "" })}
          >
            Add Additional Task
          </Button>
        </div>
      </form>
    </Form>
  );
}
