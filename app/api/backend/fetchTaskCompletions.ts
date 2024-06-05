import { TaskCompletion } from "@/app/types/backend/TaskCompletion";
import { getBackend } from "./client";

type Params = {
  userId: string;
};

export const fetchTaskCompletions = async ({ userId }: Params) =>
  getBackend<TaskCompletion[]>(`users/${userId}/task_completions`);
