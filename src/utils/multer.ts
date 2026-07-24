import multer from "multer";
import path from "path";
import fs from "fs";

// Ensure uploads directory exists
const uploadDir = path.join(process.cwd(), "uploads");
if (!fs.existsSync(uploadDir)) fs.mkdirSync(uploadDir, { recursive: true });

const storage = multer.diskStorage({
    destination: (_req, _file, cb) => cb(null, uploadDir),
    filename: (_req, file, cb) => {
        const uniqueSuffix = `${Date.now()}-${Math.round(Math.random() * 1e9)}`;
        const ext = path.extname(file.originalname);
        cb(null, `${file.fieldname}-${uniqueSuffix}${ext}`);
    }
});

const fileFilter = (_req: any, _file: Express.Multer.File, cb: multer.FileFilterCallback) => {
    cb(null, true);
};

export const uploadSingle = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 5 * 1024 * 1024 // 5MB max
    }
}).single("file");

export const uploadMultiple = multer({
    storage,
    fileFilter,
    limits: {
        fileSize: 20 * 1024 * 1024, // 20MB
        files: 5
    }
}).array("files", 5);

// ──── Avatar Upload ──────────────────────────────
const avatarStorage = multer.diskStorage({
    destination: (req: any, _file, cb) => {
        const userId = req.user?.id || "unknown";
        const dir = path.join(uploadDir, "avatars", String(userId));
        if (!fs.existsSync(dir)) fs.mkdirSync(dir, { recursive: true });
        cb(null, dir);
    },
    filename: (_req, file, cb) => {
        const ext = path.extname(file.originalname);
        cb(null, `avatar-${Date.now()}${ext}`);
    }
});

export const uploadAvatar = multer({
    storage: avatarStorage,
    fileFilter: (req, file, cb) => {
        if (file.mimetype.startsWith("image/")) cb(null, true);
        else cb(new Error("Only images are allowed for avatars") as any, false);
    },
    limits: { fileSize: 3 * 1024 * 1024 } // 3MB
}).single("avatar");

// Helper to get media type from mimetype
export const getMediaType = (mimetype: string): "IMAGE" | "VIDEO" | "PDF" | "FILE" | "TEXT" | "AUDIO" => {
    if (mimetype.startsWith("image/")) return "IMAGE";
    if (mimetype.startsWith("video/")) return "VIDEO";
    if (mimetype.startsWith("audio/")) return "AUDIO";
    if (mimetype === "application/pdf") return "PDF";
    if (mimetype === "text/plain") return "TEXT";
    return "FILE";
};