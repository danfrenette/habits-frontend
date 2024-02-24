import { createTask } from "@/app/api/backend/createTask";
import { CreateTaskParams } from "@/app/types/backend/Task";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateTask = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (task: CreateTaskParams) => createTask({ userId, task }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      });
    },
  });
};
