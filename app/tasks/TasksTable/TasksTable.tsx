"use client";

import ZeroState from "@/app/components/ZeroState";
import { columns } from "../DataTable/columns";
import { DataTable } from "../DataTable/DataTable";
import { formatISO } from "date-fns";
import { useTaskTableContext } from "@/app/lib/contexts/TaskTableContext/TaskTableContext";
import { useTasks } from "@/app/lib/queries/useTasks";

export default function TasksTable({ userId }: { userId: string }) {
  const { dueDate } = useTaskTableContext();
  const today = new Date();
  const paramsDueDate = dueDate ? formatISO(dueDate) : formatISO(today);
  const { data: tasksFromAPI, error } = useTasks({
    userId: userId,
    dueDate: paramsDueDate,
  });

  const tasks = tasksFromAPI || [];

  return (
    <>
      {tasks?.length ? (
        <DataTable columns={columns} data={tasks} />
      ) : (
        <ZeroState>You don&apos;t have any tasks</ZeroState>
      )}
    </>
  );
}
