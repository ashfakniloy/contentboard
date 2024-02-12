import { prisma } from "@/lib/prisma";

export async function getMessagesCount({ userId }: { userId: string }) {
  const totalCount = await prisma.message.count({
    where: {
      userId: userId,
    },
  });

  const todayCount = await prisma.message.count({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(Date.now() - 24 * 60 * 60 * 1000),
      },
    },
  });

  const thisMonthCount = await prisma.message.count({
    where: {
      userId: userId,
      createdAt: {
        gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000),
      },
    },
  });

  return { totalCount, todayCount, thisMonthCount };
}
