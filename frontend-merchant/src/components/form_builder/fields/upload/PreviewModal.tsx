"use client";

import { useState, useEffect } from "react";
import {
  X,
  ZoomIn,
  ZoomOut,
  RotateCcw,
  Download,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { UploadFileItem } from "./types";
import { FileIcon } from "./FileIcon";
import { Button } from "@/components/ui/button";

interface PreviewModalProps {
  readonly isOpen: boolean;
  readonly onClose: () => void;
  readonly items: UploadFileItem[];
  readonly currentIndex?: number;
  readonly onNavigate?: (index: number) => void;
}

export function PreviewModal({
  isOpen,
  onClose,
  items,
  currentIndex = 0,
  onNavigate,
}: PreviewModalProps) {
  const [zoom, setZoom] = useState(1);
  const [activeId, setActiveId] = useState<string | null>(null);

  const activeItem = items[currentIndex] || items[0];

  // Adjust zoom state without calling setState inside an effect body
  if (activeItem && activeItem.id !== activeId) {
    setActiveId(activeItem.id);
    setZoom(1);
  }

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (!isOpen) return;
      if (e.key === "Escape") onClose();
      if (e.key === "ArrowLeft" && currentIndex > 0 && onNavigate) {
        onNavigate(currentIndex - 1);
      }
      if (e.key === "ArrowRight" && currentIndex < items.length - 1 && onNavigate) {
        onNavigate(currentIndex + 1);
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isOpen, currentIndex, items.length, onClose, onNavigate]);

  if (!isOpen || items.length === 0 || !activeItem) return null;

  const url = activeItem.previewUrl || activeItem.url;
  const isImage = activeItem.type.startsWith("image/") || /\.(jpg|jpeg|png|webp|gif|svg)$/i.test(activeItem.name);
  const isVideo = activeItem.type.startsWith("video/") || /\.(mp4|webm|mov|mkv)$/i.test(activeItem.name);
  const isAudio = activeItem.type.startsWith("audio/") || /\.(mp3|wav|ogg)$/i.test(activeItem.name);
  const isPdf = activeItem.type.includes("pdf") || activeItem.name.endsWith(".pdf");

  const handleDownload = () => {
    if (!url) return;
    const a = document.createElement("a");
    a.href = url;
    a.download = activeItem.name;
    document.body.appendChild(a);
    a.click();
    a.remove();
  };

  const renderMediaView = () => {
    if (isImage && url) {
      return (
        <div className="overflow-auto max-w-full max-h-full flex items-center justify-center">
          {/* eslint-disable-next-line @next/next/no-img-element */}
          <img
            src={url}
            alt={activeItem.name}
            className="max-h-[65vh] object-contain transition-transform duration-200 rounded-lg shadow-md"
            style={{ transform: `scale(${zoom})` }}
          />
        </div>
      );
    }

    if (isVideo && url) {
      return (
        <video controls src={url} className="max-h-[65vh] max-w-full rounded-lg shadow-md">
          <track kind="captions" />
        </video>
      );
    }

    if (isAudio && url) {
      return (
        <div className="p-8 bg-card border rounded-2xl shadow-lg flex flex-col items-center gap-4">
          <FileIcon type={activeItem.type} filename={activeItem.name} className="w-16 h-16" />
          <p className="text-sm font-medium">{activeItem.name}</p>
          <audio controls src={url} className="w-full min-w-[300px]">
            <track kind="captions" />
          </audio>
        </div>
      );
    }

    if (isPdf && url) {
      return (
        <iframe src={url} title={activeItem.name} className="w-full h-full rounded-lg border border-border" />
      );
    }

    return (
      <div className="flex flex-col items-center justify-center gap-4 text-center p-8">
        <div className="p-6 rounded-2xl bg-muted/50 border border-border">
          <FileIcon type={activeItem.type} filename={activeItem.name} className="w-20 h-20" />
        </div>
        <div>
          <p className="text-base font-semibold text-foreground">{activeItem.name}</p>
          <p className="text-xs text-muted-foreground mt-1">No direct preview available for this file type.</p>
        </div>
        {url && (
          <Button onClick={handleDownload} className="mt-2 gap-2">
            <Download className="w-4 h-4" /> Download File
          </Button>
        )}
      </div>
    );
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/80 backdrop-blur-sm p-4 sm:p-6 transition-all duration-200">
      <div className="relative flex flex-col w-full max-w-5xl h-[85vh] bg-card text-card-foreground rounded-2xl border border-border shadow-2xl overflow-hidden">
        {/* Header */}
        <div className="flex items-center justify-between px-6 py-4 border-b border-border bg-muted/30">
          <div className="flex items-center gap-3 min-w-0 pr-4">
            <FileIcon type={activeItem.type} filename={activeItem.name} className="w-6 h-6 flex-shrink-0" />
            <div className="min-w-0">
              <h3 className="text-sm font-semibold truncate">{activeItem.name}</h3>
              <p className="text-xs text-muted-foreground">
                {(activeItem.size / (1024 * 1024)).toFixed(2)} MB
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2">
            {isImage && (
              <>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setZoom((z) => Math.min(z + 0.25, 3))}
                  title="Zoom In"
                >
                  <ZoomIn className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setZoom((z) => Math.max(z - 0.25, 0.5))}
                  title="Zoom Out"
                >
                  <ZoomOut className="w-4 h-4" />
                </Button>
                <Button
                  variant="outline"
                  size="icon"
                  className="h-8 w-8"
                  onClick={() => setZoom(1)}
                  title="Reset Zoom"
                >
                  <RotateCcw className="w-4 h-4" />
                </Button>
              </>
            )}

            {url && (
              <Button
                variant="outline"
                size="icon"
                className="h-8 w-8"
                onClick={handleDownload}
                title="Download"
              >
                <Download className="w-4 h-4" />
              </Button>
            )}

            <Button
              variant="ghost"
              size="icon"
              className="h-8 w-8 rounded-full hover:bg-destructive/10 hover:text-destructive"
              onClick={onClose}
              title="Close Modal"
            >
              <X className="w-5 h-5" />
            </Button>
          </div>
        </div>

        {/* Content Viewer Area */}
        <div className="relative flex-1 flex items-center justify-center bg-background/50 p-6 overflow-auto">
          {/* Navigation Controls */}
          {items.length > 1 && onNavigate && (
            <>
              <Button
                variant="outline"
                size="icon"
                disabled={currentIndex === 0}
                onClick={() => onNavigate(currentIndex - 1)}
                className="absolute left-4 z-10 rounded-full shadow-lg bg-card/80 backdrop-blur-md"
              >
                <ChevronLeft className="w-5 h-5" />
              </Button>
              <Button
                variant="outline"
                size="icon"
                disabled={currentIndex === items.length - 1}
                onClick={() => onNavigate(currentIndex + 1)}
                className="absolute right-4 z-10 rounded-full shadow-lg bg-card/80 backdrop-blur-md"
              >
                <ChevronRight className="w-5 h-5" />
              </Button>
            </>
          )}

          {/* Media Views */}
          {renderMediaView()}
        </div>

        {/* Footer */}
        {items.length > 1 && (
          <div className="px-6 py-3 border-t border-border bg-muted/30 flex justify-center text-xs text-muted-foreground font-medium">
            File {currentIndex + 1} of {items.length}
          </div>
        )}
      </div>
    </div>
  );
}
