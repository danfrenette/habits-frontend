import { Button } from "@/app/components/ui/button";
import { useUpdateTask } from "@/app/lib/queries/useUpdateTask";

export default function CompleteTaskButton({ taskId }: { taskId: string }) {
  const updateTask = useUpdateTask();

  return (
    <Button
      variant="ghost"
      size="sm"
      onClick={() => updateTask.mutate({ id: taskId, status: "completed" })}
    >
      Complete
    </Button>
  );
}
