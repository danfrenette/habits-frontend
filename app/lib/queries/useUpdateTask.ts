import { updateTask } from "@/app/api/backend/updateTask";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useUpdateTask = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: updateTask,
    onSuccess: () =>
      queryClient.invalidateQueries({
        queryKey: ["tasks"],
      }),
  });
};
