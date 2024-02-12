import { PER_PAGE } from "@/config";
import { prisma } from "@/lib/prisma";
import escapeStringRegexp from "escape-string-regexp";

export async function getMessages({
  userId,
  sortBy,
  orderBy,
  limitNumber,
  pageNumber,
  username,
}: {
  userId: string;
  sortBy?: string;
  orderBy?: string;
  limitNumber?: number;
  pageNumber?: number;
  username?: string;
}) {
  const currentPage = Math.max(pageNumber || 1, 1);

  const escapedUsername = username && escapeStringRegexp(username);

  const sortCase = () => {
    switch (sortBy) {
      case "username":
        return {
          username: orderBy,
        };
      case "email":
        return {
          email: orderBy,
        };
      case "phoneNumber":
        return {
          phoneNumber: orderBy,
        };
      case "subject":
        return {
          subject: orderBy,
        };
      case "message":
        return {
          message: orderBy,
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

  const messages = await prisma.message.findMany({
    orderBy: sorting || {
      createdAt: "desc",
    },
    where: {
      userId: userId,
      username: {
        startsWith: escapedUsername,
        mode: "insensitive",
      },
    },

    take: take,
    skip: skip,
  });

  const messagesCount = await prisma.message.count({
    where: {
      userId: userId,
      username: {
        startsWith: escapedUsername,
        mode: "insensitive",
      },
    },
  });

  return { messages, messagesCount };
}
