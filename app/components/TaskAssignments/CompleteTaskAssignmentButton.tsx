import { useUpdateTaskAssignment } from "@/app/lib/queries/useUpdateTaskAssignment";
import { Button } from "../ui/button";
import { TaskAssignment } from "@/app/types/backend/TaskAssignment";

type Props = {
  taskAssignment: TaskAssignment;
};

export default function CompleteTaskAssignmentButton({
  taskAssignment,
}: Props) {
  const { id, completedAt } = taskAssignment;
  const { mutate: updateTask } = useUpdateTaskAssignment(id);
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
