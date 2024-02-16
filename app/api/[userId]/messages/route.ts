import { NextRequest, NextResponse } from "next/server";
import { prisma } from "@/lib/prisma";
import { corsHeaders } from "@/utils/cors-headers";
import { MessageProps, messageSchema } from "@/schemas/message-schema";

// export async function OPTIONS(req: NextRequest) {
//   // return NextResponse.json({}, { headers: corsHeaders });
//   return NextResponse.json({});
// }

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
      // { status: 400, headers: corsHeaders }
      { status: 400 }
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
      // { status: 404, headers: corsHeaders }
      { status: 404 }
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
      // { status: 200, headers: corsHeaders }
      { status: 200 }
    );
  } catch (error) {
    return NextResponse.json(
      { error: true, message: "Something went wrong", data: error },
      // { status: 400, headers: corsHeaders }
      { status: 400 }
    );
  }
}
