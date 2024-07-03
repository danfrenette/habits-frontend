"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { Button } from "@/app/components/ui/button";
import { useDeleteTask } from "@/app/lib/queries/useDeleteTask";
import { useCallback } from "react";
import { Task } from "@/app/types/backend/Task";

interface DataTableRowActionsProps<TData extends Task> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends Task>({
  row,
}: DataTableRowActionsProps<TData>) {
  const taskId = row.original.id;
  const { mutate: deleteTask } = useDeleteTask(taskId);

  const onDelete = useCallback(() => {
    if (confirm("Are you sure you want to delete this task?")) {
      deleteTask();
    }
  }, [deleteTask]);

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
        >
          <DotsHorizontalIcon className="h-4 w-4" />
          <span className="sr-only">Open menu</span>
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-[160px]">
        <DropdownMenuItem disabled>Edit</DropdownMenuItem>
        <DropdownMenuItem disabled>Make a copy</DropdownMenuItem>
        <DropdownMenuItem disabled>Favorite</DropdownMenuItem>

        <DropdownMenuItem onClick={onDelete}>
          Delete
          <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
