"use client";

import type { Category } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { ClientFormattedDate } from "@/components/formats/client-formatted-date";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { CategoryAction } from "./category-action";

export const categoriesColumn: ColumnDef<Category>[] = [
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
    accessorKey: "categoryName",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Name" manualSort />
    ),
    cell: ({ row }) => (
      <div className="w-[400px]">{row.getValue("categoryName")}</div>
    ),
  },
  {
    accessorKey: "slug",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Slug" manualSort />
    ),
    cell: ({ row }) => <div className="w-[400px]">{row.getValue("slug")}</div>,
  },
  {
    accessorKey: "description",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Description" manualSort />
    ),
    cell: ({ row }) => (
      <div className="w-full">{row.getValue("description")}</div>
    ),
  },

  {
    accessorKey: "createdAt",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Created at" manualSort />
    ),
    cell: ({ row }) => (
      <div className="w-[220px]">
        <ClientFormattedDate date={row.getValue("createdAt")} />
      </div>
    ),
  },

  {
    id: "actions",
    cell: ({ row }) => (
      <div>
        <CategoryAction row={row} />
      </div>
    ),
  },
];
