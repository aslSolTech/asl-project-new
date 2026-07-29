import sharp from 'sharp';
import path from 'node:path';
import { formatISODate } from '../../utils/others/datefns.js';
import { runInWorkerThread } from '../../utils/workerThread/threadRunner.js';

export type ImageCategory =
  'GALLERY' | 'LOGO' | 'BANNER' | 'AVATAR' | 'AADHAR' | 'PAN' | 'VOTER_ID' | 'PASSPORT' | 'DRIVING_LICENSE' | 'BANK_STATEMENT' | 'CHEQUE' | 'GST' | 'KYC_DOC';

export interface WatermarkOptions {
  imageBuffer: Buffer;
  watermarkBuffer?: Buffer | undefined; // Logo watermark image buffer
  watermarkText?: string | undefined; // Branding title text
  userId?: string | undefined; // Uploading user ID
  location?: string | undefined; // Geolocation / IP / City
  timestamp?: Date | string | number | undefined; // Timestamp formatted via date-fns
  gravity?: 'south' | 'southeast' | 'southwest' | 'north' | 'northeast' | 'center' | undefined;
  opacity?: number | undefined; // 0.1 to 1.0 (Default: 0.7)
  outputFormat?: 'webp' | 'jpeg' | 'png' | undefined;
  quality?: number | undefined;
}

export interface ProcessImageOptions {
  imageBuffer?: Buffer | undefined;
  imageBufferBase64?: string | undefined;
  category?: ImageCategory | undefined;
  userId?: string | undefined;
  location?: string | undefined;
  timestamp?: Date | string | number | undefined;
  skipWatermark?: boolean | undefined;
  watermarkText?: string | undefined;
  watermarkBuffer?: Buffer | undefined;
  outputFormat?: 'webp' | 'jpeg' | 'png' | undefined;
  quality?: number | undefined;
}

// 1. Convert any image Buffer to PNG in memory (No Watermark)
const convertToPng = async (inputBuffer: Buffer): Promise<Buffer> => {
  return await sharp(inputBuffer).png().toBuffer();
};

// 2. Dynamic Watermark Generator (with date-fns, User ID, and Location)
const addWatermarkToImage = async ({
  imageBuffer,
  watermarkBuffer,
  watermarkText = '© My App',
  userId,
  location,
  timestamp,
  gravity = 'southeast', // Bottom-Right corner
  opacity = 0.7,
  outputFormat = 'png',
  quality = 80,
}: WatermarkOptions): Promise<Buffer> => {
  const image = sharp(imageBuffer);
  const metadata = await image.metadata();

  const width = metadata.width || 800;
  const height = metadata.height || 600;

  let overlayBuffer: Buffer;

  if (watermarkBuffer) {
    // Resize logo watermark to ~20% of main image width
    const logoWidth = Math.round(width * 0.2);
    overlayBuffer = await sharp(watermarkBuffer)
      .resize({ width: logoWidth })
      .composite([
        {
          input: Buffer.from([255, 255, 255, Math.round(opacity * 255)]),
          raw: { width: 1, height: 1, channels: 4 },
          tile: true,
          blend: 'dest-in',
        },
      ])
      .png()
      .toBuffer();
  } else {
    // Format timestamp using date-fns
    const formattedDate = formatISODate({
      date: timestamp || new Date(),
      formatType: 'long',
    });

    const titleStr = watermarkText;
    const userDateStr = userId ? `User: ${userId} | ${formattedDate}` : formattedDate;
    const locationStr = location ? `Loc: ${location}` : '';

    const fontSize = Math.max(14, Math.round(width * 0.03));
    const subFontSize = Math.max(11, Math.round(fontSize * 0.75));

    const svgText = `
      <svg width="${width}" height="${height}">
        <style>
          .wm-title {
            font-family: Arial, sans-serif;
            font-size: ${fontSize}px;
            font-weight: bold;
            fill: rgba(255, 255, 255, ${opacity});
            stroke: rgba(0, 0, 0, ${opacity * 0.8});
            stroke-width: 1px;
          }
          .wm-sub {
            font-family: Arial, sans-serif;
            font-size: ${subFontSize}px;
            font-weight: 500;
            fill: rgba(255, 255, 255, ${opacity * 0.9});
            stroke: rgba(0, 0, 0, ${opacity * 0.7});
            stroke-width: 0.8px;
          }
        </style>
        <text x="96%" y="${height - (locationStr ? 48 : 28)}" text-anchor="end" class="wm-title">${titleStr}</text>
        <text x="96%" y="${height - (locationStr ? 28 : 12)}" text-anchor="end" class="wm-sub">${userDateStr}</text>
        ${locationStr ? `<text x="96%" y="${height - 10}" text-anchor="end" class="wm-sub">📍 ${locationStr}</text>` : ''}
      </svg>
    `;
    overlayBuffer = Buffer.from(svgText);
  }

  // Composite Overlay on Main Image
  const resultImage = image.composite([
    {
      input: overlayBuffer,
      gravity,
    },
  ]);

  if (outputFormat === 'jpeg') {
    return await resultImage.jpeg({ quality }).toBuffer();
  } else if (outputFormat === 'webp') {
    return await resultImage.webp({ quality }).toBuffer();
  } else {
    return await resultImage.png().toBuffer();
  }
};



