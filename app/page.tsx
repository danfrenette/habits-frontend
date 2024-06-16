import { currentUser } from "@clerk/nextjs/server";
import { TaskCompletions } from "./components/TaskCompletions";

export default async function Home() {
  const user = await currentUser();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div>
      <TaskCompletions userId={user.id} />
    </div>
  );
}
