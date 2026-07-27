import multer from "multer";

// 100% In-Memory Storage (Zero Disk Usage — ideal for Worker Threads & MongoDB GridFS)
const memoryStorage = multer.memoryStorage();

// 1. Single Image / GIF Upload (Memory - 1 MB Max Limit)
export const uploadMemorySingle = multer({
  storage: memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024 }, // 1 MB max limit for single image / GIF
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files (PNG, JPG, WEBP, GIF) are allowed!"));
  },
}).single("image");

// 2. Multiple Images / GIFs Upload (Memory - 1 MB Max Per File, Max 5 Files)
export const uploadMemoryMultiple = multer({
  storage: memoryStorage,
  limits: { fileSize: 1 * 1024 * 1024, files: 5 }, // 1 MB per file, 5 files max
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("image/")) cb(null, true);
    else cb(new Error("Only image files (PNG, JPG, WEBP, GIF) are allowed!"));
  },
}).array("images", 5);

// 3. Banner Video Upload (Memory - 12 MB Max Limit for MP4/WEBM/MOV)
export const uploadVideoSingle = multer({
  storage: memoryStorage,
  limits: { fileSize: 12 * 1024 * 1024 }, // 12 MB max for banner videos
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("video/")) cb(null, true);
    else cb(new Error("Only video files (MP4, WEBM, MOV) are allowed!"));
  },
}).single("video");

// 4. Document & Banking KYC Upload (Memory - 15 MB Max Limit for PDF, DOCX, DOC, XLSX, CSV & Images)
export const uploadDocumentSingle = multer({
  storage: memoryStorage,
  limits: { fileSize: 15 * 1024 * 1024 }, // 15 MB max for documents
  fileFilter: (_req, file, cb) => {
    if (file.mimetype.startsWith("audio/") || file.mimetype === "text/plain") {
      return cb(new Error("Audio files and plain text files are strictly not allowed!"));
    }
    const isAllowedDoc =
      file.mimetype === "application/pdf" ||
      file.mimetype === "application/msword" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document" ||
      file.mimetype === "application/vnd.ms-excel" ||
      file.mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet" ||
      file.mimetype === "text/csv" ||
      file.mimetype === "application/csv" ||
      file.mimetype.startsWith("image/");

    if (isAllowedDoc) cb(null, true);
    else cb(new Error("Only document files (PDF, DOCX, DOC, XLSX, CSV, Images) are allowed!"));
  },
}).single("document");

// Helper to get media type from mimetype
export const getMediaType = (
  mimetype: string
): "IMAGE" | "VIDEO" | "PDF" | "DOC" | "EXCEL" | "CSV" | "FILE" => {
  if (mimetype.startsWith("image/")) return "IMAGE";
  if (mimetype.startsWith("video/")) return "VIDEO";
  if (mimetype === "application/pdf") return "PDF";
  if (
    mimetype === "application/msword" ||
    mimetype === "application/vnd.openxmlformats-officedocument.wordprocessingml.document"
  ) {
    return "DOC";
  }
  if (
    mimetype === "application/vnd.ms-excel" ||
    mimetype === "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet"
  ) {
    return "EXCEL";
  }
  if (
    mimetype === "text/csv" ||
    mimetype === "application/csv" ||
    mimetype === "text/x-csv"
  ) {
    return "CSV";
  }
  return "FILE";
};