/**
 * Smart Image Processor:
 * - AADHAR, PAN, VOTER_ID, PASSPORT, BANK_STATEMENT, LOGO, BANNER, AVATAR:
 *   Watermark IS SKIPPED to preserve document verification & OCR readability.
 * - GALLERY: Watermark IS APPLIED with date-fns timestamp, userId, and location.
 */
export const processImageForUpload = async ({
  imageBuffer,
  category = 'GALLERY',
  userId,
  location,
  timestamp,
  skipWatermark,
  watermarkText = '©aslwallets',
  watermarkBuffer,
  outputFormat = 'png',
  quality = 80,
}: ProcessImageOptions): Promise<Buffer> => {
  const isKycOrBrandDoc = ['AADHAR', 'PAN', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENSE', 'BANK_STATEMENT', 'CHEQUE', 'GST', 'KYC_DOC', 'LOGO', 'BANNER', 'AVATAR'].includes(category);

  const shouldWatermark = skipWatermark !== undefined ? !skipWatermark : !isKycOrBrandDoc;

  if (!imageBuffer) {
    throw new Error('imageBuffer is required in processImageForUpload fn!');
  }

  if (shouldWatermark) {
    return await addWatermarkToImage({
      imageBuffer,
      watermarkBuffer,
      watermarkText,
      userId,
      location,
      timestamp,
      outputFormat,
      quality,
    });
  }

  // KYC Docs, Logos, Banners, Avatars (No Watermark — direct optimize & PNG conversion)
  return await convertToPng(imageBuffer);
};



// Offloads heavy Sharp Image Processing / Watermarking to a separate OS Worker Thread (node:worker_threads)
// WITHOUT ANY CODE DUPLICATION — reusing processImageForUpload directly in the worker task.

export const processImageInWorkerThread = async (options: ProcessImageOptions): Promise<Buffer> => {

  // These path (scriptPath / fallbackScriptPath) helps = Completely isolated, new OS CPU core execution (Non-blocking / Fast).
  const scriptPath = path.resolve(process.cwd(), 'dist/config/workers/tasks/imageProcessingTask.js');
  const fallbackScriptPath = path.resolve(process.cwd(), 'src/config/workers/tasks/imageProcessingTask.ts');

  const imageBufferBase64 = options.imageBufferBase64 || options.imageBuffer?.toString('base64');

  if (!imageBufferBase64) {
    throw new Error('Either imageBuffer or imageBufferBase64 must be provided to processImageInWorkerThread');
  }
  // 
  const resultBuffer = await runInWorkerThread<Buffer>({
    scriptPath: process.env['NODE_ENV'] === 'production' ? scriptPath : fallbackScriptPath,
    workerData: {
      ...options,
      imageBufferBase64,
      imageBuffer: undefined, // base64 sent over worker channel
    },
    timeoutMs: 60000,
  });

  return Buffer.from(resultBuffer);
};
