"use client";

import { cn } from "@/lib/utils";

interface UploadProgressProps {
  progress?: number;
  status?: "idle" | "uploading" | "success" | "error";
  className?: string;
}

export function UploadProgress({
  progress = 0,
  status = "uploading",
  className,
}: Readonly<UploadProgressProps>) {
  const safeProgress = Math.min(100, Math.max(0, progress));

  let statusLabel = "Uploading...";
  if (status === "success") {
    statusLabel = "Completed";
  } else if (status === "error") {
    statusLabel = "Failed";
  }

  let barColorClass = "bg-primary animate-pulse";
  if (status === "error") {
    barColorClass = "bg-destructive";
  } else if (status === "success") {
    barColorClass = "bg-emerald-500";
  }

  return (
    <div className={cn("w-full space-y-1.5", className)}>
      <div className="flex justify-between items-center text-xs text-muted-foreground font-medium">
        <span>{statusLabel}</span>
        <span>{Math.round(safeProgress)}%</span>
      </div>
      <div className="w-full h-2 bg-muted rounded-full overflow-hidden">
        <div
          className={cn(
            "h-full transition-all duration-300 ease-out rounded-full",
            barColorClass
          )}
          style={{ width: `${safeProgress}%` }}
        />
      </div>
    </div>
  );
}
