import { TaskAssignment } from "@/app/types/backend/TaskAssignment";
import { getBackend } from "./client";

type Params = {
  userId: string;
};

export const fetchTaskAssignments = async ({ userId }: Params) =>
  getBackend<TaskAssignment[]>(`users/${userId}/task_assignments`);
