import { prisma } from "@/lib/prisma";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; slug: string } }
) {
  const userId = params.userId;
  const slug = params.slug;

  const userResponse = await prisma.user.findUnique({
    where: {
      id: userId,
    },
    select: {
      id: true,
    },
  });

  if (!userResponse?.id) {
    return NextResponse.json(
      { error: true, message: "User not found" },
      { status: 404, headers: corsHeaders }
    );
  }

  // console.log("slug", slug);

  try {
    const response = await prisma.blog.findFirst({
      where: {
        slug: slug,
        AND: {
          userId: userId,
          published: true,
        },
        // userId: userId,
        // slug: decodedSlug,
        // AND: {
        //   published: true,
        // },
      },
      select: {
        id: true,
        author: true,
        slug: true,
        categories: true,
        title: true,
        body: true,
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
    });

    if (response?.id) {
      return NextResponse.json(
        { success: true, data: response },
        { status: 200, headers: corsHeaders }
      );
    } else {
      return NextResponse.json(
        { error: true, message: "Blog not found" },
        { status: 404, headers: corsHeaders }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      { status: 500, headers: corsHeaders }
    );
  }
}
