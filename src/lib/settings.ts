import type { Theme } from "@/generated/prisma/client";
import { prisma } from "@/lib/prisma";

/**
 * Get or create user settings for a given user ID.
 * This function is idempotent - it will create default settings if none exist.
 */
export async function getOrCreateUserSettings(userId: string) {
  let settings = await prisma.userSettings.findUnique({
    where: { userId },
  });

  if (!settings) {
    settings = await prisma.userSettings.create({
      data: {
        userId,
        theme: "DARK", // Default theme
      },
    });
  }

  return settings;
}

/**
 * Update user settings for a given user ID.
 */
export async function updateUserSettings(
  userId: string,
  data: { theme?: Theme },
) {
  // Ensure settings exist first
  await getOrCreateUserSettings(userId);

  const settings = await prisma.userSettings.update({
    where: { userId },
    data,
  });

  return settings;
}

/**
 * Get user settings without creating default record.
 * Returns null if settings don't exist.
 */
export async function getUserSettings(userId: string) {
  return prisma.userSettings.findUnique({
    where: { userId },
  });
}
