"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteMessage({
  deleteId,
}: {
  deleteId: string | string[];
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  if (!deleteId) {
    return { error: "Need to pass message Id" };
  }

  const userId = session.user.id;

  if (typeof deleteId === "string") {
    try {
      const response = await prisma.message.delete({
        where: {
          id_userId: {
            id: deleteId,
            userId,
          },
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `User ${response.username} message deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await prisma.message.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
          userId,
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `${deleteId.length} messages deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}

export type DeleteMessageProps = typeof deleteMessage;
