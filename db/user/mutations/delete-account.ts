"use server";

import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import cloudinary from "@/lib/cloudinary";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import {
  DeleteAccountProps,
  deleteAccountSchema,
} from "@/schemas/settings-schema";

export async function deleteAccount({
  values,
}: {
  values: DeleteAccountProps;
}) {
  const session = await getAuthSession();

  const isUser = session?.user.role === "USER";

  if (!isUser) {
    return { error: "Unauthorized" };
  }

  const userId = session.user.id;

  const accountResponse = await prisma.user.findUnique({
    where: {
      id: userId,
    },
  });

  if (!accountResponse) {
    return { error: "Account not found" };
  }

  const parsedBody = deleteAccountSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { confirmPassword } = data;

  const passwordMatched = await bcrypt.compare(
    confirmPassword,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password", errorType: "confirmPassword" };
  }

  const responseLogoImage = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      logoId: true,
    },
  });

  const responseMediaImages = await prisma.media.findMany({
    where: {
      userId: userId,
    },
    select: {
      imageId: true,
    },
  });

  const mediaImages = responseMediaImages.flatMap((image) => image.imageId);

  try {
    const response = await prisma.user.delete({
      where: {
        id: userId,
      },
    });

    if (responseLogoImage?.logoId) {
      try {
        const profileImageDelete = await cloudinary.v2.uploader.destroy(
          responseLogoImage.logoId
        );

        console.log("profileImageDelete", profileImageDelete);
      } catch (error) {
        console.log("Profile image delete error", error);
      }
    }

    if (mediaImages.length) {
      try {
        const mediaImagesDelete = await cloudinary.v2.api.delete_resources(
          mediaImages
        );

        console.log("mediaImagesDelete", mediaImagesDelete);
      } catch (error) {
        console.log("Posts image delete error", error);
      }
    }

    revalidatePath("/", "layout");

    return { success: "Account deleted" };
  } catch (error) {
    console.log("error", error);

    return { error: "Something went wrong", data: error };
  }
}
