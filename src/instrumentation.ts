import { register as registerEnv } from "@/lib/env";
import { logger } from "./lib/logger";

export async function register() {
  await registerEnv();

  if (process.env.NODE_ENV === "development") {
    await require("pino");
    await require("next-logger");
  }

  logger.debug({ magic: "hats" }, "a log line");
}
