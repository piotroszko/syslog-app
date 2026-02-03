import { ColumnDef } from "@tanstack/react-table";
import { SyslogType } from "@workspace/api";
import { getLevelText } from "./level.cell";

export const columns: ColumnDef<SyslogType>[] = [
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
