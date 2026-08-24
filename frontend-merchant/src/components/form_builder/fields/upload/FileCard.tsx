"use client";

import { UploadFileItem } from "./types";
import { FileIcon } from "./FileIcon";
import { UploadProgress } from "./UploadProgress";
import { UploadActions } from "./UploadActions";
import { Eye, CheckCircle2, AlertCircle } from "lucide-react";
import { cn } from "@/lib/utils";

interface FileCardProps {
  item: UploadFileItem;
  onRemove?: () => void;
  onReplace?: () => void;
  onPreviewClick?: () => void;
  showProgress?: boolean;
  showRemove?: boolean;
  showReplace?: boolean;
  isPreview?: boolean;
  disabled?: boolean;
  className?: string;
}

export function FileCard({
  item,
  onRemove,
  onReplace,
  onPreviewClick,
  showProgress = true,
  showRemove = true,
  showReplace = true,
  isPreview = true,
  disabled = false,
  className,
}: Readonly<FileCardProps>) {
  const formatSize = (bytes: number) => {
    if (bytes === 0) return "";
    const k = 1024;
    const sizes = ["Bytes", "KB", "MB", "GB"];
    const i = Math.floor(Math.log(bytes) / Math.log(k));
    return Number.parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + " " + sizes[i];
  };

  const isUploading = item.status === "uploading";
  const isSuccess = item.status === "success";
  const isError = item.status === "error";

  const renderThumbnailContent = () => (
    <>
      {isPreview && (item.previewUrl || item.url) && item.type.startsWith("image/") ? (
        <>
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img src={item.previewUrl || item.url} alt={item.name} className="w-full h-full object-cover" />
          {onPreviewClick && (
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover/thumb:opacity-100 transition-opacity flex items-center justify-center text-white">
              <Eye className="w-4 h-4" />
            </div>
          )}
        </>
      ) : (
        <FileIcon type={item.type} filename={item.name} className="w-6 h-6" />
      )}
    </>
  );

  return (
    <div
      className={cn(
        "group relative flex flex-col p-3 border border-border bg-card text-card-foreground rounded-xl shadow-sm transition-all hover:border-primary/40 hover:shadow-md",
        className
      )}
    >
      <div className="flex items-center justify-between gap-3 min-w-0">
        <div className="flex items-center gap-3 min-w-0 flex-1">
          {/* Thumbnail / Icon */}
          {onPreviewClick ? (
            <button
              type="button"
              onClick={onPreviewClick}
              aria-label={`Preview ${item.name}`}
              className="relative flex-shrink-0 w-11 h-11 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/50 cursor-pointer group/thumb focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
            >
              {renderThumbnailContent()}
            </button>
          ) : (
            <div className="relative flex-shrink-0 w-11 h-11 rounded-lg bg-muted flex items-center justify-center overflow-hidden border border-border/50">
              {renderThumbnailContent()}
            </div>
          )}

          {/* Details */}
          <div className="min-w-0 flex-1">
            <div className="flex items-center gap-1.5">
              <p className="text-sm font-semibold truncate text-foreground">{item.name}</p>
              {isSuccess && <CheckCircle2 className="w-4 h-4 text-emerald-500 flex-shrink-0" />}
              {isError && <AlertCircle className="w-4 h-4 text-destructive flex-shrink-0" />}
            </div>
            <p className="text-xs text-muted-foreground">
              {formatSize(item.size)}
              {isError && item.error && (
                <span className="text-destructive font-medium ml-1.5">• {item.error}</span>
              )}
            </p>
          </div>
        </div>

        {/* Actions */}
        <UploadActions
          onReplace={onReplace}
          onRemove={onRemove}
          disabled={disabled}
          showBrowse={false}
          showChooseButton={false}
          showReplace={showReplace}
          showRemove={showRemove}
        />
      </div>

      {/* Upload Progress */}
      {showProgress && isUploading && item.progress !== undefined && (
        <div className="mt-2.5 pt-2 border-t border-border/40">
          <UploadProgress progress={item.progress} status={item.status} />
        </div>
      )}
    </div>
  );
}
