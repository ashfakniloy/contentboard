"use client";

import type { Blog } from "@prisma/client";
import { ColumnDef } from "@tanstack/react-table";
import { Checkbox } from "@/components/ui/checkbox";
import { DataTableColumnHeader } from "@/components/data-table/data-table-column-header";
import { ClientFormattedDate } from "@/components/formats/client-formatted-date";
import { BlogAction } from "./blog-action";
import { BlogQueryProps } from "@/db/user/queries/get-blogs";

export const blogsColumn: ColumnDef<BlogQueryProps>[] = [
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
      <DataTableColumnHeader column={column} title="Title" manualSort />
    ),
    cell: ({ row }) => <div className="w-[400px]">{row.getValue("title")}</div>,
  },
  {
    accessorKey: "author",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Author" manualSort />
    ),
    cell: ({ row }) => <div>{row.getValue("author")}</div>,
  },
  {
    accessorKey: "metaDescription",
    header: ({ column }) => (
      <DataTableColumnHeader
        column={column}
        title="Meta Description"
        manualSort
      />
    ),
    cell: ({ row }) => (
      <div className="w-[400px]">{row.getValue("metaDescription")}</div>
    ),
  },
  {
    accessorKey: "_count.blogViews",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Views" manualSort />
    ),
    cell: ({
      row: {
        original: {
          _count: { blogViews },
        },
      },
    }) => <div>{blogViews}</div>,
  },
  {
    accessorKey: "published",
    header: ({ column }) => (
      <DataTableColumnHeader column={column} title="Status" manualSort />
    ),
    cell: ({ row }) => (
      <div>{row.getValue("published") ? "Published" : "Draft"}</div>
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
        <BlogAction row={row} />
      </div>
    ),
  },
];
