import { Habit } from "@/app/types/backend/Habit";
import { getBackend } from "./client";

export const fetchHabits = async (userId: string) =>
  getBackend<Habit[]>(`users/${userId}/habits`);
