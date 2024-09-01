import { fetchTaskAssignments } from "@/app/api/backend/fetchTaskAssignments";
import { useQuery } from "@tanstack/react-query";

type Params = {
  userId: string;
};

export const useTaskAssignments = (params: Params) =>
  useQuery({
    queryKey: ["taskAssignments", params],
    queryFn: () => fetchTaskAssignments(params),
    enabled: !!params,
  });
