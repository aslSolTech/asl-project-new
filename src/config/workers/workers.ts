import { emailWorker } from "./emailWorker.js";
import { reportWorker } from "./reportWorker.js";
import { mediaWorker } from "./mediaWorker.js";
import { logger } from "../logger/logger.js";

export const startAllWorkers = () => {
  logger.info("Initializing BullMQ background workers (emailWorker, reportWorker, mediaWorker)...");
  // Workers auto-start on instantiation in BullMQ
};

export const closeAllWorkers = async () => {
  logger.info("Closing all BullMQ workers cleanly...");
  await Promise.all([
    emailWorker.close(),
    reportWorker.close(),
    mediaWorker.close(),
  ]);
  logger.info("All BullMQ workers shut down.");
};

export { emailWorker, reportWorker, mediaWorker };
