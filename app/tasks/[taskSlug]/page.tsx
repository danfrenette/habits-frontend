"use client";
import TaskInfo from "@/app/components/TaskInfo";
import { useAuth } from "@clerk/nextjs";

type Props = {
  params: { taskSlug: string };
};

export default function Page({ params }: Props) {
  const { taskSlug } = params;
  const { userId } = useAuth();

  if (!userId) {
    return <div>Loading...</div>;
  }

  return <TaskInfo userId={userId} taskSlug={taskSlug} />;
}
