import { UpdateTaskParams, updateTask } from "@/app/api/backend/updateTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = (taskId: string) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: (task: UpdateTaskParams) => updateTask({ taskId, task }),
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};
