import type { Request, Response } from 'express';
import { StatusCodes } from 'http-status-codes';
import { asyncHandler } from '../../middlewares/asynchandler/asyncHandler.js';
import { ApiResponse } from '../../utils/apiResponse.js';
import { BadRequestError } from '../../utils/appError.js';
import { addJob } from '../../config/jobsqueue/bullmqConfig.js';
import { uploadToCloudStorage, uploadUserDocument, type UserDocumentUploadOptions } from '../../config/storage/s3Storage.js';
import { processImageInWorkerThread } from '../../config/images/imgConfig.js';

/**
 * 1. Image Upload Controller (Queue + Sharp Worker Thread + S3)
 * Route: POST /api/v1/upload/image
 * Form-Data: image (file), category (string), userId (string)
 */
export const uploadImageController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('No image file provided');
  }

  const category = (req.body.category || 'GALLERY') as UserDocumentUploadOptions['docType'];
  const userId = req.body.userId || undefined;

  // Convert in-memory buffer to Base64 payload for Redis queue
  const imageBufferBase64 = req.file.buffer.toString('base64');

  // Dispatch job to BullMQ queue via unified addJob helper
  await addJob('watermarkAndUploadImage', {
    imageBufferBase64,
    fileName: req.file.originalname,
    category,
    userId,
    watermarkText: '© My App',
  });

  return ApiResponse.success(res, {
    statusCode: StatusCodes.ACCEPTED,
    message: 'Image upload job accepted! Processing and uploading to S3 in background.',
  });
});

/**
 * 2. Banner Video Upload Controller (Direct to S3 Cloud Storage)
 * Route: POST /api/v1/upload/video
 * Form-Data: video (file)
 */
export const uploadVideoController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('No video file provided');
  }

  const ext = req.file.originalname.split('.').pop() || 'mp4';
  const fileName = `banner-${Date.now()}.${ext}`;

  // Direct In-Memory Buffer Upload to S3 Bucket
  const videoUrl = await uploadToCloudStorage({
    buffer: req.file.buffer,
    fileName,
    contentType: req.file.mimetype,
    folder: 'videos',
    isPublic: true,
  });

  return ApiResponse.success(res, {
    statusCode: StatusCodes.OK,
    message: 'Video uploaded successfully to S3 bucket',
    data: { url: videoUrl },
  });
});

/**
 * 3. Document & Banking KYC Upload Controller (User Folder Hierarchy in S3)
 * Route: POST /api/v1/upload/document
 * Form-Data: document (file), userId (string), docType (string), existingKey (string optional)
 */
export const uploadDocumentController = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('No document file provided');
  }

  const userId = req.body.userId || 'usr_guest';
  const docType = (req.body.docType || 'PAN') as UserDocumentUploadOptions['docType'];
  const existingKey = req.body.existingKey || undefined; // Delete old file if re-uploading

  const result = await uploadUserDocument({
    buffer: req.file.buffer,
    userId,
    docType,
    contentType: req.file.mimetype,
    existingKey,
  });

  return ApiResponse.success(res, {
    statusCode: StatusCodes.OK,
    message: 'Document uploaded successfully to S3 bucket',
    data: result,
  });
});

/**
 * Direct Synchronous Image Upload Controller (Sharp Worker Thread + S3 Direct)
 * Route: POST /api/v1/upload/image
 */
export const uploadImageControllerWithoutBullMQ = asyncHandler(async (req: Request, res: Response) => {
  if (!req.file) {
    throw new BadRequestError('No image file provided');
  }

  const category = (req.body.category || 'GALLERY').toUpperCase() as UserDocumentUploadOptions['docType'];
  const userId = req.body.userId || undefined;

  // 1. Process Image using Worker Thread directly (Buffer to Base64)
  const processedBuffer = await processImageInWorkerThread({
    imageBufferBase64: req.file.buffer.toString('base64'),
    category,
    userId,
    outputFormat: 'png',
    quality: 85,
  });

  // 2. S3 Upload directly & Return Response
  if (userId) {
    const uploadResult = await uploadUserDocument({
      buffer: processedBuffer,
      userId,
      docType: category as any,
      contentType: req.file.mimetype,
    });

    return ApiResponse.success(res, {
      statusCode: StatusCodes.OK,
      message: 'Image processed and uploaded successfully!',
      data: uploadResult,
    });
  } else {
    const fileUrl = await uploadToCloudStorage({
      buffer: processedBuffer,
      fileName: category,
      contentType: req.file.mimetype,
      folder: 'gallery',
      isPublic: true,
    });

    return ApiResponse.success(res, {
      statusCode: StatusCodes.OK,
      message: 'Image processed and uploaded successfully!',
      data: { fileUrl },
    });
  }
});