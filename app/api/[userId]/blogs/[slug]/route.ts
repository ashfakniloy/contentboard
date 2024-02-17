import { NextRequest, NextResponse, userAgent } from "next/server";
import { prisma } from "@/lib/prisma";

export async function GET(
  request: NextRequest,
  { params }: { params: { userId: string; slug: string } }
) {
  const userId = params.userId;
  const slug = params.slug;

  const { device, ua } = userAgent(request);
  const viewport = device.type === "mobile" ? "mobile" : "desktop";
  const ipAdress = request.headers.get("X-Forwarded-For");

  const now = new Date();
  const formattedDate = now.toLocaleDateString("en-US", {
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  });

  const formattedHour = now.getHours().toString().padStart(2, "0");
  const formattedDatetime = `${formattedDate}-${formattedHour}`;

  const visitorId = `${ipAdress}-${ua}-${formattedDatetime}`;

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
      { status: 404 }
    );
  }

  try {
    const response = await prisma.blog.findFirst({
      where: {
        slug: slug,
        AND: {
          userId: userId,
          published: true,
        },
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
      const sentResponse = NextResponse.json(
        { success: true, data: response },
        { status: 200 }
      );

      if (sentResponse.status === 200) {
        try {
          const isViewed = await prisma.blogView.findUnique({
            where: {
              blogId_visitorId: {
                blogId: response.id,
                visitorId: visitorId,
              },
            },
          });

          if (!isViewed) {
            await prisma.blogView.create({
              data: {
                blog: {
                  connect: {
                    id: response.id,
                  },
                },
                user: {
                  connect: {
                    id: userResponse.id,
                  },
                },
                visitorId: visitorId,
                viewport: viewport,
              },
            });
          }
        } catch (error) {
          console.log("view add error", error);
        }
      }

      return sentResponse;
    } else {
      return NextResponse.json(
        { error: true, message: "Blog not found" },
        { status: 404 }
      );
    }
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      { status: 500 }
    );
  }
}
