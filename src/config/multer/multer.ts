import multer from "multer";
import path from "path";
import fs from "fs";
import type { Request } from "express";

// Ensure local fallback storage directory exists
const uploadDir = path.join(process.cwd(), "storage");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

// In-Memory Storage (Zero Local Disk Usage — ideal for Cloud Storage / Watermarking)
const memoryStorage = multer.memoryStorage();

export const uploadMemorySingle = multer({
  storage: memoryStorage,
  limits: { fileSize: 2 * 1024 * 1024 }, // 2MB max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
}).single("image");

export const uploadMemoryMultiple = multer({
  storage: memoryStorage,
  limits: { fileSize: 10 * 1024 * 1024, files: 10 }, // 10MB, 10 files max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only images are allowed"));
  },
}).array("images", 10);

// 2. Disk Storage Fallback
const diskStorage = multer.diskStorage({
  destination: (_req: Request, _file: Express.Multer.File, cb) => cb(null, uploadDir),
  filename: (_req: Request, file: Express.Multer.File, cb) => {
    const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
    const ext = path.extname(file.originalname);
    cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
  },
});

const fileFilter = (_req: Request, file: Express.Multer.File, cb: multer.FileFilterCallback) => {
  cb(null, true);
};

export const uploadSingle = multer({
  storage: diskStorage,
  fileFilter,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB max
}).single("file");

export const uploadMultiple = multer({
  storage: diskStorage,
  fileFilter,
  limits: {
    fileSize: 20 * 1024 * 1024,
    files: 5,
  },
}).array("files", 5);

// Helper to get media type from mimetype
export const getMediaType = (
  mimetype: string
): "IMAGE" | "VIDEO" | "PDF" | "FILE" | "TEXT" | "AUDIO" => {
  if (mimetype.startsWith("image/")) return "IMAGE";
  if (mimetype.startsWith("video/")) return "VIDEO";
  if (mimetype.startsWith("audio/")) return "AUDIO";
  if (mimetype === "application/pdf") return "PDF";
  if (mimetype === "text/plain") return "TEXT";
  return "FILE";
};
