import { prisma } from "@/lib/prisma";

export async function getMedias({ userId }: { userId: string }) {
  const medias = await prisma.media.findMany({
    where: {
      userId: userId,
    },
    orderBy: {
      createdAt: "desc",
    },
  });

  const mediasCount = await prisma.media.count({
    where: {
      userId: userId,
    },
  });

  return { medias, mediasCount };
}
