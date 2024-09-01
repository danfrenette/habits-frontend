import { TaskAssignment } from "@/app/types/backend/TaskAssignment";
import { patchBackend } from "./client";

export type UpdateTaskAssignmentParams = Partial<
  Pick<TaskAssignment, "completedAt">
>;

type Props = {
  taskAssignmentId: string;
  taskAssignment: UpdateTaskAssignmentParams;
};

export const updateTaskAssignment = async ({
  taskAssignmentId,
  taskAssignment,
}: Props) =>
  patchBackend<TaskAssignment>(`task_completions/${taskAssignmentId}`, {
    taskAssignment,
  });
