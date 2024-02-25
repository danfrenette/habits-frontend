import { Task } from "@/app/types/backend/Task";
import { getBackend } from "./client";

type Params = {
  userId: string;
  dueDate: string;
};

export const fetchTasks = async (params: Params) =>
  getBackend<Task[]>(`tasks`, { search: params });
