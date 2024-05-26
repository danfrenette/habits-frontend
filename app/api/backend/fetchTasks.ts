import { Task } from "@/app/types/backend/Task";
import { getBackend } from "./client";

type Params = {
  dueDate: string;
  userId: string;
};

export const fetchTasks = async ({ dueDate, userId }: Params) =>
  getBackend<Task[]>(`users/${userId}/tasks`, { search: { dueDate } });
