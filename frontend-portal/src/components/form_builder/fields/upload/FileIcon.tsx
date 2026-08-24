"use client";

import {
  FileImage,
  Film,
  Music,
  FileText,
  FileSpreadsheet,
  FileCode,
  FileArchive,
  File,
  LucideProps,
} from "lucide-react";
import { cn } from "@/lib/utils";

interface FileIconProps extends LucideProps {
  type?: string;
  filename?: string;
}

export function FileIcon({ type = "", filename = "", className, ...props }: Readonly<FileIconProps>) {
  const mime = type.toLowerCase();
  const ext = filename.split(".").pop()?.toLowerCase() || "";

  if (mime.startsWith("image/") || ["jpg", "jpeg", "png", "webp", "gif", "svg", "avif"].includes(ext)) {
    return <FileImage className={cn("text-blue-500", className)} {...props} />;
  }

  if (mime.startsWith("video/") || ["mp4", "webm", "mov", "avi", "mkv"].includes(ext)) {
    return <Film className={cn("text-purple-500", className)} {...props} />;
  }

  if (mime.startsWith("audio/") || ["mp3", "wav", "ogg", "aac", "flac"].includes(ext)) {
    return <Music className={cn("text-emerald-500", className)} {...props} />;
  }

  if (mime.includes("pdf") || ext === "pdf") {
    return <FileText className={cn("text-red-500", className)} {...props} />;
  }

  if (
    mime.includes("spreadsheet") ||
    mime.includes("excel") ||
    ["csv", "xlsx", "xls"].includes(ext)
  ) {
    return <FileSpreadsheet className={cn("text-green-600", className)} {...props} />;
  }

  if (
    mime.includes("json") ||
    mime.includes("javascript") ||
    mime.includes("typescript") ||
    mime.includes("html") ||
    ["js", "ts", "tsx", "jsx", "html", "css", "json", "py"].includes(ext)
  ) {
    return <FileCode className={cn("text-amber-500", className)} {...props} />;
  }

  if (
    mime.includes("zip") ||
    mime.includes("compressed") ||
    mime.includes("tar") ||
    ["zip", "rar", "7z", "tar", "gz"].includes(ext)
  ) {
    return <FileArchive className={cn("text-orange-500", className)} {...props} />;
  }

  return <File className={cn("text-muted-foreground", className)} {...props} />;
}
