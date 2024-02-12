"use client";

import { useEffect, useState } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

import { Table } from "@tanstack/react-table";
import { X, Trash2 } from "lucide-react";
import { toast } from "sonner";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import useDebounce from "@/hooks/use-debounce";
import { DeleteModal } from "../modals/delete-modal";
import { DeleteActionProps } from "./table-actions-types";
// import { DataTableViewOptions } from "./data-table-view-options";
// import { DataTableFacetedFilter } from "./data-table-faceted-filter";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
  searchBy?: string;
  defaultSort?: string;
  defaultOrder?: "asc" | "desc";
  manualControl?: boolean;
  disableRowSelect: boolean;
  disableSearch?: boolean;
  deleteAction?: DeleteActionProps;
  showCheckbox: boolean;
  // setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>> | any; //ts warning showing for unknown reason, thats why any added
  setShowCheckbox: React.Dispatch<React.SetStateAction<boolean>>;
}

export function DataTableToolbar<TData>({
  table,
  searchBy,
  defaultSort = "Created at",
  defaultOrder = "desc",
  manualControl,
  disableRowSelect,
  disableSearch,
  // deleteUrl,
  deleteAction,
  showCheckbox,
  setShowCheckbox,
}: DataTableToolbarProps<TData>) {
  const router = useRouter();
  const pathname = usePathname();

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDeleteRows = async () => {
    if (!deleteAction) return;

    setIsDeleting(true);

    const deleteId = table
      .getSelectedRowModel()
      .flatRows.map((row) => (row.original as { id: string }).id);

    const result = await deleteAction({ deleteId });

    if (result?.success) {
      table.resetRowSelection();
      toast.success(result.success);
    } else if (result?.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  const searchParams = useSearchParams();
  const [searchTitle, setSearchTitle] = useState<string | null>(null);
  const debouncedValue = useDebounce(searchTitle, 500);

  const sortParam = searchParams?.get("sort");
  const search = searchParams?.get("search");

  const sortValues = sortParam?.split(".");
  const sortBy = sortValues?.[0];
  const orderBy = sortValues?.[1];

  useEffect(() => {
    search && setSearchTitle(search);
    !search && setSearchTitle(null);
  }, [search]);

  const newParam = new URLSearchParams(searchParams.toString());

  useEffect(() => {
    if (debouncedValue) {
      newParam.delete("page");
      newParam.set("search", debouncedValue.toString());
    } else {
      newParam.delete("search");
    }

    router.replace(`${pathname}?${newParam}`, { scroll: false });
  }, [debouncedValue]);

  const handleClearSort = () => {
    newParam.delete("sort");
    newParam.delete("page");
    router.replace(`${pathname}?${newParam}`, { scroll: false });
  };

  if (manualControl) {
    return (
      <div className="flex flex-col lg:flex-row gap-5 lg:gap-0 items-center justify-between">
        <div className="flex items-center flex-1 space-x-2">
          <Input
            placeholder={`Search ${searchBy}`}
            value={searchTitle || ""}
            onChange={(e) => setSearchTitle(e.target.value)}
            className="h-8 w-full lg:w-[250px] outline-none border-gray-300"
          />
        </div>

        <div className="flex flex-col lg:flex-row items-center gap-3 text-sm font-medium lg:mr-5">
          {!disableRowSelect && (
            <div className="flex items-center gap-2">
              {table.getSelectedRowModel().flatRows.length > 0 && (
                <>
                  <Button
                    variant="outline"
                    onClick={() => setShowDeleteModal(true)}
                    className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 font-normal"
                  >
                    <Trash2 className="w-4 h-4" />
                    <span>{`Delete ${
                      table.getFilteredSelectedRowModel().rows.length
                    } row(s)`}</span>
                  </Button>

                  <DeleteModal
                    // key={category.id}
                    showDeleteModal={showDeleteModal}
                    setShowDeleteModal={setShowDeleteModal}
                    title={`Do you want to delete ${
                      table.getSelectedRowModel().rows.length
                    } ${
                      table.getSelectedRowModel().rows.length > 1
                        ? "items"
                        : "item"
                    }?`}
                    handleDelete={handleDeleteRows}
                    isPending={isDeleting}
                  />
                </>
              )}
              <Button
                variant="outline"
                onClick={() => setShowCheckbox(!showCheckbox)}
                className="h-8 px-3 text-xs lg:text-sm font-normal"
              >
                {!showCheckbox ? "Select rows" : "Cancel row selection"}
              </Button>
            </div>
          )}

          <div className="flex items-center  text-xs lg:text-sm h-4">
            <p>
              Sort By:{" "}
              <span className="capitalize">{sortBy || defaultSort}</span> (
              {orderBy || defaultOrder})
            </p>
            {sortBy && orderBy && (
              <Button
                type="button"
                variant="outline"
                size="icon"
                className="p-1 ml-1 size-7"
                onClick={handleClearSort}
              >
                <X className="w-4 h-4" />
              </Button>
            )}
          </div>
        </div>

        {/* <DataTableViewOptions table={table} /> */}
      </div>
    );
  } else {
    return (
      <div className="flex items-center justify-end  space-x-2">
        {!disableSearch && searchBy && (
          <Input
            placeholder={`Find ${searchBy}`}
            value={
              (table.getColumn(searchBy)?.getFilterValue() as string) ?? ""
            }
            onChange={(event) =>
              table.getColumn(searchBy)?.setFilterValue(event.target.value)
            }
            className="h-8 w-full lg:w-[250px] outline-none"
          />
        )}

        {!disableRowSelect && (
          <div className="flex place-self-end items-center gap-2">
            {table.getSelectedRowModel().flatRows.length > 0 && (
              <>
                <Button
                  variant="outline"
                  onClick={() => setShowDeleteModal(true)}
                  className="h-8 px-3 text-xs lg:text-sm flex items-center gap-2 border-gray-500 font-normal"
                >
                  <Trash2 className="w-4 h-4" />
                  <span>{`Delete ${
                    table.getFilteredSelectedRowModel().rows.length
                  } row(s)`}</span>
                </Button>
                <DeleteModal
                  // key={category.id}
                  showDeleteModal={showDeleteModal}
                  setShowDeleteModal={setShowDeleteModal}
                  title={`Do you want to delete ${
                    table.getSelectedRowModel().rows.length
                  } ${
                    table.getSelectedRowModel().rows.length > 1
                      ? "items"
                      : "item"
                  }?`}
                  handleDelete={handleDeleteRows}
                  isPending={isDeleting}
                />
              </>
            )}
            <Button
              variant="outline"
              onClick={() => setShowCheckbox(!showCheckbox)}
              className="h-8 px-3"
            >
              {!showCheckbox ? "Select rows" : "Cancel row selection"}
            </Button>
          </div>
        )}
      </div>
    );
  }
}
