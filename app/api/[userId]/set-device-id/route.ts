import { prisma } from "@/lib/prisma";
import { cookies } from "next/headers";
import { NextRequest, NextResponse } from "next/server";
import { v4 as uuidv4, validate as uuidValidate } from "uuid";

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
      { status: 404, headers: corsHeaders }
    );
  }

  const visitorId = cookies().get("visitorId")?.value;

  if (!visitorId || !uuidValidate(visitorId)) {
    const newvisitorId = uuidv4();
    cookies().set("visitorId", newvisitorId, { httpOnly: true });

    return NextResponse.json({ newvisitorId }, { headers: corsHeaders });
  }

  return NextResponse.json({});
}
