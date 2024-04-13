"use client";
import { Separator } from "@/app/components/ui/separator";
import { useSession } from "next-auth/react";
import { Resolver, useForm } from "react-hook-form";
import { TaskForm } from "./TaskForm";
import { toast } from "@/app/components/ui/use-toast";
import { useCreateTask } from "@/app/lib/queries/useCreateTask";
import { formatISO } from "date-fns";
import { useSideNav } from "@/app/lib/contexts/SideNavContext/SideNavContext";
import {
  RecurrenceFormValues,
  recurrenceFormValues,
} from "@/app/components/RecurrenceForm/RecurrenceForm";

type TaskFormValues = {
  title: string;
  dueDate?: string;
  recurring: boolean;
  until: Date | null;
  startDate: Date;
  rrule: string;
};

export type FormValues = TaskFormValues & RecurrenceFormValues;

export default function Page() {
  const { data: session } = useSession();
  const createTask = useCreateTask(session?.user.id as string);
  const { currentSection } = useSideNav();

  const validateTitle = (title: string): string | null => {
    if (!title) return "Title is required";
    if (title.length < 3) return "Title must be at least 3 characters long";
    return null;
  };

  const customResolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, { message: string }> = {};
    const { title } = values;

    const titleError = validateTitle(title);
    if (titleError) errors.title = { message: titleError };

    return {
      values: errors.title ? {} : values,
      errors: errors,
    };
  };

  const form = useForm<FormValues>({
    resolver: customResolver,
    defaultValues: {
      title: "",
      dueDate: formatISO(new Date()),
      recurring: false,
      ...recurrenceFormValues,
    },
  });

  const onSubmit = (data: FormValues) => {
    createTask.mutate(data, {
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

  const renderSection = () => {
    switch (currentSection) {
      case "General":
        return <TaskForm form={form} onSubmit={onSubmit} />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Information</h3>
        <p className="text-sm text-muted-foreground">
          Basic information about your new task.
        </p>
      </div>
      <Separator />
      {renderSection()}
    </div>
  );
}
