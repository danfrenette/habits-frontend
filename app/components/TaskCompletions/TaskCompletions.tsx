"use client";

import { useTaskCompletions } from "@/app/lib/queries/useTaskCompletions";
import DataTable from "./DataTable";
import { columns } from "./columns";
import ZeroState from "../ZeroState";

export default function TaskCompletions({ userId }: { userId: string }) {
  const { data: taskCompletions, isLoading } = useTaskCompletions({ userId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {taskCompletions ? (
        <DataTable columns={columns} data={taskCompletions} />
      ) : (
        <ZeroState>You don&apos;t have any tasks</ZeroState>
      )}
    </>
  );
}
