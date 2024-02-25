import { Task, UpdateTaskParams } from "@/app/types/backend/Task";
import { patchBackend } from "./client";

export const updateTask = async ({
  taskId,
  task,
}: {
  taskId: string;
  task: UpdateTaskParams;
}) => patchBackend<Task>(`tasks/${taskId}`, { task });
