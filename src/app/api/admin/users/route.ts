import { headers } from "next/headers";
import type { NextRequest } from "next/server";
import { NextResponse } from "next/server";
import { auth } from "@/lib/auth";
import { logger } from "@/lib/logger";
import { prisma } from "@/lib/prisma";

export async function GET(request: NextRequest) {
  try {
    logger.info("Requesting /api/admin/users");

    const session = await auth.api.getSession({
      headers: await headers(),
    });

    if (!session?.user || session.user.role !== "admin") {
      logger.info("Unauthorized request to /api/admin/users");
      return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const searchParams = request.nextUrl.searchParams;
    const page = Number.parseInt(searchParams.get("page") || "1", 10);
    const limit = Number.parseInt(searchParams.get("limit") || "10", 10);
    const search = searchParams.get("search") || "";
    const role = searchParams.get("role") || "";
    const banned = searchParams.get("banned") || "";

    const skip = (page - 1) * limit;

    // Build where clause
    type WhereClause = {
      OR?: Array<{
        name?: { contains: string; mode: "insensitive" };
        email?: { contains: string; mode: "insensitive" };
        id?: { contains: string; mode: "insensitive" };
      }>;
      role?: string;
      banned?: boolean;
    };
    const where: WhereClause = {};

    if (search) {
      where.OR = [
        { name: { contains: search, mode: "insensitive" } },
        { email: { contains: search, mode: "insensitive" } },
        { id: { contains: search, mode: "insensitive" } },
      ];
    }

    if (role) {
      where.role = role;
    }

    if (banned) {
      where.banned = banned === "true";
    }

    // Get users with pagination
    const [users, total] = await Promise.all([
      prisma.user.findMany({
        where,
        skip,
        take: limit,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          email: true,
          role: true,
          banned: true,
          banReason: true,
          banExpires: true,
          createdAt: true,
          updatedAt: true,
          emailVerified: true,
          image: true,
          isAnonymous: true,
          _count: {
            select: {
              sessions: true,
            },
          },
        },
      }),
      prisma.user.count({ where }),
    ]);

    return NextResponse.json({
      users,
      pagination: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    });
  } catch (error) {
    console.error("Error fetching users:", error);
    return NextResponse.json(
      { error: "Failed to fetch users" },
      { status: 500 },
    );
  }
}
