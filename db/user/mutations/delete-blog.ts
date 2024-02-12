"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteBlog({
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
    return { error: "Need to pass blog Id" };
  }

  const userId = session.user.id;

  if (typeof deleteId === "string") {
    try {
      const response = await prisma.blog.delete({
        where: {
          id_userId: {
            id: deleteId,
            userId: userId,
          },
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `Blog deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await prisma.blog.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
          userId: userId,
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `${deleteId.length} blogs deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}

export type DeleteBlogProps = typeof deleteBlog;
