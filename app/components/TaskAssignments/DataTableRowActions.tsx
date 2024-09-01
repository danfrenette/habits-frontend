"use client";

import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";

import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/app/components/ui/dropdown-menu";

import { Button } from "@/app/components/ui/button";
import { TaskAssignment } from "@/app/types/backend/TaskAssignment";
import Link from "next/link";

interface DataTableRowActionsProps<TData extends TaskAssignment> {
  row: Row<TData>;
}

export function DataTableRowActions<TData extends TaskAssignment>({
  row,
}: DataTableRowActionsProps<TData>) {
  const taskAssignmentSlug = row.original.taskSlug;

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
        <DropdownMenuItem>
          <Link href={`/tasks/${taskAssignmentSlug}`}>View Task</Link>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
