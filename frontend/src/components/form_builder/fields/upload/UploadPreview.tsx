"use client";

import { UploadFileItem } from "./types";
import { FileIcon } from "./FileIcon";
import { cn } from "@/lib/utils";

interface UploadPreviewProps {
  readonly item: UploadFileItem;
  readonly aspect?: "square" | "video" | "auto";
  readonly className?: string;
  readonly onClick?: () => void;
}

export function UploadPreview({
  item,
  aspect = "square",
  className,
  onClick,
}: Readonly<UploadPreviewProps>) {
  const url = item.previewUrl || item.url;
  const isImage = item.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(item.name);
  const isVideo = item.type.startsWith("video/") || /\.(mp4|webm|mov|mkv)$/i.test(item.name);
  const isAudio = item.type.startsWith("audio/") || /\.(mp3|wav|ogg)$/i.test(item.name);
  const isPdf = item.type.includes("pdf") || item.name.endsWith(".pdf");

  let aspectClass = "h-full w-full";
  if (aspect === "square") {
    aspectClass = "aspect-square";
  } else if (aspect === "video") {
    aspectClass = "aspect-video";
  }

  const containerClasses = cn(
    "relative flex items-center justify-center overflow-hidden bg-muted/40 rounded-lg border border-border/50 transition-all",
    onClick && "cursor-pointer hover:opacity-90 hover:scale-[1.01] focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
    aspectClass,
    className
  );

  const renderMediaContent = () => {
    if (isImage && url) {
      return (
        /* eslint-disable-next-line @next/next/no-img-element */
        <img src={url} alt={item.name} className="w-full h-full object-cover" />
      );
    }

    if (isVideo && url) {
      return (
        <div className="relative w-full h-full flex items-center justify-center bg-black/60">
          <video src={url} className="w-full h-full object-cover">
            <track kind="captions" />
          </video>
          <div className="absolute inset-0 flex items-center justify-center bg-black/40 text-white font-medium text-xs">
            Video Preview
          </div>
        </div>
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-2 p-4 text-center">
        <FileIcon type={item.type} filename={item.name} className="w-10 h-10" />
        <span className="text-xs font-semibold text-foreground/80 line-clamp-1 max-w-[120px]">
          {item.name}
        </span>
        {isPdf && <span className="text-[10px] uppercase font-bold text-red-500 bg-red-500/10 px-1.5 py-0.5 rounded">PDF</span>}
        {isAudio && <span className="text-[10px] uppercase font-bold text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">Audio</span>}
      </div>
    );
  };

  if (onClick) {
    return (
      <button
        type="button"
        onClick={onClick}
        aria-label={`Preview ${item.name}`}
        className={containerClasses}
      >
        {renderMediaContent()}
      </button>
    );
  }

  return (
    <div className={containerClasses}>
      {renderMediaContent()}
    </div>
  );
}
