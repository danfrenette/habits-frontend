import Link from "next/link";
import { Button } from "../components/ui/button";
import TasksTable from "./TasksTable/TasksTable";
import { PlusIcon } from "@radix-ui/react-icons";
import { currentUser } from "@clerk/nextjs/server";

export default async function Page() {
  const user = await currentUser();

  if (!user) {
    return <div>You are not logged in</div>;
  }

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks!
          </p>
        </div>
        <div className="flex items-center">
          <Button asChild>
            <Link href="/tasks/new">
              <PlusIcon className="mr-1" />
              New Task
            </Link>
          </Button>
        </div>
      </div>
      <TasksTable userId={user.id} />
    </div>
  );
}
