"use client";

import type { Category } from "@prisma/client";
import { useState } from "react";
import { toast } from "sonner";
import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/modals/delete-modal";
import { EditCategoryModal } from "@/components/modals/edit-category-modal";
import { deleteCategory } from "@/db/user/mutations/delete-category";

interface CategoryAction<TData> {
  row: Row<TData>;
}

export function CategoryAction<TData>({ row }: CategoryAction<TData>) {
  const category = row.original as Category;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showEditModal, setShowEditModal] = useState(false);

  const handleDelete = async () => {
    // console.log("delete id", category.id);
    setIsDeleting(true);

    const result = await deleteCategory({ deleteId: category.id });

    console.log("result", result);

    if (result?.success) {
      toast.success(result.success);
    } else if (result?.error) {
      toast.error(result.error);
    } else {
      toast.error("Error");
    }

    setShowDeleteModal(false);
    setIsDeleting(false);
  };

  return (
    <>
      <DropdownMenu modal={false}>
        <DropdownMenuTrigger asChild>
          <Button
            variant="ghost"
            className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
          >
            <MoreHorizontal className="h-4 w-4" />
            <span className="sr-only">Open menu</span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="w-[160px]">
          <DropdownMenuItem onClick={() => setShowEditModal(true)}>
            <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Edit
          </DropdownMenuItem>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <EditCategoryModal
        category={category}
        showEditModal={showEditModal}
        setShowEditModal={setShowEditModal}
      />

      <DeleteModal
        key={category.id}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        title={`Do you want to delete "${category.categoryName}"?`}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
}
