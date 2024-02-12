"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { BlogProps, blogSchema } from "@/schemas/blog-schema";
import escapeStringRegexp from "escape-string-regexp";

export async function editBlog({
  blogId,
  values,
}: {
  blogId: string;
  values: BlogProps;
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  if (!blogId) {
    return { error: "Need to pass blog Id" };
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
    body,
    author,
    categories,
    featuredImage,
    metaDescription,
    published,
    slug,
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
      NOT: {
        id: blogId,
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
      NOT: {
        id: blogId,
      },
    },
  });

  if (slugExist) {
    return { error: "Slug already exists", errorType: "slug" };
  }

  try {
    const response = await prisma.blog.update({
      where: {
        id_userId: {
          id: blogId,
          userId: userId,
        },
      },
      data: {
        title,
        body,
        author,
        categories,
        featuredImage,
        metaDescription,
        slug,
        published,
      },
    });

    if (response.id) {
      const imageExist = await prisma.media.findFirst({
        where: {
          imageUrl: featuredImage.imageUrl,
          AND: {
            userId,
          },
        },
      });

      const response =
        !imageExist &&
        (await prisma.media.create({
          data: {
            ...featuredImage,
            userId,
          },
        }));

      console.log("response featured image", response);

      if (bodyImages) {
        const imagesUrl = bodyImages.map((image) => image.imageUrl);

        const imagesExist = await prisma.media.findMany({
          where: {
            imageUrl: {
              in: imagesUrl,
            },
            AND: {
              userId,
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

        const response =
          imagesToSubmit.length > 0 &&
          (await prisma.media.createMany({
            data: imagesToSubmit,
          }));

        console.log("response body images", response);
      }
    }

    revalidatePath("/", "layout");

    return {
      success: "Blog updated successfully",
      data: response,
    };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
