"use client";

import { useTaskAssignments } from "@/app/lib/queries/useTaskAssignments";
import DataTable from "./DataTable";
import { columns } from "./columns";
import ZeroState from "../ZeroState";

export default function TaskAssignments({ userId }: { userId: string }) {
  const { data: taskAssignments, isLoading } = useTaskAssignments({ userId });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  return (
    <>
      {taskAssignments ? (
        <DataTable columns={columns} data={taskAssignments} />
      ) : (
        <ZeroState>You don&apos;t have any tasks</ZeroState>
      )}
    </>
  );
}
