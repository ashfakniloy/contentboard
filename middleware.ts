import { NextRequest, NextResponse } from "next/server";
import { getToken } from "next-auth/jwt";
import type { Session } from "next-auth";

export default async function middleware(req: NextRequest) {
  const { origin, pathname } = req.nextUrl;

  const secret = process.env.NEXTAUTH_SECRET;

  const token = (await getToken({ req, secret })) as Session | null;
  // console.log("token from middleware", token);

  const isAdmin =
    token?.user.role === "ADMIN" || token?.user.role === "GUEST_ADMIN";

  // const isUser = token?.user.role === "USER";
  const isUser =
    token?.user.role === "USER" || token?.user.role === "GUEST_USER";

  if (pathname.includes("/admin")) {
    //for admin
    if (pathname !== "/admin/signin") {
      if (!isAdmin) {
        const adminRedirectPath =
          pathname === `/admin`
            ? `${origin}/admin/signin`
            : `${origin}/admin/signin?callback_url=${pathname}`;

        return NextResponse.redirect(new URL(adminRedirectPath, req.url));
      }
    } else {
      if (isAdmin) {
        return NextResponse.redirect(new URL(`${origin}/admin`, req.url));
      }
    }
  } else {
    // for user
    if (pathname !== "/signin" && pathname !== "/signup") {
      if (!isUser) {
        const userRedirectPath =
          pathname === "/"
            ? `${origin}/signin`
            : `${origin}/signin?callback_url=${pathname}`;

        return NextResponse.redirect(new URL(userRedirectPath, req.url));
      }
    } else {
      if (isUser) {
        return NextResponse.redirect(new URL(origin, req.url));
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api/ (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - images (for opengraph image only)
     * - favicon.ico (favicon file)
     */
    "/((?!api/|_next/static|_next/image|images|favicon.ico).*)",
    // "/((?!api|_next/static|_next/image|favicon.ico).*)",
  ],
};
