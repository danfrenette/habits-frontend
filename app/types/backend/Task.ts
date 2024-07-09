export type Task = {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate?: string;
  slug: string;
  recurrenceRule?: {
    rrule: string;
  };
};
