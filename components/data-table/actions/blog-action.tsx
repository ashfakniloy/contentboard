"use client";

import { Row } from "@tanstack/react-table";
import { MoreHorizontal, Trash, Eye, Edit } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { useState } from "react";
import { toast } from "sonner";
import { Blog } from "@prisma/client";
import { DeleteModal } from "@/components/modals/delete-modal";
import { deleteBlog } from "@/db/user/mutations/delete-blog";
import Link from "next/link";

interface BlogAction<TData> {
  row: Row<TData>;
}

export function BlogAction<TData>({ row }: BlogAction<TData>) {
  const blog = row.original as Blog;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const handleDelete = async () => {
    // console.log("delete id", category.id);
    setIsDeleting(true);

    const result = await deleteBlog({ deleteId: blog.id });

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
          <Link href={`/blog/view/${blog.slug}`}>
            <DropdownMenuItem>
              <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              View
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />

          <Link href={`/blog/edit-blog/${blog.slug}`}>
            <DropdownMenuItem>
              <Edit className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
              Edit
            </DropdownMenuItem>
          </Link>

          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <DeleteModal
        key={blog.id}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        title={`Do you want to delete "${blog.title}"?`}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
}
