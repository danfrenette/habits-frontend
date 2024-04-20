import { Task } from "@/app/types/backend/Task";
import { getBackend } from "./client";
import { currentUser } from "@clerk/nextjs/server";

type Params = {
  dueDate: string;
  userId: string;
};

export const fetchTasks = async (params: Params)<Task[]> => {
  getBackend<Task[]>(`tasks`, { search: params });
};
