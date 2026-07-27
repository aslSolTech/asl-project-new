import { Queue, type JobsOptions } from "bullmq";
import { redis, redisOptions } from "../redis/redis.js";
import { logger } from "../logger/logger.js";
import type {
  EmailJobDataMap,
  EmailJobType,
  ReportJobDataMap,
  ReportJobType,
  MediaJobDataMap,
  MediaJobType,
} from "./jobTypes.js";

const defaultJobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: "exponential",
    delay: 5000,
  },
  removeOnComplete: 1000,
  removeOnFail: 500,
};

// Dedicated Queues for Workload Isolation
export const emailQueue = new Queue("email-queue", {
  connection: redisOptions,
  defaultJobOptions,
});

export const reportQueue = new Queue("report-queue", {
  connection: redisOptions,
  defaultJobOptions,
});

export const mediaQueue = new Queue("media-queue", {
  connection: redisOptions,
  defaultJobOptions,
});

// Backward-compatible export
export const mainQueue = reportQueue;

const isRedisAvailable = (): boolean => {
  return redis.status === "ready" || redis.status === "connecting";
};

// Dispatcher Helpers
export const addEmailJob = async <T extends EmailJobType>(
  type: T,
  data: EmailJobDataMap[T],
  opts?: JobsOptions
): Promise<void> => {
  try {
    if (!isRedisAvailable()) {
      logger.warn(`Email job ${String(type)} skipped: Redis is not connected.`);
      return;
    }
    await emailQueue.add(String(type), data, opts);
  } catch (err) {
    logger.error({ err }, `Failed to add email job ${String(type)} to queue`);
  }
};

export const addReportJob = async <T extends ReportJobType>(
  type: T,
  data: ReportJobDataMap[T],
  opts?: JobsOptions
): Promise<void> => {
  try {
    if (!isRedisAvailable()) {
      logger.warn(`Report job ${String(type)} skipped: Redis is not connected.`);
      return;
    }
    await reportQueue.add(String(type), data, opts);
  } catch (err) {
    logger.error({ err }, `Failed to add report job ${String(type)} to queue`);
  }
};

export const addMediaJob = async <T extends MediaJobType>(
  type: T,
  data: MediaJobDataMap[T],
  opts?: JobsOptions
): Promise<void> => {
  try {
    if (!isRedisAvailable()) {
      logger.warn(`Media job ${String(type)} skipped: Redis is not connected.`);
      return;
    }
    await mediaQueue.add(String(type), data, opts);
  } catch (err) {
    logger.error({ err }, `Failed to add media job ${String(type)} to queue`);
  }
};

// Backward-compatible addJob wrapper
export const addJob = async (type: string, data: unknown): Promise<void> => {
  if (type in ({ sendEmail: true } as Record<string, boolean>)) {
    await addEmailJob("sendEmail", data as any);
  } else {
    await addReportJob(type as ReportJobType, data as any);
  }
};