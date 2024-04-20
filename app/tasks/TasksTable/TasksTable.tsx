import ZeroState from "@/app/components/ZeroState";
import { User } from "@clerk/nextjs/server";
import { columns } from "../DataTable/columns";
import { DataTable } from "../DataTable/DataTable";
import { formatISO } from "date-fns";
import { useTaskTableContext } from "@/app/lib/contexts/TaskTableContext/TaskTableContext";
import { useTasks } from "@/app/lib/queries/useTasks";

export default function TasksTable({ user }: { user: User }) {
  const { dueDate } = useTaskTableContext();
  const today = new Date();
  const paramsDueDate = dueDate ? formatISO(dueDate) : formatISO(today);
  const { data: tasks, error } = useTasks({
    userId: user.id,
    dueDate: paramsDueDate,
  });

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
