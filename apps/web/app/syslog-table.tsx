"use client";

import { useSyslogs } from "@/hooks/use-syslogs";
import { ColumnDef, flexRender, getCoreRowModel, useReactTable } from "@tanstack/react-table";
import { Syslog, SyslogLevel } from "@workspace/api";
import { Badge } from "@workspace/ui/components/badge";
import { DatePickerWithRange } from "@workspace/ui/components/range-picker";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@workspace/ui/components/table";
import { ReactNode, useState } from "react";
import { DateRange } from "react-day-picker";
import { addDays } from "date-fns";

const getLevelText = (level: number): ReactNode => {
  switch (level) {
    case 1:
      return (
        <Badge className="bg-sky-50 text-sky-700 dark:bg-sky-950 dark:text-sky-300">DEBUG</Badge>
      );
    case 2:
      return (
        <Badge className="bg-purple-50 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
          INFO
        </Badge>
      );
    case 3:
      return (
        <Badge className="bg-amber-50 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
          WARNING
        </Badge>
      );
    case 4:
      return (
        <Badge className="bg-red-50 text-red-700 dark:bg-red-950 dark:text-red-300">ERROR</Badge>
      );
  }
};

export const columns: ColumnDef<Syslog>[] = [
  {
    accessorKey: "level",
    header: "Level",
    cell: ({ getValue }) => getLevelText(getValue() as number),
  },
  {
    accessorKey: "content",
    header: "Content",
  },
  {
    accessorKey: "createdAt",
    header: "Created At",
    cell: ({ getValue }) => new Date(getValue() as string).toLocaleString(),
  },
];

export const SyslogTable = () => {
  const [date, setDate] = useState<DateRange | undefined>({
    from: new Date(new Date().getFullYear(), 1, 1),
    to: addDays(new Date(new Date().getFullYear(), 1, 1), 1),
  });
  const [level, setLevel] = useState<SyslogLevel | undefined>(undefined);

  const { data, isLoading, error } = useSyslogs({
    level,
    startDate: date?.from?.toISOString(),
    endDate: date?.to?.toISOString(),
  });
  const table = useReactTable({
    data: data || [],
    columns,
    getCoreRowModel: getCoreRowModel(),
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error: {error.message} </div>;
  }

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <DatePickerWithRange date={date} setDate={setDate} label="Date Range" />
      <div className="overflow-hidden rounded-md border w-full h-full">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id}>
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(header.column.columnDef.header, header.getContext())}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow key={row.id} data-state={row.getIsSelected() && "selected"}>
                  {row.getVisibleCells().map((cell) => (
                    <TableCell key={cell.id}>
                      {flexRender(cell.column.columnDef.cell, cell.getContext())}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={columns.length} className="h-24 text-center">
                  No results.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
};
