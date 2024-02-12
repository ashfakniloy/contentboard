"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import cloudinary from "@/lib/cloudinary";

export async function deleteMedia({ mediaId }: { mediaId: string | string[] }) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  if (!mediaId) {
    return { error: "Need to pass category Id" };
  }

  const userId = session.user.id;

  if (typeof mediaId === "string") {
    try {
      const response = await prisma.media.delete({
        where: {
          id_userId: {
            id: mediaId,
            userId: userId,
          },
        },
      });

      if (response.imageId) {
        await cloudinary.v2.uploader.destroy(response.imageId);
      }

      revalidatePath("/", "layout");

      return {
        success: `Media ${response.imageTitle} deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }

  if (Array.isArray(mediaId)) {
    const responseMediaImages = await prisma.media.findMany({
      where: {
        id: {
          in: mediaId,
        },
      },
      select: {
        imageId: true,
      },
    });

    const mediaImages = responseMediaImages.flatMap((image) => image.imageId);

    try {
      const response = await prisma.media.deleteMany({
        where: {
          id: {
            in: mediaId,
          },
          userId: userId,
        },
      });

      // console.log("multiple", response);

      if (response.count > 0) {
        const imagesdelete = await cloudinary.v2.api.delete_resources(
          mediaImages
        );
        // console.log("imagesDelete", imagesdelete);
      }

      revalidatePath("/", "layout");

      return {
        success: `${mediaId.length} media deleted`,
        data: response,
      };
    } catch (error) {
      return { error: "Something went wrong", data: error };
    }
  }
}
