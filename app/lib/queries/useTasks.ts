import { fetchTasks } from "@/app/api/backend/fetchTasks";
import { useQuery } from "@tanstack/react-query";

type Params = {
  userId: string;
  dueDate: string;
};

export const useTasks = (params: Params) =>
  useQuery({
    queryKey: ["tasks", params],
    queryFn: () => fetchTasks(params),
    enabled: !!params,
  });
