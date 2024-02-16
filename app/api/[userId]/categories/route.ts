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
    const response = await prisma.category.findMany({
      where: {
        userId: userId,
      },
      //
      orderBy: {
        categoryName: "asc",
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
