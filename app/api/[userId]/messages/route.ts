import { prisma } from "@/lib/prisma";
import { MessageProps, messageSchema } from "@/schemas/message-schema";
import { NextRequest, NextResponse } from "next/server";

const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Methods": "GET, POST, PUT, DELETE, OPTIONS",
  "Access-Control-Allow-Headers": "Content-Type, Authorization",
};

export async function OPTIONS(req: NextRequest) {
  return NextResponse.json({}, { headers: corsHeaders });
}

export async function POST(
  request: NextRequest,
  { params }: { params: { userId: string } }
) {
  const userId = params.userId;

  // if (!userId) {
  //   return NextResponse.json(
  //     { error: true, message: "User ID not found" },
  //     {
  //       status: 400,
  //       headers: corsHeaders,
  //     }
  //   );
  // }

  const body = await request.json();

  const parsedBody = messageSchema.safeParse(body);

  if (!parsedBody.success) {
    const { errors } = parsedBody.error;

    return NextResponse.json(
      { error: true, message: "Invalid request", data: errors },
      { status: 400, headers: corsHeaders }
    );
  }

  const { data } = parsedBody;

  const { name, email, phoneNumber, subject, message } = data;

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

  try {
    const response = await prisma.message.create({
      data: {
        username: name,
        email,
        phoneNumber,
        subject,
        message,
        userId,
      },
    });

    return NextResponse.json(
      {
        success: true,
        message: "Message submitted successfully",
      },
      { status: 200, headers: corsHeaders }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      { status: 400, headers: corsHeaders }
    );
  }
}
