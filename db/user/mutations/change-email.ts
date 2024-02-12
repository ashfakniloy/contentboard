"use server";

import { getAuthSession } from "@/lib/next-auth";
import { prisma } from "@/lib/prisma";
import { EmailProps, emailSchema } from "@/schemas/settings-schema";
import { revalidatePath } from "next/cache";
import bcrypt from "bcrypt";
import escapeStringRegexp from "escape-string-regexp";

export async function changeEmail({ values }: { values: EmailProps }) {
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

  const parsedBody = emailSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { email, password } = data;

  const escapedEmail = escapeStringRegexp(email);

  const emailExist = await prisma.user.findFirst({
    where: {
      email: {
        equals: escapedEmail,
        mode: "insensitive",
      },
      NOT: {
        id: userId,
      },
    },
  });

  if (emailExist) {
    return { error: "Email already exists", errorType: "email" };
  }

  const passwordMatched = await bcrypt.compare(
    password,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password", errorType: "password" };
  }

  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: {
        email: email,
      },
      select: {
        email: true,
      },
    });

    revalidatePath("/", "layout");

    return { success: "Email changed", data: response };
  } catch (error) {
    return { error: "Something went wrong", data: error };
  }
}
