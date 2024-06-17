import {
  UpdateTaskCompletionParams,
  updateTaskCompletion,
} from "@/app/api/backend/updateTaskCompletion";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTaskCompletion = (taskCompletionId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (taskCompletion: UpdateTaskCompletionParams) =>
      updateTaskCompletion({ taskCompletionId, taskCompletion }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["taskCompletions"],
      }),
  });
};
