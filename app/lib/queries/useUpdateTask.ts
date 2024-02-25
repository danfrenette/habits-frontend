import { updateTask } from "@/app/api/backend/updateTask";
import { UpdateTaskParams } from "@/app/types/backend/Task";
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
