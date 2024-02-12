import { prisma } from "@/lib/prisma";

export async function getSingleBlog({
  decodedSlug,
  userId,
}: {
  decodedSlug: string;
  userId: string;
}) {
  const blog = await prisma.blog.findFirst({
    where: {
      userId: userId,
      slug: decodedSlug,
    },
  });

  return { blog };
}
