import { fetchTask, TaskParams } from "@/app/api/backend/fetchTask";
import { useQuery } from "@tanstack/react-query";

export const useTask = (params: TaskParams) =>
  useQuery({
    queryKey: ["task", params],
    queryFn: () => fetchTask(params),
    enabled: !!params,
  });
