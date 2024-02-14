import { Habit } from "@/app/types/backend/Habit";
import { postBackend } from "./client";

type CreateHabitParams = {
  userId: string;
  habit: Habit;
};

export const createHabit = async ({ userId, habit }: CreateHabitParams) =>
  postBackend<Habit>(`/users/${userId}/habits`, { habit });
