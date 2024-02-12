"use client";

import { useEffect, useState } from "react";
import {
  ColumnDef,
  ColumnFiltersState,
  SortingState,
  Table as TableType,
  VisibilityState,
  flexRender,
  getCoreRowModel,
  getFacetedRowModel,
  getFacetedUniqueValues,
  getFilteredRowModel,
  getPaginationRowModel,
  getSortedRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { DataTablePagination } from "./data-table-pagination";
import { DataTableToolbar } from "./data-table-toolbar";
import { useSearchParams } from "next/navigation";
import { DeleteActionProps } from "./table-actions-types";

interface DataTableProps<TData, TValue> {
  columns: ColumnDef<TData, TValue>[];
  data: TData[];
  searchBy?: string;
  count?: number;
  deleteAction?: DeleteActionProps;
  disableRowSelect?: boolean;
  disableSearch?: boolean;
  disablePagination?: boolean;
  manualControl?: boolean;
}

export function DataTable<TData, TValue>({
  columns,
  data,
  searchBy,
  count,
  deleteAction,
  disableRowSelect = false,
  disableSearch,
  disablePagination,
  manualControl,
}: DataTableProps<TData, TValue>) {
  const [rowSelection, setRowSelection] = useState({});
  const [columnVisibility, setColumnVisibility] = useState<VisibilityState>({});
  const [columnFilters, setColumnFilters] = useState<ColumnFiltersState>([]);
  const [sorting, setSorting] = useState<SortingState>([]);

  const [showCheckbox, setShowCheckbox] = useState(false);

  const columnsFiltered =
    !disableRowSelect && showCheckbox
      ? columns
      : columns.filter((column) => column.id !== "select");

  const table = useReactTable({
    data,
    columns: columnsFiltered,
    // initialState: {
    //   pagination: {
    //     pageIndex: 1,
    //     pageSize: 20,
    //   },
    // },
    manualPagination: manualControl ? true : false,
    manualSorting: manualControl ? true : false,
    manualFiltering: manualControl ? true : false,
    // pageCount: count,
    state: {
      sorting,
      columnVisibility,
      rowSelection,
      columnFilters,
    },
    enableRowSelection: showCheckbox ? true : false,
    onRowSelectionChange: setRowSelection,
    onSortingChange: setSorting,
    onColumnFiltersChange: setColumnFilters,
    onColumnVisibilityChange: setColumnVisibility,
    getCoreRowModel: getCoreRowModel(),
    getFilteredRowModel: getFilteredRowModel(),
    getPaginationRowModel: getPaginationRowModel(),
    getSortedRowModel: getSortedRowModel(),
    getFacetedRowModel: getFacetedRowModel(),
    getFacetedUniqueValues: getFacetedUniqueValues(),
  });

  useEffect(() => {
    !showCheckbox && table.resetRowSelection();
  }, [showCheckbox]);

  const searchParams = useSearchParams();
  const searchTitle = searchParams.get("search");
  // const page = searchParams.get("page");

  return (
    <div className="space-y-4">
      <DataTableToolbar
        table={table}
        searchBy={searchBy}
        deleteAction={deleteAction}
        showCheckbox={showCheckbox}
        setShowCheckbox={setShowCheckbox}
        manualControl={manualControl}
        disableRowSelect={disableRowSelect}
        disableSearch={disableSearch}
      />
      <div className="overflow-x-auto rounded-lg border border-border">
        <Table>
          <TableHeader>
            {table.getHeaderGroups().map((headerGroup) => (
              <TableRow key={headerGroup.id} className="hover:bg-transparent">
                {headerGroup.headers.map((header) => {
                  return (
                    <TableHead key={header.id}>
                      {header.isPlaceholder
                        ? null
                        : flexRender(
                            header.column.columnDef.header,
                            header.getContext()
                          )}
                    </TableHead>
                  );
                })}
              </TableRow>
            ))}
          </TableHeader>
          <TableBody>
            {table.getRowModel().rows?.length ? (
              table.getRowModel().rows.map((row) => (
                <TableRow
                  key={row.id}
                  // key={row.original.id}
                  data-state={row.getIsSelected() && "selected"}
                >
                  {row.getVisibleCells().map((cell) => (
                    <TableCell
                      key={cell.id}
                      // key={cell.row.original.id}
                    >
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  ))}
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell
                  colSpan={columns.length}
                  className="h-24 text-center"
                >
                  {searchTitle
                    ? `No results for ${searchTitle}.`
                    : "No results."}
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>

      {!disablePagination && (
        <DataTablePagination
          table={table}
          count={count}
          manualControl={manualControl}
        />
      )}
    </div>
  );
}
