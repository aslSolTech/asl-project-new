import { Router } from 'express';
import { uploadMemorySingle, uploadVideoSingle, uploadDocumentSingle } from '../../config/multer/multer.js';
import { uploadVideoController, uploadDocumentController, uploadImageControllerWithoutBullMQ } from './upload.controller.js';

const uplaodRouter = Router();

// 1. Single Image Upload (1 MB Max -> Queue -> Sharp Watermark -> S3)
uplaodRouter.post('/image', uploadMemorySingle, uploadImageControllerWithoutBullMQ);

// 2. Banner Video Upload (15 MB Max -> Direct S3 Cloud Storage)
uplaodRouter.post('/video', uploadVideoSingle, uploadVideoController);

// 3. Document / KYC Upload (15 MB Max -> User S3 Folder -> Private/Public)
uplaodRouter.post('/document', uploadDocumentSingle, uploadDocumentController);


export default uplaodRouter;
