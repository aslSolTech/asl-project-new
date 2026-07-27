import type { ImageCategory } from "../images/imgConfig.js";

export interface EmailJobPayload {
  to: string;
  subject: string;
  text?: string;
  html?: string;
  attachments?: Array<{ filename: string; path?: string; content?: unknown }>;
}

export interface ExcelReportPayload {
  fileName: string;
  data: Array<Record<string, any>>;
  columns: Array<Record<string, unknown>>;
}

export interface PdfReportPayload {
  fileName: string;
  title: string;
  content: string;
}

export interface CsvReportPayload {
  fileName: string;
  data: Array<Record<string, any>>;
  columns?: string[];
}

export interface CompressImagePayload {
  inputPath: string;
  outputPath?: string;
  quality?: number;
}

export interface ConvertImageFormatPayload {
  inputPath: string;
  outputPath: string;
  format: "webp" | "png" | "jpeg" | "avif";
}

export interface ResizeImagePayload {
  inputPath: string;
  outputPath: string;
  width?: number;
  height?: number;
}

export interface CreateZipArchivePayload {
  filePaths: string[];
  zipOutputPath: string;
}

export interface WatermarkAndUploadPayload {
  imageBufferBase64: string;
  fileName: string;
  category?: ImageCategory | undefined;
  userId?: string | undefined;
  location?: string | undefined;
  timestamp?: string | number | undefined;
  skipWatermark?: boolean | undefined;
  watermarkText?: string | undefined;
  folder?: string | undefined;
  existingKey?: string | undefined;
}

export interface EmailJobDataMap {
  sendEmail: EmailJobPayload;
}

export interface ReportJobDataMap {
  excelReport: ExcelReportPayload;
  pdfReport: PdfReportPayload;
  csvReport: CsvReportPayload;
}

export interface MediaJobDataMap {
  compressImage: CompressImagePayload;
  convertImageFormat: ConvertImageFormatPayload;
  resizeImage: ResizeImagePayload;
  createZipArchive: CreateZipArchivePayload;
  watermarkAndUploadImage: WatermarkAndUploadPayload;
}

export type EmailJobType = keyof EmailJobDataMap;
export type ReportJobType = keyof ReportJobDataMap;
export type MediaJobType = keyof MediaJobDataMap;
