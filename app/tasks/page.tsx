"use client";

import { useSession } from "next-auth/react";
import { useTasks } from "../lib/queries/useTasks";
import ZeroState from "../components/ZeroState";

// import { columns } from "./components/columns";
// import { DataTable } from "./components/data-table";
// import { UserNav } from "./components/user-nav";

export default function TaskPage() {
  const { data: session } = useSession();
  const { data: tasks, error } = useTasks(session?.user.id as string);
  console.log("tasks", tasks);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
          </p>
        </div>
      </div>
      {tasks?.length ? (
        tasks.map((task) => (
          <div key={task.id} className="flex items-center space-x-4">
            <div>
              <h3 className="text-lg font-semibold">{task.title}</h3>
            </div>
          </div>
        ))
      ) : (
        <ZeroState>You don&apos;t have any tasks</ZeroState>
      )}
    </div>
  );
}
