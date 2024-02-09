import { User } from "@/app/types/backend/User";
import { postBackend } from "./client";

export const createUser = async (user: Omit<User, "id">): Promise<User> => {
  return postBackend<User>("/users", { user });
};
