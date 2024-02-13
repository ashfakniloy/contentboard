"use client";

import type { Message } from "@prisma/client";
import { useState } from "react";
import { Row } from "@tanstack/react-table";
import { toast } from "sonner";
import { MoreHorizontal, Trash, Eye } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { DeleteModal } from "@/components/modals/delete-modal";
import { MessageModal } from "@/components/modals/message-modal";
import { deleteMessage } from "@/db/user/mutations/delete-message";

interface MessageAction<TData> {
  row: Row<TData>;
}

export function MessageAction<TData>({ row }: MessageAction<TData>) {
  const message = row.original as Message;

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [isDeleting, setIsDeleting] = useState(false);

  const [showMessageModal, setShowMessageModal] = useState(false);

  const handleDelete = async () => {
    // console.log("delete id", message.id);
    setIsDeleting(true);

    const result = await deleteMessage({ deleteId: message.id });

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
          <DropdownMenuItem onClick={() => setShowMessageModal(true)}>
            <Eye className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            View
          </DropdownMenuItem>
          <DropdownMenuSeparator />
          <DropdownMenuItem onClick={() => setShowDeleteModal(true)}>
            <Trash className="mr-2 h-3.5 w-3.5 text-muted-foreground/70" />
            Delete
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>

      <MessageModal
        showMessageModal={showMessageModal}
        setShowMessageModal={setShowMessageModal}
        message={message}
      />

      <DeleteModal
        key={message.id}
        showDeleteModal={showDeleteModal}
        setShowDeleteModal={setShowDeleteModal}
        title={`Do you want to delete this message from "${message.username}"?`}
        handleDelete={handleDelete}
        isPending={isDeleting}
      />
    </>
  );
}
