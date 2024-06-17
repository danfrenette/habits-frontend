import { useUpdateTaskCompletion } from "@/app/lib/queries/useUpdateTaskCompletion";
import { Button } from "../ui/button";
import { TaskCompletion } from "@/app/types/backend/TaskCompletion";

type Props = {
  taskCompletion: TaskCompletion;
};

export default function CompleteTaskCompletionButton({
  taskCompletion,
}: Props) {
  const { id, completedAt } = taskCompletion;
  const { mutate: updateTask } = useUpdateTaskCompletion(id);
  const buttonLabel = completedAt ? "Completed" : "Complete";

  return (
    <Button
      disabled={!!completedAt}
      onClick={() => {
        updateTask({ completedAt: new Date().toISOString() });
      }}
    >
      {buttonLabel}
    </Button>
  );
}
