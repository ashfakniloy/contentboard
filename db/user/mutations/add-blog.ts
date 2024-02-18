"use server";

import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { BlogProps, blogSchema } from "@/schemas/blog-schema";
import { getDescription } from "@/utils/get-description";
import escapeStringRegexp from "escape-string-regexp";
import { revalidatePath } from "next/cache";

export async function addBlog({ values }: { values: BlogProps }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = blogSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const {
    title,
    slug,
    body,
    author,
    categories,
    featuredImage,
    metaDescription,
    published,
    bodyImages,
  } = data;

  const escapedTitle = escapeStringRegexp(title);
  const escapedSlug = escapeStringRegexp(slug);

  const titleExist = await prisma.blog.findFirst({
    where: {
      title: {
        equals: escapedTitle,
        mode: "insensitive",
      },
      AND: {
        userId,
      },
    },
  });

  if (titleExist) {
    return { error: "Title already exists", errorType: "title" };
  }

  const slugExist = await prisma.blog.findFirst({
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
    return { error: "Slug already exists", errorType: "slug" };
  }

  try {
    const response = await prisma.blog.create({
      data: {
        title,
        slug,
        body,
        author,
        categories,
        metaDescription,
        published,
        featuredImage: {
          imageId: featuredImage.imageId,
          imageUrl: featuredImage.imageUrl,
          imageTitle: featuredImage.imageTitle,
          altText: featuredImage.altText,
        },
        userId: userId,
      },
    });

    if (response.id) {
      const imageExist = await prisma.media.findFirst({
        where: {
          imageUrl: featuredImage.imageUrl,
          AND: {
            userId: userId,
          },
        },
      });

      const responseMedia =
        !imageExist &&
        (await prisma.media.create({
          data: {
            ...featuredImage,
            userId: userId,
          },
        }));

      if (bodyImages) {
        const imagesUrl = bodyImages.map((image) => image.imageUrl);

        const imagesExist = await prisma.media.findMany({
          where: {
            imageUrl: {
              in: imagesUrl,
            },
            AND: {
              userId: userId,
            },
          },
        });

        // console.log("imagesExist", imagesExist);

        const imagesToSubmit = bodyImages
          .filter(
            (bodyImage) =>
              !imagesExist.some(
                (existingImage) => existingImage.imageUrl === bodyImage.imageUrl
              )
          )
          .map((filteredImage) => ({ ...filteredImage, userId }));

        const responseMedias =
          imagesToSubmit.length > 0 &&
          (await prisma.media.createMany({
            data: imagesToSubmit,
          }));

        console.log("response media", responseMedias);
      }
    }

    revalidatePath("/", "layout");

    return {
      success: "Blog created successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
