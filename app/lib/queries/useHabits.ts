import { fetchHabits } from "@/app/api/backend/fetchHabits";
import { useQuery } from "@tanstack/react-query";

export const useHabits = (userId: string) =>
  useQuery({
    queryKey: ["habits", userId],
    queryFn: () => fetchHabits(userId),
    enabled: !!userId,
  });
