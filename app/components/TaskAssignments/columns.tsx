"use client";

import { ColumnDef } from "@tanstack/react-table";

import { TaskAssignment } from "@/app/types/backend/TaskAssignment";
import { Checkbox } from "@/app/components/ui/checkbox";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import { format, parseISO } from "date-fns";
import { Button } from "../ui/button";
import { CompleteTaskAssignmentButton } from ".";

export const columns: ColumnDef<TaskAssignment>[] = [
  {
    id: "select",
    header: ({ table }) => (
      <Checkbox
        checked={
          table.getIsAllPageRowsSelected() ||
          (table.getIsSomePageRowsSelected() && "indeterminate")
        }
        onCheckedChange={(value) => table.toggleAllPageRowsSelected(!!value)}
        aria-label="Select all"
        className="translate-y-[2px]"
      />
    ),
    cell: ({ row }) => (
      <Checkbox
        checked={row.getIsSelected()}
        onCheckedChange={(value) => row.toggleSelected(!!value)}
        aria-label="Select row"
        className="translate-y-[2px]"
      />
    ),
    enableSorting: false,
    enableHiding: false,
  },
  {
    accessorKey: "taskTitle",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Title" />
    ),
    cell: ({ row }) => {
      // add this once we have labels or categories
      // const label = labels.find((label) => label.value === row.original.label);

      return (
        <div className="flex space-x-2">
          {/* {label && <Badge variant="outline">{label.label}</Badge>} */}
          <span className="max-w-[500px] truncate font-medium">
            {row.getValue("taskTitle")}
          </span>
        </div>
      );
    },
  },
  {
    id: "Due Date",
    accessorKey: "dueAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    sortingFn: "datetime",
    cell: ({ row }) => {
      const dueDate = row.original.dueAt;

      if (!dueDate) {
        return (
          <div className="flex items-center">
            <span className="text-muted-foreground">No due date</span>
          </div>
        );
      }

      // Example: Format as 'February 24th, 2024'
      const humanReadableDate = format(parseISO(dueDate), "MMMM do, yyyy");
      return (
        <div className="flex items-center">
          <span>{humanReadableDate}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "completed",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Complete" />
    ),
    cell: ({ row }) => (
      <CompleteTaskAssignmentButton taskAssignment={row.original} />
    ),
    enableSorting: false,
    enableHiding: false,
  },
];
