import { Button } from "@/app/components/ui/button";
import { useUpdateTask } from "@/app/lib/queries/useUpdateTask";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  const updateTask = useUpdateTask(taskId);

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => updateTask.mutate({ status: "completed" })}
    >
      Complete
    </Button>
  );
}
