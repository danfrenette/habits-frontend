"use client";
import { Separator } from "@/app/components/ui/separator";
import { useSession } from "next-auth/react";
import { Resolver, useForm } from "react-hook-form";
import { TaskForm } from "./TaskForm";
import { toast } from "@/app/components/ui/use-toast";
import { useCreateTask } from "@/app/lib/queries/useCreateTask";
import { formatISO } from "date-fns";

export type FormValues = {
  title: string;
  dueDate?: string;
};

export default function Page() {
  const { data: session } = useSession();
  const createTask = useCreateTask(session?.user.id as string);

  const validateTitle = (title: string): string | null => {
    if (!title) return "Title is required";
    if (title.length < 3) return "Title must be at least 3 characters long";
    return null;
  };

  const customResolver: Resolver<FormValues> = async (values) => {
    const errors: Record<string, { message: string }> = {};
    const { title } = values;

    const nameError = validateTitle(title);
    if (nameError) errors.name = { message: nameError };

    return {
      values: errors.name ? {} : values,
      errors: errors,
    };
  };

  const form = useForm<FormValues>({
    resolver: customResolver,
    defaultValues: {
      title: "",
      dueDate: formatISO(new Date()),
    },
  });

  const onSubmit = (data: FormValues) => {
    debugger;
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

  return (
    <div className="space-y-6 p-10 pb-16 block">
      <div className="space-y-0.5">
        <h2 className="text-2xl font-bold tracking-tight">New Task</h2>
        <p className="text-muted-foreground">
          Create a new task to be displayed in the task table.
        </p>
      </div>
      <Separator className="my-6" />
      <div className="flex flex-col space-y-8 lg:flex-row lg:space-x-12 lg:space-y-0">
        {/* <aside className="-mx-4 lg:w-1/5">
          sideeee
          <SidebarNav items={sidebarNavItems} />
        </aside> */}
        <div className="flex-1 lg:max-w-2xl">
          <div className="space-y-6">
            <div>
              <h3 className="text-lg font-medium">General</h3>
              <p className="text-sm text-muted-foreground">
                General information about the task.
              </p>
            </div>
            <Separator />
            <TaskForm form={form} onSubmit={onSubmit} />
          </div>
        </div>
      </div>
    </div>
  );
}
