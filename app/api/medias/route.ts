import { NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { getAuthSession } from "@/lib/next-auth";

export const dynamic = "force-dynamic";

export async function GET() {
  const session = await getAuthSession();

  if (!session) {
    return NextResponse.json({ error: "Unauthorized" });
  }

  const userId = session.user.id;

  try {
    const medias = await prisma.media.findMany({
      where: {
        userId: userId,
      },
      orderBy: {
        createdAt: "desc",
      },
    });

    return NextResponse.json({ success: true, data: medias });
  } catch (error) {
    console.log("error", error);

    return NextResponse.json({ error: "Something went wrong", data: error });
  }
}
