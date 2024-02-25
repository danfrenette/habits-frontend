"use client";

import { ColumnDef } from "@tanstack/react-table";

import { Task } from "@/app/types/backend/Task";
import { Checkbox } from "@/app/components/ui/checkbox";
import { statuses } from "./data";
import { DataTableRowActions } from "./DataTableRowActions";
import { DataTableColumnHeader } from "./DataTableColumnHeader";
import CompleteTaskButton from "./CompleteTaskButton";
import { format, parseISO } from "date-fns";

export const columns: ColumnDef<Task>[] = [
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
    accessorKey: "title",
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
            {row.getValue("title")}
          </span>
        </div>
      );
    },
  },
  {
    accessorKey: "status",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" />
    ),
    cell: ({ row }) => {
      const status = statuses.find(
        (status) => status.value === row.getValue("status")
      );

      if (!status) {
        return null;
      }

      return (
        <div className="flex w-[100px] items-center">
          {status.icon && (
            <status.icon className="mr-2 h-4 w-4 text-muted-foreground" />
          )}
          <span>{status.label}</span>
        </div>
      );
    },
    filterFn: (row, id, value) => {
      return value.includes(row.getValue(id));
    },
  },
  {
    id: "Due Date",
    accessorKey: "dueDate",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Due Date" />
    ),
    sortingFn: "datetime",
    cell: ({ row }) => {
      const dueDate = row.original.dueDate;

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
    cell: ({ row }) => <CompleteTaskButton taskId={row.original.id} />,
    enableSorting: false,
    enableHiding: false,
  },
  {
    id: "actions",
    cell: ({ row }) => <DataTableRowActions row={row} />,
  },
];
