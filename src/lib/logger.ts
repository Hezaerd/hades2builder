import pino, { type Logger } from "pino";

const devTransport: pino.TransportSingleOptions = {
  target: "pino-pretty",
  options: {
    colorize: true,
    translateTime: "SYS:standard",
    ignore: "pid,hostname",
  },
};

const prodTransport: pino.TransportSingleOptions = {
  target: "pino-loki",
  options: {
    host: process.env.LOG_LOKI_URL,
  },
};

const options: pino.LoggerOptions = {
  level: process.env.LOG_LEVEL,
  transport:
    process.env.NODE_ENV === "development" ? devTransport : prodTransport,
};

export const logger: Logger = pino(options);
