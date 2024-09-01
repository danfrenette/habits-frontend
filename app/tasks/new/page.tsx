import { Separator } from "@/app/components/ui/separator";
import { TaskForm } from "../../components/TaskInfo/TaskForm";
import { RecurrenceFormValues } from "@/app/components/RecurrenceForm/RecurrenceForm";
import { currentUser } from "@clerk/nextjs/server";

type TaskFormValues = {
  title: string;
  dueDate?: string;
  recurring: boolean;
  until: Date | null;
  startDate: Date;
  rrule: string;
};

export type FormValues = TaskFormValues & RecurrenceFormValues;

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="space-y-6">
      <div>
        <h3 className="text-lg font-medium">General Information</h3>
        <p className="text-sm text-muted-foreground">
          Basic information about your new task.
        </p>
      </div>
      <Separator />
      <TaskForm userId={user.id} />
    </div>
  );
}
