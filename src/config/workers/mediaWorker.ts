import { Worker, type Job } from 'bullmq';
import { redisOptions } from '../redis/redis.js';
import { logger } from '../logger/logger.js';
import { processImageInWorkerThread } from '../images/imgConfig.js';
import { uploadToCloudStorage, uploadUserDocument, type UserDocumentUploadOptions } from '../storage/s3Storage.js';
import type { CreateZipArchivePayload, WatermarkAndUploadPayload } from '../jobsqueue/jobTypes.js';

type MediaJobPayload = CreateZipArchivePayload | WatermarkAndUploadPayload;

export const mediaWorker = new Worker<MediaJobPayload>(
  'media-queue',
  async (job: Job<MediaJobPayload>) => {
    logger.info({ jobId: job.id, name: job.name }, 'Processing media job in BullMQ worker');

    switch (job.name) {
      case 'watermarkAndUploadImage': {
        const { imageBufferBase64, category = 'GALLERY', userId, location, timestamp, skipWatermark, watermarkText, folder, existingKey } = job.data as WatermarkAndUploadPayload;

        const currentCategory = category;

        // 1. Offload heavy Sharp watermarking & PNG conversion to node:worker_threads OS Thread!
        const processedPngBuffer = await processImageInWorkerThread({
          imageBufferBase64,
          category: currentCategory,
          userId,
          location,
          timestamp,
          skipWatermark,
          watermarkText: watermarkText || '© My App',
          outputFormat: 'png',
          quality: 80,
        });

        // 2. If userId is provided, use User Onboarding Folder Hierarchy with Auto-Delete of Old Version
        if (userId) {
          const docType = currentCategory as UserDocumentUploadOptions['docType'];

          const result = await uploadUserDocument({
            buffer: processedPngBuffer,
            userId,
            docType,
            contentType: 'image/png',
            existingKey, // Automatically deletes old file version on re-upload/update!
          });

          logger.info({ jobId: job.id, userId, key: result.key, isPrivate: result.isPrivate }, 'User document uploaded to user folder');
          return result;
        }

        // 3. General Public Uploads (Logos, Banners, Products without specific user ID)
        const folderName = folder || currentCategory.toLowerCase();

        const cloudUrl = await uploadToCloudStorage({
          buffer: processedPngBuffer,
          fileName: `${folderName}-${Date.now()}.png`,
          contentType: 'image/png',
          folder: folderName,
          isPublic: true,
        });

        logger.info({ jobId: job.id, cloudUrl, folderName }, 'Image processed & uploaded publicly to Cloud Storage');
        return { url: cloudUrl, isPrivate: false };
      }

      // separate job for create zip files
      case 'createZipArchive': {
        const { filePaths, zipOutputPath } = job.data as CreateZipArchivePayload;
        logger.info({ jobId: job.id, count: filePaths.length, zipOutputPath }, 'Creating ZIP archive.');
        break;
      }
      default:
        logger.warn({ jobId: job.id, name: job.name }, 'Unknown media job type');
    }
  },
  {
    connection: redisOptions,
    concurrency: 2, // Low concurrency to protect CPU/RAM resources during image processing
  },
);

mediaWorker.on('completed', (job) => {
  logger.info({ jobId: job.id }, 'Media worker completed job');
});

mediaWorker.on('failed', (job, err) => {
  logger.error({ jobId: job?.id, err }, 'Media worker failed job');
});
