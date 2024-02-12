"use server";

import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { CategoryProps, categorySchema } from "@/schemas/category-schema";
import escapeStringRegexp from "escape-string-regexp";
import { revalidatePath } from "next/cache";

export async function addCategory({ values }: { values: CategoryProps }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = categorySchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { categoryName, slug, description } = data;

  const escapedCategoryName = escapeStringRegexp(categoryName);
  const escapedSlug = escapeStringRegexp(slug);

  const categoryExist = await prisma.category.findFirst({
    where: {
      categoryName: {
        equals: escapedCategoryName,
        mode: "insensitive",
      },
      AND: {
        userId,
      },
    },
  });

  if (categoryExist) {
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
    },
  });

  if (slugExist) {
    return { error: "Category slug already exists", errorType: "slug" };
  }

  try {
    const response = await prisma.category.create({
      data: {
        categoryName,
        slug,
        description,
        userId,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: "Category created successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
