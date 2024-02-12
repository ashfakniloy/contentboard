import { PER_PAGE } from "@/config";
import { prisma } from "@/lib/prisma";
import escapeStringRegexp from "escape-string-regexp";

export async function getBlogs({
  userId,
  sortBy,
  orderBy,
  limitNumber,
  pageNumber,
  title,
}: {
  userId: string;
  sortBy?: string;
  orderBy?: string;
  limitNumber?: number;
  pageNumber?: number;
  title?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const escapedTitle = title && escapeStringRegexp(title);

  const sortCase = () => {
    switch (sortBy) {
      case "title":
        return {
          title: orderBy,
        };
      case "author":
        return {
          author: orderBy,
        };
      case "metaDescription":
        return {
          metaDescription: orderBy,
        };
      case "status":
        return {
          published: orderBy,
        };
      case "created at":
        return {
          createdAt: orderBy,
        };

      default:
        break;
    }
  };

  const sorting = sortCase() as any;

  const take = limitNumber || PER_PAGE;
  const skip = (currentPage - 1) * (limitNumber || PER_PAGE) || 0;

  const blogs = await prisma.blog.findMany({
    orderBy: sorting || {
      createdAt: "desc",
    },
    where: {
      userId: userId,
      title: {
        startsWith: escapedTitle,
        mode: "insensitive",
      },
    },

    take: take,
    skip: skip,
  });

  // console.log("blogs", blogs);

  const blogsCount = await prisma.blog.count({
    where: {
      userId: userId,
      title: {
        startsWith: escapedTitle,
        mode: "insensitive",
      },
    },
  });

  return { blogs, blogsCount };
}
