import { currentUser } from "@clerk/nextjs/server";
import { TaskAssignments } from "./components/TaskAssignments";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <TaskAssignments userId={user.id} />
    </div>
  );
}
