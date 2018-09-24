import pino from "pino";

export const logger = pino({
  level: "debug",
  prettyPrint: true
});

export const sagaLogger = (level: string, ...args: any[]) => {
  logger.log({ level, message: args.join(" ") });
};
