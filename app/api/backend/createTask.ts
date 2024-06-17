import { Task } from "@/app/types/backend/Task";
import { postBackend } from "./client";

export type CreateTaskParams = Pick<Task, "title" | "dueDate">;

export const createTask = async ({
  userId,
  task,
}: {
  userId: string;
  task: CreateTaskParams;
}) => postBackend<Task>(`/users/${userId}/tasks`, { task });
