import { z } from "zod";

const envSchema = z.object({
  // App
  APP_ENV: z.enum(["development", "production"]),

  // Auth
  BETTER_AUTH_SECRET: z.string(),
  BETTER_AUTH_URL: z.string(),
  DISCORD_CLIENT_ID: z.string(),
  DISCORD_CLIENT_SECRET: z.string(),

  // Logging
  LOG_LEVEL: z.enum(["debug", "info", "warn", "error", "fatal", "trace"]),

  // Loki
  LOG_LOKI_URL: z.string(),
});

export const validateEnv = () => envSchema.safeParse(process.env);

export const constructEnvErrorMessages = (error: z.ZodError): string[] => {
  const prettyError = z.prettifyError(error);
  return prettyError.split("\n").filter((line) => line.trim() !== "");
};

export async function register() {
  const envValidationResult = validateEnv();

  if (!envValidationResult.success) {
    const errorMessages = constructEnvErrorMessages(envValidationResult.error);
    throw new Error(
      `\n\n❌ Error in loading environment variables:\n${errorMessages.join("\n")}\n`,
    );
  }
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
