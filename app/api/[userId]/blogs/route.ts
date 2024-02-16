import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  const userResponse = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!userResponse) {
    return NextResponse.json(
      { error: true, message: "User not found" },
      { status: 404 }
    );
  }

  try {
    const response = await prisma.blog.findMany({
      where: {
        userId: userId,
        published: true,
      },
      select: {
        id: true,
        author: true,
        slug: true,
        categories: true,
        title: true,
        featuredImage: {
          select: {
            imageUrl: true,
            imageTitle: true,
            altText: true,
          },
        },
        metaDescription: true,
        createdAt: true,
        updatedAt: true,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json(
      { success: true, data: response },
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
