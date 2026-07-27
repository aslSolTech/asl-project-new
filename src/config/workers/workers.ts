import { emailWorker } from "./emailWorker.js";
import { reportWorker } from "./reportWorker.js";
import { mediaWorker } from "./mediaWorker.js";
import { logger } from "../logger/logger.js";

export const startAllWorkers = () => {
  logger.info("Initializing BullMQ background workers...!");
  // Workers auto-start on instantiation in BullMQ
};

export const closeAllWorkers = async () => {
  logger.info("Closing all BullMQ workers cleanly...!");
  await Promise.all([
    emailWorker.close(),
    reportWorker.close(),
    mediaWorker.close(),
  ]);
  logger.info("All BullMQ workers shut down!");
};


// BullMQ Health Check
export const getWorkersHealth = () => {
  const email = emailWorker.isRunning() ? "RUNNING" : "STOPPED";
  const report = reportWorker.isRunning() ? "RUNNING" : "STOPPED";
  const media = mediaWorker.isRunning() ? "RUNNING" : "STOPPED";
  const isHealthy = email === "RUNNING" && report === "RUNNING" && media === "RUNNING";

  return {
    status: isHealthy ? "RUNNING" : "DEGRADED",
    workers: {
      emailWorker: email,
      reportWorker: report,
      mediaWorker: media,
    },
  };
};

export { emailWorker, reportWorker, mediaWorker };
