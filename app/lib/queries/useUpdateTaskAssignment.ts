import {
  UpdateTaskAssignmentParams,
  updateTaskAssignment,
} from "@/app/api/backend/updateTaskAssignment";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskAssignment = (taskAssignmentId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskAssignment: UpdateTaskAssignmentParams) =>
      updateTaskAssignment({ taskAssignmentId, taskAssignment }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["taskAssignments"],
      }),
  });
};
