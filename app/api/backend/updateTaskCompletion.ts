import { TaskCompletion } from "@/app/types/backend/TaskCompletion";
import { patchBackend } from "./client";

export type UpdateTaskCompletionParams = Partial<
  Pick<TaskCompletion, "completedAt">
>;

type Props = {
  taskCompletionId: string;
  taskCompletion: UpdateTaskCompletionParams;
};

export const updateTaskCompletion = async ({
  taskCompletionId,
  taskCompletion,
}: Props) =>
  patchBackend<TaskCompletion>(`task_completions/${taskCompletionId}`, {
    taskCompletion,
  });
