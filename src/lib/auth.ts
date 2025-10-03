import { betterAuth } from "better-auth";
import { prismaAdapter } from "better-auth/adapters/prisma";
import { admin, anonymous } from "better-auth/plugins";
import { prisma } from "@/lib/prisma";

export const auth = betterAuth({
  database: prismaAdapter(prisma, {
    provider: "postgresql",
  }),
  account: {
    accountLinking: {
      enabled: true,
    },
  },
  socialProviders: {
    discord: {
      clientId: process.env.DISCORD_CLIENT_ID,
      clientSecret: process.env.DISCORD_CLIENT_SECRET,
    },
  },
  plugins: [
    anonymous(),
    admin({
      defaultRole: "user",
      adminRoles: ["admin"],
    }),
  ],
});

export type Session = typeof auth.$Infer.Session;
