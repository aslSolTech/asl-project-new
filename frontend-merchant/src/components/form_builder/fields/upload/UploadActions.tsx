"use client";

import { Button } from "@/components/ui/button";
import { RefreshCw, Trash2, FolderOpen } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadActionsProps {
  onBrowse?: () => void;
  onReplace?: () => void;
  onRemove?: () => void;
  disabled?: boolean;
  showChooseButton?: boolean;
  showBrowse?: boolean;
  showReplace?: boolean;
  showRemove?: boolean;
  className?: string;
}

export function UploadActions({
  onBrowse,
  onReplace,
  onRemove,
  disabled = false,
  showChooseButton = false,
  showBrowse = true,
  showReplace = true,
  showRemove = true,
  className,
}: Readonly<UploadActionsProps>) {
  return (
    <div className={cn("flex items-center gap-2", className)}>
      {showChooseButton && onBrowse && (
        <Button
          type="button"
          variant="outline"
          size="sm"
          disabled={disabled}
          onClick={onBrowse}
          className="gap-2 shadow-sm font-medium"
        >
          <FolderOpen className="w-4 h-4" />
          Choose File
        </Button>
      )}

      {showBrowse && !showChooseButton && onBrowse && (
        <button
          type="button"
          disabled={disabled}
          onClick={onBrowse}
          className="text-sm font-semibold text-primary hover:underline focus:outline-none disabled:opacity-50"
        >
          Browse File
        </button>
      )}

      {showReplace && onReplace && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={onReplace}
          className="h-8 px-2.5 text-xs gap-1.5 text-muted-foreground hover:text-foreground"
          title="Replace File"
        >
          <RefreshCw className="w-3.5 h-3.5" />
          Replace
        </Button>
      )}

      {showRemove && onRemove && (
        <Button
          type="button"
          variant="ghost"
          size="sm"
          disabled={disabled}
          onClick={onRemove}
          className="h-8 px-2.5 text-xs gap-1.5 text-destructive hover:text-destructive hover:bg-destructive/10"
          title="Remove File"
        >
          <Trash2 className="w-3.5 h-3.5" />
          Remove
        </Button>
      )}
    </div>
  );
}
