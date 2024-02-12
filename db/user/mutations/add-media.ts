"use server";

import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { MediaProps, mediaSchema } from "@/schemas/media-schema";
import { revalidatePath } from "next/cache";

export async function addMedia({ values }: { values: MediaProps }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = mediaSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { imageUrl, imageId, imageTitle, altText } = data;

  try {
    const response = await prisma.media.create({
      data: {
        imageUrl,
        imageId,
        imageTitle,
        altText,
        userId,
      },
    });

    revalidatePath("/", "layout");

    return {
      success: "Media added successfully",
      data: response,
    };
  } catch (error) {
    return {
      error: "Something went wrong",
      data: error,
    };
  }
}
