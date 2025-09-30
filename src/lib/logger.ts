import pino, { type Logger } from "pino";

const prettyTransport: pino.TransportSingleOptions = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  },
};

const lokiTransport: pino.TransportSingleOptions = {
  target: "pino-loki",
  options: {
    host: process.env.LOG_LOKI_URL,

    labels: { app: "next-app" },
  },
};

const devOptions: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || "debug",
  transport: prettyTransport,
};

const prodOptions: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL || "info",
  transport: lokiTransport,
};

export const logger: Logger = pino(
  process.env.NODE_ENV === "development" ? devOptions : prodOptions,
);
