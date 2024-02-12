"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";

export async function deleteCategory({
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
    return { error: "Need to pass category Id" };
  }

  const userId = session.user.id;

  if (typeof deleteId === "string") {
    try {
      const response = await prisma.category.delete({
        where: {
          id_userId: {
            id: deleteId,
            userId,
          },
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `Category ${response.categoryName} deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(deleteId)) {
    try {
      const response = await prisma.category.deleteMany({
        where: {
          id: {
            in: deleteId,
          },
          userId,
        },
      });

      revalidatePath("/", "layout");

      return {
        success: `${deleteId.length} categories deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}

export type DeleteCategoryProps = typeof deleteCategory;
