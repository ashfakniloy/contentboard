"use server";

import bcrypt from "bcrypt";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";
import { PasswordProps, passwordSchema } from "@/schemas/settings-schema";

export async function changePassword({ values }: { values: PasswordProps }) {
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

  const parsedBody = passwordSchema.safeParse(values);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return { error: "Invalid request", data: errors };
  }

  const { data } = parsedBody;
  const { currentPassword, newPassword } = data;

  const passwordMatched = await bcrypt.compare(
    currentPassword,
    accountResponse.password
  );

  if (!passwordMatched) {
    return { error: "Incorrect password", errorType: "currentPassword" };
  }

  const saltValue = await bcrypt.genSalt(10);
  const hashedNewPassword = await bcrypt.hash(newPassword, saltValue);

  try {
    const response = await prisma.user.update({
      where: {
        id: userId,
      },
      data: { password: hashedNewPassword },
    });

    return {
      success: "Password Changed successfully",
    };
  } catch (error) {
    console.log(error);
    return { error: "Something went wrong", data: error };
  }
}
