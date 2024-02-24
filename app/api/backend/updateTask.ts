import { Task } from "@/app/types/backend/Task";
import { patchBackend } from "./client";

type UpdateTaskParams = Pick<Task, "id" | "status">;

export const updateTask = async (task: UpdateTaskParams) =>
  patchBackend<Task>(`tasks/${task.id}`, { task });
