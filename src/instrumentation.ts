import type { z } from "zod";
import { constructEnvErrorMessages, validateEnv } from "@/lib/env";

const constructErrorFromZod = (errors: z.ZodError) => {
  const errorMessages = constructEnvErrorMessages(errors);
  return new Error(
    `\n\n❌ Error in loading environment variables:\n${errorMessages.join("\n")}\n`,
  );
};

export async function register() {
  const envValidationResult = validateEnv();

  if (!envValidationResult.success) {
    throw constructErrorFromZod(envValidationResult.error);
  }

  console.info("✅ Environment variables loaded successfully");
}
