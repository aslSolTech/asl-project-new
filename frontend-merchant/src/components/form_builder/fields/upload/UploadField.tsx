"use client";

import { useId, useState } from "react";
import { UploadFieldProps } from "./types";
import { useUpload } from "./useUpload";
import { UploadDropzone } from "./UploadDropzone";
import { FileCard } from "./FileCard";
import { PreviewModal } from "./PreviewModal";
import { Camera, AlertTriangle } from "lucide-react";
import { Label } from "@/components/ui/label";
import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import Image from "next/image";

export function UploadField(props: Readonly<UploadFieldProps>) {
  const {
    variant = "default",
    multiple = false,
    accept,
    disabled = false,
    loading = false,
    isPreview = true,
    showProgress = true,
    showRemove = true,
    showReplace = true,
    showBrowse = true,
    showChooseButton = false,
    previewModal = true,
    rounded = false,
    avatarSize = "md",
    label,
    description,
    placeholder,
    error: explicitError,
    required = false,
    onBlur,
    className,
    field,
  } = props;

  const handleBlur = field?.handleBlur || onBlur;
  const generatedId = useId();
  const fieldId = field ? `field-${field.name}` : `upload-${generatedId}`;

  const {
    inputRef,
    items,
    isDragging,
    validationError,
    setValidationError,
    handleDragOver,
    handleDragLeave,
    handleDrop,
    handleFilesAdded,
    handleRemove,
    handleReplace,
    triggerBrowse,
  } = useUpload(props);

  const [modalIndex, setModalIndex] = useState<number | null>(null);

  // Field error priority: explicit error -> field meta error -> validation error
  const fieldError =
    explicitError ||
    (field?.state.meta.isTouched && field?.state.meta.errors?.[0]) ||
    validationError;

  const isAvatar = variant === "avatar";
  const isCard = variant === "card";
  const isMultiple = variant === "multiple" || multiple;

  const avatarSizeClasses = {
    sm: "w-20 h-20",
    md: "w-28 h-28",
    lg: "w-36 h-36",
    xl: "w-44 h-44",
  }[avatarSize];

  const firstItem = items[0];

  return (
    <div className={cn("w-full space-y-2", className)}>
      {/* Label */}
      {label && !isAvatar && (
        <Label htmlFor={fieldId} className="text-sm font-semibold text-foreground flex items-center">
          {label}
          {required && <span className="text-destructive font-bold">*</span>}
        </Label>
      )}

      {/* Description */}
      {description && !isAvatar && <p className="text-xs text-muted-foreground">{description}</p>}

      {/* Validation Error Alert */}
      {fieldError && (
        <div className="flex items-center gap-2 p-3 rounded-lg bg-destructive/10 border border-destructive/20 text-destructive text-xs font-medium animate-in fade-in-50">
          <AlertTriangle className="w-4 h-4 flex-shrink-0" />
          <span className="flex-1">{fieldError}</span>
          {validationError && (
            <button
              type="button"
              onClick={() => setValidationError(null)}
              className="text-xs underline font-bold hover:opacity-80">
              Dismiss
            </button>
          )}
        </div>
      )}

      {/* Render Variant: AVATAR */}
      {isAvatar && (
        <div className="flex flex-col items-start gap-2">
          <button
            type="button"
            disabled={disabled}
            aria-label="Upload avatar image"
            onClick={triggerBrowse}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            className={cn(
              "group relative flex items-center justify-center overflow-hidden border-1 border-dashed transition-all duration-200 cursor-pointer shadow-sm hover:shadow-md focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring",
              rounded ? "rounded-2xl" : "rounded-full",
              avatarSizeClasses,
              isDragging
                ? "border-primary bg-primary/10 scale-105"
                : "border-border hover:border-primary/80 bg-muted/30",
              disabled && "opacity-50 cursor-not-allowed"
            )}>
            <input
              ref={inputRef}
              type="file"
              accept={Array.isArray(accept) ? accept.join(",") : accept}
              disabled={disabled}
              className="hidden"
              onBlur={handleBlur}
              onChange={(e) => e.target.files && handleFilesAdded(e.target.files)}
            />

            {firstItem && (firstItem.previewUrl || firstItem.url) ? (
              <>
                <Image
                  src={(firstItem.previewUrl || firstItem.url)!}
                  alt={firstItem.name}
                  width={100}
                  height={100}
                  className="w-full h-full object-cover alt:text-xs"
                />
                {/* Hover Camera Overlay */}
                <div className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex flex-col items-center justify-center text-white">
                  <Camera className="w-6 h-6 mb-1" />
                  <span className="text-[10px] font-semibold uppercase tracking-wider">Change</span>
                </div>
              </>
            ) : (
              <div className="flex flex-col items-center justify-center text-muted-foreground group-hover:text-primary transition-colors">
                <Camera className="w-7 h-7 mb-1" />
                <span className="text-[10px] font-semibold">Upload</span>
              </div>
            )}
          </button>

          {firstItem && isPreview && (
            <div className="flex items-center gap-2 text-xs">
              <Button
                type="button"
                variant="link"
                size="sm"
                onClick={() => setModalIndex(0)}
                className="hover:font-medium text-secondary dark:text-secondary-foreground transition-all duration-200 text-xs font-normal hover:no-underline p-0"
              >
                View
              </Button>
              {showRemove && (
                <>
                  <span>•</span>
                  <Button
                    type="button"
                    variant="link"
                    size="sm"
                    onClick={() => handleRemove(firstItem.id)}
                    className="text-destructive hover:font-medium transition-all duration-200 text-xs font-normal hover:no-underline p-0"
                  >
                    Remove
                  </Button>
                </>
              )}
            </div>
          )}

          {label && (
            <Label htmlFor={fieldId} className="text-sm font-semibold text-foreground flex items-center mt-1">
              {label}
              {required && <span className="text-destructive font-bold">*</span>}
            </Label>
          )}

          {description && <p className="text-xs text-muted-foreground">{description}</p>}
        </div>
      )}

      {/* Render Variant: IMAGE CARD */}
      {isCard && (
        <div className="w-full">
          {firstItem && (firstItem.previewUrl || firstItem.url) ? (
            <div className="relative group w-full h-52 rounded-xl overflow-hidden border border-border bg-muted/30 shadow-sm">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src={firstItem.previewUrl || firstItem.url}
                alt={firstItem.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-black/60 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center gap-3">
                {previewModal && (
                  <Button
                    type="button"
                    variant="secondary"
                    size="sm"
                    onClick={() => setModalIndex(0)}
                    className="gap-1.5"
                  >
                    Preview
                  </Button>
                )}
                {showReplace && (
                  <Button
                    type="button"
                    variant="outline"
                    size="sm"
                    onClick={() => handleReplace(firstItem.id)}
                    className="gap-1.5 bg-background/80 backdrop-blur-sm"
                  >
                    Replace
                  </Button>
                )}
                {showRemove && (
                  <Button
                    type="button"
                    variant="destructive"
                    size="sm"
                    onClick={() => handleRemove(firstItem.id)}
                    className="gap-1.5"
                  >
                    Remove
                  </Button>
                )}
              </div>
            </div>
          ) : (
            <UploadDropzone
              inputRef={inputRef}
              isDragging={isDragging}
              disabled={disabled || loading}
              accept={accept}
              multiple={false}
              placeholder={placeholder || "Drag & Drop cover image here, or Browse"}
              showChooseButton={showChooseButton}
              showBrowse={showBrowse}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFilesAdded}
              triggerBrowse={triggerBrowse}
              onBlur={handleBlur}
              className="h-52"
            />
          )}
        </div>
      )}

      {/* Render Variant: MULTIPLE (Grid Preview) */}
      {isMultiple && (
        <div className="space-y-4">
          <UploadDropzone
            inputRef={inputRef}
            isDragging={isDragging}
            disabled={disabled || loading}
            accept={accept}
            multiple={true}
            placeholder={placeholder}
            showChooseButton={showChooseButton}
            showBrowse={showBrowse}
            onDragOver={handleDragOver}
            onDragLeave={handleDragLeave}
            onDrop={handleDrop}
            onFileSelect={handleFilesAdded}
            triggerBrowse={triggerBrowse}
            onBlur={handleBlur}
          />

          {items.length > 0 && (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3">
              {items.map((item, idx) => (
                <FileCard
                  key={item.id}
                  item={item}
                  disabled={disabled}
                  showProgress={showProgress}
                  showRemove={showRemove}
                  showReplace={showReplace}
                  isPreview={isPreview}
                  onRemove={() => handleRemove(item.id)}
                  onReplace={() => handleReplace(item.id)}
                  onPreviewClick={previewModal ? () => setModalIndex(idx) : undefined}
                />
              ))}
            </div>
          )}
        </div>
      )}

      {/* Render Variant: DEFAULT (Single Standard File Upload) */}
      {variant === "default" && !multiple && (
        <div className="space-y-3">
          {items.length > 0 && firstItem ? (
            <FileCard
              item={firstItem}
              disabled={disabled}
              showProgress={showProgress}
              showRemove={showRemove}
              showReplace={showReplace}
              isPreview={isPreview}
              onRemove={() => handleRemove(firstItem.id)}
              onReplace={() => handleReplace(firstItem.id)}
              onPreviewClick={previewModal ? () => setModalIndex(0) : undefined}
            />
          ) : (
            <UploadDropzone
              inputRef={inputRef}
              isDragging={isDragging}
              disabled={disabled || loading}
              accept={accept}
              multiple={false}
              placeholder={placeholder}
              showChooseButton={showChooseButton}
              showBrowse={showBrowse}
              onDragOver={handleDragOver}
              onDragLeave={handleDragLeave}
              onDrop={handleDrop}
              onFileSelect={handleFilesAdded}
              triggerBrowse={triggerBrowse}
              onBlur={handleBlur}
            />
          )}
        </div>
      )}

      {/* Modal Preview */}
      {previewModal && modalIndex !== null && (
        <PreviewModal
          isOpen={modalIndex !== null}
          onClose={() => setModalIndex(null)}
          items={items}
          currentIndex={modalIndex}
          onNavigate={(idx) => setModalIndex(idx)}
        />
      )}
    </div>
  );
}
