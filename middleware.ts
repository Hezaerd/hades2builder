import { type NextRequest, NextResponse } from "next/server";
import { auth } from "@/lib/auth";

export const runtime = "nodejs";

const ADMIN_ONLY_TABS = ["users", "database"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  if (url.pathname === "/dashboard") {
    const tab = url.searchParams.get("tab");

    if (tab && ADMIN_ONLY_TABS.includes(tab)) {
      try {
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        if (!session?.user || session.user.role !== "admin") {
          const redirectUrl = new URL("/dashboard", request.url);
          redirectUrl.searchParams.set("tab", "overview");
          return NextResponse.redirect(redirectUrl);
        }
      } catch (error) {
        const redirectUrl = new URL("/dashboard", request.url);
        redirectUrl.searchParams.set("tab", "overview");
        return NextResponse.redirect(redirectUrl);
      }
    }
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/dashboard"],
};
