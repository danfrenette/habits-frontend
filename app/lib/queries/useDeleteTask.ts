import { deleteTask } from "@/app/api/backend/deleteTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useDeleteTask = (taskId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: () => deleteTask(taskId),
    onSuccess: () =>
      Promise.all([
        queryClient.invalidateQueries({
          queryKey: ["tasks"],
        }),
      ]),
  });
};
