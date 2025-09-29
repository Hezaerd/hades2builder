import { z } from "zod";

const envSchema = z.object({
  APP_ENV: z
    .enum(["development", "production"])
    .describe("The environment of the application is running in"),

  BETTER_AUTH_SECRET: z.string().describe("The secret key for better-auth"),
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

  console.info("✅ Environment variables loaded successfully");
}

declare global {
  namespace NodeJS {
    interface ProcessEnv extends z.infer<typeof envSchema> {}
  }
}
