import { prisma } from "@/lib/prisma";

export async function getUserInfo({ userId }: { userId: string }) {
  const user = await prisma.user.findFirst({
    where: {
      id: userId,
    },
    select: {
      username: true,
      email: true,
      logoUrl: true,
    },
  });

  return { user };
}
