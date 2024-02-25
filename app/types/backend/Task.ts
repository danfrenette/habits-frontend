export type Task = {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate?: string;
};

export type CreateTaskParams = Pick<Task, "title" | "dueDate">;
