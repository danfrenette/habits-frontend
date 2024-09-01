import TaskInfo from "@/app/components/TaskInfo";
import { currentUser } from "@clerk/nextjs/server";

type Props = {
  params: { taskSlug: string };
};

export default async function Page({ params }: Props) {
  const { taskSlug } = params;
  const user = await currentUser();

  if (!user) {
    return <div>Loading...</div>;
  }

  return <TaskInfo userId={user.id} taskSlug={taskSlug} />;
}
