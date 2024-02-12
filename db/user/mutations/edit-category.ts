"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { CategoryProps, categorySchema } from "@/schemas/category-schema";
import escapeStringRegexp from "escape-string-regexp";

export async function editCategory({
  categoryId,
  values,
}: {
  categoryId: string;
  values: CategoryProps;
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  if (!categoryId) {
    return { error: "Need to pass category Id" };
  }

  const userId = session.user.id;

  const parsedBody = categorySchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { categoryName, description, slug } = data;

  const escapedCategoryName = escapeStringRegexp(categoryName);
  const escapedSlug = escapeStringRegexp(slug);

  const categoryExists = await prisma.category.findFirst({
    where: {
      categoryName: {
        equals: escapedCategoryName,
        mode: "insensitive",
      },
      AND: {
        userId,
      },
      NOT: {
        id: categoryId,
      },
    },
  });

  if (categoryExists) {
    return { error: "Category already exists", errorType: "categoryName" };
  }

  const slugExist = await prisma.category.findFirst({
    where: {
      slug: {
        equals: escapedSlug,
        mode: "insensitive",
      },
      AND: {
        userId,
      },
      NOT: {
        id: categoryId,
      },
    },
  });

  if (slugExist) {
    return { error: "Category slug already exists", errorType: "slug" };
  }

  try {
    const response = await prisma.category.update({
      where: {
        id_userId: {
          id: categoryId,
          userId: userId,
        },
      },
      data: {
        categoryName,
        slug,
        description,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: "Category updated successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
