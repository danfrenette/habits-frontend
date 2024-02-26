"use client";

import { Button } from "@/app/components/ui/button";
import { Input } from "@/app/components/ui/input";
import { CalendarIcon, Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";
import { DataTableFacetedFilter } from "./DataTableFacetedFilter";
import { statuses } from "./data";
import { DataTableViewOptions } from "./DataTableViewOptions";
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from "@/app/components/ui/popover";
import { Calendar } from "@/app/components/ui/calendar";
import { format, formatISO } from "date-fns";
import { cn } from "@/app/lib/utils";
import { useTaskTableContext } from "@/app/lib/contexts/TaskTableContext/TaskTableContext";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const { dueDate, setDueDate } = useTaskTableContext();
  const today = new Date();
  const selectedDay = dueDate ? new Date(dueDate) : today;
  const isFiltered = table.getState().columnFilters.length > 0;

  return (
    <div className="flex items-center justify-between">
      <div className="flex flex-1 items-center space-x-2">
        <Input
          placeholder="Filter tasks..."
          value={(table.getColumn("title")?.getFilterValue() as string) ?? ""}
          onChange={(event) =>
            table.getColumn("title")?.setFilterValue(event.target.value)
          }
          className="h-8 w-[150px] lg:w-[250px]"
        />
        <Popover>
          <PopoverTrigger asChild>
            <Button
              variant={"outline"}
              className={"w-[240px] pl-3 text-left font-normal"}
            >
              {format(selectedDay, "PPP")}
              <CalendarIcon className="ml-auto h-4 w-4 opacity-50" />
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0" align="start">
            <Calendar
              mode="single"
              selected={selectedDay}
              onSelect={setDueDate}
              disabled={{ before: today }}
              initialFocus
            />
          </PopoverContent>
        </Popover>
        {table.getColumn("status") && (
          <DataTableFacetedFilter
            column={table.getColumn("status")}
            title="Status"
            options={statuses}
          />
        )}
        {isFiltered && (
          <Button
            variant="ghost"
            onClick={() => table.resetColumnFilters()}
            className="h-8 px-2 lg:px-3"
          >
            Reset
            <Cross2Icon className="ml-2 h-4 w-4" />
          </Button>
        )}
      </div>
      <DataTableViewOptions table={table} />
    </div>
  );
}
