export type Task = {
  id: string;
  title: string;
  status: "pending" | "completed";
  dueDate?: Date;
};

export type CreateTaskParams = Pick<Task, "title" | "dueDate">;
