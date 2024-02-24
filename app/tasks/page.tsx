"use client";

import { useSession } from "next-auth/react";
import { useTasks } from "../lib/queries/useTasks";
import ZeroState from "../components/ZeroState";
import { DataTable } from "./DataTable/DataTable";

import { columns } from "./DataTable/columns";
import { Button } from "../components/ui/button";
import Link from "next/link";
import { PlusIcon } from "@radix-ui/react-icons";
// import { UserNav } from "./components/user-nav";

export default function Page() {
  const { data: session } = useSession();
  const { data: tasks, error } = useTasks(session?.user.id as string);

  return (
    <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          <p className="text-muted-foreground">
            Here&apos;s a list of your tasks for this month!
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
      {tasks?.length ? (
        <DataTable columns={columns} data={tasks} />
      ) : (
        <ZeroState>You don&apos;t have any tasks</ZeroState>
      )}
    </div>
  );
}
