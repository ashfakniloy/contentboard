"use server";

import { revalidatePath } from "next/cache";
import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { UsernameProps, usernameSchema } from "@/schemas/settings-schema";

export async function changeUsername({ values }: { values: UsernameProps }) {
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

  const parsedBody = usernameSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { username } = data;

  const usernameExist = await prisma.user.findFirst({
    where: {
      username: {
        equals: username,
        mode: "insensitive",
      },
      NOT: {
        id: userId,
      },
    },
  });

  if (usernameExist) {
    return { error: "Username already exists", errorType: "username" };
  }

  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        username: username,
      },
      select: {
        username: true,
      },
    });

    revalidatePath("/", "layout");

    return { success: "Username changed", data: response };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
