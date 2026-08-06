"use client";

import { ReactNode } from "react";
import { UploadCloud, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadDropzoneProps {
  inputRef: React.RefObject<HTMLInputElement | null>;
  isDragging: boolean;
  disabled?: boolean;
  accept?: string | string[];
  multiple?: boolean;
  placeholder?: string;
  showChooseButton?: boolean;
  showBrowse?: boolean;
  onDragOver: (e: React.DragEvent<HTMLElement>) => void;
  onDragLeave: (e: React.DragEvent<HTMLElement>) => void;
  onDrop: (e: React.DragEvent<HTMLElement>) => void;
  onFileSelect: (files: FileList | File[]) => void;
  triggerBrowse: () => void;
  onBlur?: () => void;
  className?: string;
  children?: ReactNode;
}

export function UploadDropzone({
  inputRef,
  isDragging,
  disabled = false,
  accept,
  multiple = false,
  placeholder,
  showChooseButton = false,
  showBrowse = true,
  onDragOver,
  onDragLeave,
  onDrop,
  onFileSelect,
  triggerBrowse,
  onBlur,
  className,
  children,
}: Readonly<UploadDropzoneProps>) {
  const acceptString = Array.isArray(accept) ? accept.join(",") : accept;

  return (
    <button
      type="button"
      disabled={disabled}
      aria-label="Upload files dropzone"
      onDragOver={onDragOver}
      onDragLeave={onDragLeave}
      onDrop={onDrop}
      onClick={triggerBrowse}
      className={cn(
        "relative flex flex-col items-center justify-center p-8 sm:p-10 border-2 border-dashed rounded-xl cursor-pointer transition-all duration-200 text-center w-full focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2",
        isDragging
          ? "border-primary bg-primary/10 scale-[0.99] shadow-inner"
          : "border-border hover:border-primary/60 bg-muted/20 hover:bg-muted/40",
        disabled && "opacity-50 cursor-not-allowed hover:border-border hover:bg-muted/20",
        className
      )}
    >
      <input
        ref={inputRef}
        type="file"
        accept={acceptString}
        multiple={multiple}
        disabled={disabled}
        className="hidden"
        onBlur={onBlur}
        onChange={(e) => {
          if (e.target.files && e.target.files.length > 0) {
            onFileSelect(e.target.files);
            e.target.value = ""; // Reset so same file can be selected again if needed
          }
        }}
      />

      {children || (
        <>
          <div className="p-3.5 rounded-2xl bg-primary/10 text-primary mb-3 shadow-sm">
            <UploadCloud className="w-8 h-8" />
          </div>
          <p className="text-sm font-semibold text-foreground max-w-sm">
            {placeholder || (
              <>
                Drag & Drop file{multiple ? "s" : ""} here
                {showBrowse && (
                  <>
                    , or <span className="text-primary hover:underline underline-offset-4">Browse</span>
                  </>
                )}
              </>
            )}
          </p>

          {showChooseButton && (
            <span
              className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 rounded-md bg-secondary text-secondary-foreground text-xs font-medium shadow-sm hover:bg-secondary/80"
            >
              <FolderOpen className="w-4 h-4" />
              Choose File
            </span>
          )}

          {acceptString && (
            <p className="text-xs text-muted-foreground mt-2 font-medium">
              Supported formats: {acceptString}
            </p>
          )}
        </>
      )}
    </button>
  );
}
