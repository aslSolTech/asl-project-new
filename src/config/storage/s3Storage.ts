import { S3Client, PutObjectCommand, DeleteObjectCommand } from '@aws-sdk/client-s3';
import { S3_ENDPOINT, S3_REGION, S3_BUCKET, S3_ACCESS_KEY_ID, S3_SECRET_ACCESS_KEY, S3_CDN_URL } from '../dotenv/dotenv.js';
import { logger } from '../logger/logger.js';

// Initialize S3 Client compatible with DigitalOcean Spaces, AWS S3, Cloudflare R2, MinIO
export const s3Client = new S3Client({
  endpoint: S3_ENDPOINT,
  region: S3_REGION,
  credentials: {
    accessKeyId: S3_ACCESS_KEY_ID,
    secretAccessKey: S3_SECRET_ACCESS_KEY,
  },
  forcePathStyle: false, // Set to true if using MinIO or local S3 emulator
});

export interface CloudUploadOptions {
  buffer: Buffer;
  fileName: string;
  contentType: string;
  folder?: string | undefined;
  isPublic?: boolean | undefined;
}

export interface UserDocumentUploadOptions {
  buffer: Buffer;
  userId: string; // e.g. "usr_10024"
  docType: 'PAN' | 'AADHAR' | 'VOTER_ID' | 'PASSPORT' | 'DRIVING_LICENSE' | 'BANK_STATEMENT' | 'CHEQUE' | 'GST' | 'AVATAR' | 'LOGO' | 'BANNER';
  contentType?: string | undefined; // Default: "image/png"
  existingKey?: string | undefined; // Pass old key when updating/re-uploading to delete old file first!
}

//  Uploads to DO Spaces/S3 Compatible Storage and public upload only
export const uploadToCloudStorage = async ({ buffer, fileName, contentType, folder = 'storage', isPublic = true }: CloudUploadOptions): Promise<string> => {
  try {
    const key = folder ? `${folder}/${fileName}` : fileName;

    const command = new PutObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
      Body: buffer,
      ContentType: contentType,
      ACL: isPublic ? 'public-read' : 'private',
    });

    await s3Client.send(command);

    const fileUrl = S3_CDN_URL ? `${S3_CDN_URL.replace(/\/$/, '')}/${key}` : `${S3_ENDPOINT.replace(/\/$/, '')}/${S3_BUCKET}/${key}`;

    logger.info({ key, fileUrl, isPublic }, 'File uploaded successfully to Cloud Storage');
    return fileUrl;
  } catch (err) {
    logger.error({ err, fileName }, 'Failed to upload file to Cloud Storage');
    throw err;
  }
};

/**
 * User Onboarding Document Manager:
 * 1. Stores files in User-Specific Folder: `users/{userId}/{kyc|profile}/{docType}.png`
 * 2. If re-uploading/updating (existingKey provided), auto-deletes the old file from Cloud Storage first!
 * 3. Privacy Control: KYC docs stored with Private ACL; Avatars/Logos stored Publicly.
 */
export const uploadUserDocument = async ({
  buffer,
  userId,
  docType,
  contentType = 'image/png',
  existingKey,
}: UserDocumentUploadOptions): Promise<{ key: string; url: string; isPrivate: boolean }> => {

  // 1. Delete previous file if updating/re-uploading
  if (existingKey) {
    logger.info({ userId, existingKey }, 'Deleting previous document/file before update...');
    await deleteFromCloudStorage(existingKey).catch((err) => {
      logger.warn({ err, existingKey }, 'Could not delete existing document/file');
    });
  }

  // 2. Determine folder & privacy
  const isKyc = ['PAN', 'AADHAR', 'VOTER_ID', 'PASSPORT', 'DRIVING_LICENSE', 'BANK_STATEMENT', 'CHEQUE', 'GST'].includes(docType);

  const subFolder = isKyc ? 'kyc' : 'profile';
  const folder = `users/${userId}/${subFolder}`;
  const fileName = `${docType.toLowerCase()}-${userId}-${Date.now()}.png`;
  const key = `${folder}/${fileName}`;

  // 3. Upload to Cloud Storage
  const url = await uploadToCloudStorage({
    buffer,
    fileName,
    contentType,
    folder,
    isPublic: !isKyc, // KYC is Private; Profile/Logo is Public
  });

  return { key, url, isPrivate: isKyc };
};

// Deletes a file from Cloud Storage
export const deleteFromCloudStorage = async (key: string): Promise<void> => {
  try {
    const command = new DeleteObjectCommand({
      Bucket: S3_BUCKET,
      Key: key,
    });
    await s3Client.send(command);
    logger.info({ key }, 'File deleted from Cloud Storage');
  } catch (err) {
    logger.error({ err, key }, 'Failed to delete file from Cloud Storage');
    throw err;
  }
};
