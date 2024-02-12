"use server";

import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { MediaProps, mediaSchema } from "@/schemas/media-schema";
import { revalidatePath } from "next/cache";

export async function editMedia({
  mediaId,
  values,
}: {
  mediaId: string;
  values: MediaProps;
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const parsedBody = mediaSchema.safeParse(values);

  if (!parsedBody.success) {
    const { error } = parsedBody;

    return { error: "Invalid request", data: error };
  }

  const { data } = parsedBody;
  const { imageTitle, altText, imageUrl, imageId } = data;

  try {
    const response = await prisma.media.update({
      where: {
        id_userId: {
          id: mediaId,
          userId: userId,
        },
      },
      data: {
        imageTitle,
        altText,
      },
    });

    revalidatePath("/", "layout");

    return { success: "Category edited", data: response };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
