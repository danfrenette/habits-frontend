import { fetchTaskCompletions } from "@/app/api/backend/fetchTaskCompletions";
import { useQuery } from "@tanstack/react-query";

type Params = {
  userId: string;
};

export const useTaskCompletions = (params: Params) =>
  useQuery({
    queryKey: ["taskCompletions", params],
    queryFn: () => fetchTaskCompletions(params),
    enabled: !!params,
  });
