import { Router } from 'express';
import { uploadMemorySingle, uploadVideoSingle, uploadDocumentSingle } from '../../config/multer/multer.js';
import { uploadImageController, uploadVideoController, uploadDocumentController, getDocumentPresignedUrlController } from './upload.controller.js';

const uplaodRouter = Router();

// 1. Single Image Upload (1 MB Max -> Queue -> Sharp Watermark -> S3)
uplaodRouter.post('/image', uploadMemorySingle, uploadImageController);

// 2. Banner Video Upload (15 MB Max -> Direct S3 Cloud Storage)
uplaodRouter.post('/video', uploadVideoSingle, uploadVideoController);

// 3. Document / KYC Upload (15 MB Max -> User S3 Folder -> Private/Public)
uplaodRouter.post('/document', uploadDocumentSingle, uploadDocumentController);

// 4. View Private KYC Document (15-min Temporary Presigned URL)
uplaodRouter.get('/document/presigned-url', getDocumentPresignedUrlController);

export default uplaodRouter;
