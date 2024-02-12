"use server";

import cloudinary from "@/lib/cloudinary";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { LogoProps, logoSchema } from "@/schemas/settings-schema";
import { revalidatePath } from "next/cache";

export async function changeLogo({ values }: { values: LogoProps }) {
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

  const parsedBody = logoSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { logoUrl, logoId } = data;

  const currentLogo = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      logoId: true,
      logoUrl: true,
    },
  });

  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        logoUrl: logoUrl,
        logoId: logoId,
      },
      select: {
        logoUrl: true,
      },
    });

    if (currentLogo?.logoId) {
      await cloudinary.v2.uploader.destroy(currentLogo.logoId);
    }

    revalidatePath("/", "layout");

    return { success: "Logo changed", data: response };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
