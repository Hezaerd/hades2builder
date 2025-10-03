import type { NextRequest } from "next/request";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";

// Define admin-only tabs
const ADMIN_ONLY_TABS = ["users", "database"];

export async function middleware(request: NextRequest) {
  const url = request.nextUrl;

  // Check if this is a dashboard request with a tab parameter
  if (url.pathname === "/dashboard") {
    const tab = url.searchParams.get("tab");

    // If accessing an admin-only tab
    if (tab && ADMIN_ONLY_TABS.includes(tab)) {
      try {
        // Get session from the request
        const session = await auth.api.getSession({
          headers: request.headers,
        });

        // If no session or user is not admin, redirect to overview
        if (!session?.user || session.user.role !== "admin") {
          const redirectUrl = new URL("/dashboard", request.url);
          redirectUrl.searchParams.set("tab", "overview");
          return NextResponse.redirect(redirectUrl);
        }
      } catch (error) {
        // If there's an error getting the session, redirect to overview
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
