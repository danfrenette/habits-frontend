import { Task } from "@/app/types/backend/Task";
import { getBackend } from "./client";

export type TaskParams = {
  userId: string;
  taskId: string;
};

export const fetchTask = async (params: TaskParams) => {
  const { userId, taskId } = params;

  return getBackend<Task>(`users/${userId}/tasks/${taskId}`);
};
