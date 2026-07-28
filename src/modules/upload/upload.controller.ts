import type { Request, Response } from 'express';
import { addJob } from '../../config/jobsqueue/bullmqConfig.js';
import { uploadToCloudStorage, uploadUserDocument, getPresignedUrl } from '../../config/storage/s3Storage.js';

/**
 * 1. Image Upload Controller (Queue + Sharp Worker Thread + S3)
 * Route: POST /api/v1/upload/image
 * Form-Data: image (file), category (string), userId (string)
 */
export const uploadImageController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ status: false, message: 'No image file provided' });
  }

  const category = (req.body.category || 'GALLERY') as any;
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

  return res.status(202).json({
    status: true,
    message: 'Image upload job accepted! Processing and uploading to S3 in background.',
  });
};

/**
 * 2. Banner Video Upload Controller (Direct to S3 Cloud Storage)
 * Route: POST /api/v1/upload/video
 * Form-Data: video (file)
 */
export const uploadVideoController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ status: false, message: 'No video file provided' });
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

  return res.status(200).json({
    status: true,
    message: 'Video uploaded successfully to S3 bucket',
    url: videoUrl,
  });
};

/**
 * 3. Document & Banking KYC Upload Controller (User Folder Hierarchy in S3)
 * Route: POST /api/v1/upload/document
 * Form-Data: document (file), userId (string), docType (string), existingKey (string optional)
 */
export const uploadDocumentController = async (req: Request, res: Response) => {
  if (!req.file) {
    return res.status(400).json({ status: false, message: 'No document file provided' });
  }

  const userId = req.body.userId || 'usr_guest';
  const docType = (req.body.docType || 'PAN') as any;
  const existingKey = req.body.existingKey || undefined; // Delete old file if re-uploading

  const result = await uploadUserDocument({
    buffer: req.file.buffer,
    userId,
    docType,
    contentType: req.file.mimetype,
    existingKey,
  });

  return res.status(200).json({
    status: true,
    message: 'Document uploaded successfully to S3 bucket',
    key: result.key,
    url: result.url,
    isPrivate: result.isPrivate,
  });
};

/**
 * 4. Get Presigned URL for Private KYC Document
 * Route: GET /api/v1/upload/document/presigned-url?key=users/usr_100/kyc/pan-123.png
 */
export const getDocumentPresignedUrlController = async (req: Request, res: Response) => {
  const { key } = req.query;

  if (!key || typeof key !== 'string') {
    return res.status(400).json({ status: false, message: 'Document S3 key is required' });
  }

  // Generate temporary S3 presigned URL valid for 15 minutes (900 seconds)
  const presignedUrl = await getPresignedUrl(key, 900);

  return res.status(200).json({
    status: true,
    presignedUrl,
  });
};
