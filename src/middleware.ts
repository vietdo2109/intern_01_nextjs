import { NextRequest, NextResponse } from "next/server";
import { decrypt } from "@/lib/session";

export default async function middleware(req: NextRequest) {
  const protectedRoutes = [
    "/dashboard",
    "/todolistnext",
    "/rtl",
    "/quiz",
    "/pomodoro",
    "/gen-ai",
  ];
  const currentPath = req.nextUrl.pathname;
  const isProtectedRoute = protectedRoutes.includes(currentPath);

  if (isProtectedRoute) {
    const cookie = req.cookies.get("session");
    const session = await decrypt(cookie?.value);
    if (!session?.userId) {
      const url = new URL("/login", req.nextUrl);
      url.searchParams.set("message", "unauthenticated");
      return NextResponse.redirect(url);
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/((?!api|_next/static|_next/image|.*\\.png$).*)"],
};
