"use client";

import { useTask } from "@/app/lib/queries/useTask";
import { TaskForm } from "./TaskForm";

type Props = {
  userId: string;
  taskSlug: string;
};

export default function TaskInfo({ userId, taskSlug }: Props) {
  const { data: task, isLoading } = useTask({ userId, taskId: taskSlug });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (!task) {
    return <div>No task found</div>;
  }

  return <TaskForm userId={userId} task={task} />;
}
