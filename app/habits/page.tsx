"use client";
import { useSession } from "next-auth/react";
import { useHabits } from "../lib/queries/useHabits";
import ZeroState from "../components/ZeroState";
import { PlusIcon } from "@radix-ui/react-icons";
import { Button } from "../components/ui/button";
import Link from "next/link";

// Simulate a database read for tasks.
// async function getTasks() {
//   const data = await fs.readFile(
//     path.join(process.cwd(), "app/examples/tasks/data/tasks.json")
//   );

//   const tasks = JSON.parse(data.toString());

//   return z.array(taskSchema).parse(tasks);
// }

export default function Page() {
  const { data: session } = useSession();
  const { data: habits, error } = useHabits(session?.user.id as string);
  console.log("habits", habits);

  return (
    <div className="flex h-full flex-1 flex-col space-y-8 p-8">
      <div className="flex items-center justify-between space-y-2">
        <div>
          <h2 className="text-2xl font-bold tracking-tight">Welcome back!</h2>
          {habits && habits.length === 0 && (
            <ZeroState>
              <p className="text-muted-foreground">
                You don&apos;t have any habits.
              </p>
            </ZeroState>
          )}
          {habits && habits.length > 0 && (
            <div>nice message about your habits</div>
          )}
        </div>
        <div className="flex items-center">
          <Button asChild>
            <Link href="/habits/new">
              <PlusIcon />
              New Habit
            </Link>
          </Button>
        </div>
      </div>
      {/* <DataTable data={tasks} columns={columns} /> */}
    </div>
  );
}
