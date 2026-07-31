import { Queue, type JobsOptions } from 'bullmq';
import { redis, redisOptions } from '../redis/redis.js';
import { logger } from '../logger/logger.js';
import type { EmailJobDataMap, EmailJobType, ReportJobDataMap, ReportJobType, MediaJobDataMap, MediaJobType, AllJobDataMap, JobType } from './jobTypes.js';

const defaultJobOptions: JobsOptions = {
  attempts: 3,
  backoff: {
    type: 'exponential',
    delay: 5000,
  },
  removeOnComplete: 500,
  removeOnFail: 1000,
};

// Dedicated Queues for Workload Isolation
export const emailQueue = new Queue('email-queue', {
  connection: redisOptions,
  defaultJobOptions,
});

export const reportQueue = new Queue('report-queue', {
  connection: redisOptions,
  defaultJobOptions,
});

export const mediaQueue = new Queue('media-queue', {
  connection: redisOptions,
  defaultJobOptions,
});

// Backward-compatible export
export const mainQueue = reportQueue;

const isRedisAvailable = (): boolean => {
  return redis.status === 'ready' || redis.status === 'connecting';
};

// Private Internal Dispatcher Helpers
const addEmailJob = async <T extends EmailJobType>(type: T, data: EmailJobDataMap[T], opts?: JobsOptions): Promise<void> => {
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

const addReportJob = async <T extends ReportJobType>(type: T, data: ReportJobDataMap[T], opts?: JobsOptions): Promise<void> => {
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

const addMediaJob = async <T extends MediaJobType>(type: T, data: MediaJobDataMap[T], opts?: JobsOptions): Promise<void> => {
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

// Generic universal job dispatcher wrapper
export const addJob = async <K extends JobType>(type: K, data: AllJobDataMap[K], opts?: JobsOptions): Promise<void> => {
  if (type === 'sendEmail') {
    await addEmailJob(type as EmailJobType, data as EmailJobDataMap[EmailJobType], opts);
  } else if (type === 'compressImage' || type === 'convertImageFormat' || type === 'resizeImage' || type === 'createZipArchive' || type === 'watermarkAndUploadImage') {
    await addMediaJob(type as MediaJobType, data as MediaJobDataMap[MediaJobType], opts);
  } else {
    await addReportJob(type as ReportJobType, data as ReportJobDataMap[ReportJobType], opts);
  }
};
