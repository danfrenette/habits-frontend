import { deleteBackend } from "./client";

export const deleteTask = (taskId: string) =>
  deleteBackend<void>(`tasks/${taskId}`);
