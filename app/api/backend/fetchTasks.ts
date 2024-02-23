import { Task } from "@/app/types/backend/Task";
import { getBackend } from "./client";

export const fetchTasks = async (userId: string) =>
  getBackend<Task[]>(`users/${userId}/tasks`);
