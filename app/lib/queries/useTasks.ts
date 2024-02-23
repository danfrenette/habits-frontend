import { fetchTasks } from "@/app/api/backend/fetchTasks";
import { useQuery } from "@tanstack/react-query";

export const useTasks = (userId: string) =>
  useQuery({
    queryKey: ["tasks", userId],
    queryFn: () => fetchTasks(userId),
    enabled: !!userId,
  });
