import { Task } from "@/app/types/backend/Task";
import { patchBackend } from "./client";

export type UpdateTaskParams = Partial<Pick<Task, "status">>;

export const updateTask = async ({
  taskId,
  task,
}: {
  taskId: string;
  task: UpdateTaskParams;
}) => patchBackend<Task>(`tasks/${taskId}`, { task });
