import { register as registerEnv } from "@/lib/env";

export async function register() {
  await registerEnv();

  if (process.env.NODE_ENV === "development") {
    await require("pino");
    await require("next-logger");
  }
}
