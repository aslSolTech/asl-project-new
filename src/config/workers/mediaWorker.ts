import { Worker, type Job } from "bullmq";
import { redisOptions } from "../redis/redis.js";
import { logger } from "../logger/logger.js";
import { processImageInWorkerThread } from "../images/imgConfig.js";
import { uploadToCloudStorage, uploadUserDocument } from "../storage/s3Storage.js";
import type {
  CompressImagePayload,
  ConvertImageFormatPayload,
  ResizeImagePayload,
  CreateZipArchivePayload,
  WatermarkAndUploadPayload,
} from "../jobsqueue/jobTypes.js";

type MediaJobPayload =
  | CompressImagePayload
  | ConvertImageFormatPayload
  | ResizeImagePayload
  | CreateZipArchivePayload
  | WatermarkAndUploadPayload;

export const mediaWorker = new Worker<MediaJobPayload>(
  "media-queue",
  async (job: Job<MediaJobPayload>) => {
    logger.info({ jobId: job.id, name: job.name }, "Processing media job in BullMQ worker");

    switch (job.name) {
      case "watermarkAndUploadImage": {
        const {
          imageBufferBase64,
          category,
          userId,
          location,
          timestamp,
          skipWatermark,
          watermarkText,
          folder,
          existingKey,
        } = job.data as WatermarkAndUploadPayload;

        const rawBuffer = Buffer.from(imageBufferBase64, "base64");
        const currentCategory = category || "PRODUCT";

        // 1. Offload heavy Sharp watermarking & PNG conversion to node:worker_threads OS Thread!
        const processedPngBuffer = await processImageInWorkerThread({
          imageBuffer: rawBuffer,
          category: currentCategory,
          userId,
          location,
          timestamp,
          skipWatermark,
          watermarkText: watermarkText || "© My App",
          outputFormat: "png",
          quality: 80,
        });

        // 2. If userId is provided, use User Onboarding Folder Hierarchy with Auto-Delete of Old Version
        if (userId) {
          const docType = (currentCategory === "PRODUCT" || currentCategory === "GALLERY" ? "AVATAR" : currentCategory) as any;

          const result = await uploadUserDocument({
            buffer: processedPngBuffer,
            userId,
            docType,
            contentType: "image/png",
            existingKey, // Automatically deletes old file version on re-upload/update!
          });

          logger.info({ jobId: job.id, userId, key: result.key, isPrivate: result.isPrivate }, "User document uploaded to user folder");
          return result;
        }

        // 3. General Public Uploads (Logos, Banners, Products without specific user ID)
        const cloudUrl = await uploadToCloudStorage({
          buffer: processedPngBuffer,
          fileName: `${Date.now()}.png`,
          contentType: "image/png",
          folder: folder || currentCategory.toLowerCase(),
          isPublic: true,
        });

        logger.info({ jobId: job.id, cloudUrl, category: currentCategory }, "Image processed & uploaded publicly to Cloud Storage");
        return { url: cloudUrl, isPrivate: false };
      }

      case "compressImage": {
        const { inputPath, outputPath, quality } = job.data as CompressImagePayload;
        logger.info({ jobId: job.id, inputPath, outputPath, quality }, "Compressing image");
        break;
      }
      case "convertImageFormat": {
        const { inputPath, outputPath, format } = job.data as ConvertImageFormatPayload;
        logger.info({ jobId: job.id, inputPath, outputPath, format }, "Converting image format");
        break;
      }
      case "resizeImage": {
        const { inputPath, outputPath, width, height } = job.data as ResizeImagePayload;
        logger.info({ jobId: job.id, inputPath, outputPath, width, height }, "Resizing image");
        break;
      }
      case "createZipArchive": {
        const { filePaths, zipOutputPath } = job.data as CreateZipArchivePayload;
        logger.info({ jobId: job.id, count: filePaths.length, zipOutputPath }, "Creating ZIP archive");
        break;
      }
      default:
        logger.warn({ jobId: job.id, name: job.name }, "Unknown media job type");
    }
  },
  {
    connection: redisOptions,
    concurrency: 2, // Low concurrency to protect CPU/RAM resources during image processing
  }
);

mediaWorker.on("completed", (job) => {
  logger.info({ jobId: job.id }, "Media worker completed job");
});

mediaWorker.on("failed", (job, err) => {
  logger.error({ jobId: job?.id, err }, "Media worker failed job");
});
