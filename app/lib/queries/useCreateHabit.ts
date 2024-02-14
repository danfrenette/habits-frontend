import { createHabit } from "@/app/api/backend/createHabit";
import { Habit } from "@/app/types/backend/Habit";
import { useMutation, useQueryClient } from "@tanstack/react-query";

export const useCreateHabit = (userId: string) => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (habit: Habit) => createHabit({ userId, habit }),
    onSuccess: () => {
      queryClient.invalidateQueries({
        queryKey: ["habits"],
      });
    },
  });
};
