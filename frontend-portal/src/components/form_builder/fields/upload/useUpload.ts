"use client";

import { useState, useCallback, useEffect, useRef, DragEvent } from "react";
import { UploadFileItem, UploadFieldProps, AcceptType } from "./types";

function parseValueToItems(val: unknown): UploadFileItem[] {
  if (!val) return [];
  const rawArray = Array.isArray(val) ? val : [val];
  return rawArray.map((item, idx) => {
    if (item instanceof File) {
      const previewUrl = item.type.startsWith("image/") ? URL.createObjectURL(item) : undefined;
      return {
        id: `${item.name}-${item.lastModified}-${idx}`,
        file: item,
        name: item.name,
        size: item.size,
        type: item.type,
        previewUrl,
        status: "idle",
      };
    }

    if (typeof item === "string") {
      return {
        id: `url-${idx}`,
        name: item.split("/").pop() || "File",
        size: 0,
        type: item.endsWith(".png") || item.endsWith(".jpg") ? "image/jpeg" : "application/octet-stream",
        url: item,
        previewUrl: item,
        status: "success",
      };
    }

    if (typeof item === "object" && item !== null && "name" in item) {
      const fileObj = item as Record<string, unknown>;
      return {
        id: (fileObj.id as string) || `item-${idx}`,
        name: String(fileObj.name || "File"),
        size: Number(fileObj.size || 0),
        type: String(fileObj.type || "unknown"),
        url: fileObj.url as string | undefined,
        previewUrl: fileObj.previewUrl as string | undefined,
        status: (fileObj.status as UploadFileItem["status"]) || "idle",
        progress: fileObj.progress as number | undefined,
        error: fileObj.error as string | undefined,
      };
    }

    return {
      id: `unknown-${idx}`,
      name: "File",
      size: 0,
      type: "unknown",
      status: "idle",
    };
  });
}

export function useUpload(props: UploadFieldProps) {
  const {
    multiple = false,
    accept,
    maxSize = 10 * 1024 * 1024, // 10MB default
    maxFiles = 5,
    disabled = false,
    value,
    onChange,
    onUpload,
    field,
  } = props;

  const inputRef = useRef<HTMLInputElement | null>(null);
  const currentValue = field?.state.value ?? value;
  const [prevValue, setPrevValue] = useState<unknown>(currentValue);
  const [items, setItems] = useState<UploadFileItem[]>(() => parseValueToItems(currentValue));
  const [isDragging, setIsDragging] = useState(false);
  const [validationError, setValidationError] = useState<string | null>(null);

  // Sync state during rendering when currentValue prop changes
  if (currentValue !== prevValue) {
    setPrevValue(currentValue);
    setItems(parseValueToItems(currentValue));
  }

  // Clean up object URLs on unmount
  useEffect(() => {
    return () => {
      items.forEach((item) => {
        if (item.previewUrl?.startsWith("blob:")) {
          URL.revokeObjectURL(item.previewUrl);
        }
      });
    };
  }, [items]);

  // Parse accepted rules
  const parseAcceptRules = (acceptProp?: AcceptType): string[] => {
    if (!acceptProp) return [];
    if (Array.isArray(acceptProp)) return acceptProp.map((s) => s.toLowerCase().trim());
    return acceptProp.split(",").map((s) => s.toLowerCase().trim());
  };

  const validateFile = useCallback(
    (file: File): string | null => {
      // Size check
      if (maxSize && file.size > maxSize) {
        const mb = (maxSize / (1024 * 1024)).toFixed(1);
        return `File "${file.name}" exceeds the maximum limit of ${mb}MB.`;
      }

      // Accept rules check
      const rules = parseAcceptRules(accept);
      if (rules.length > 0) {
        const fileExt = `.${file.name.split(".").pop()?.toLowerCase()}`;
        const fileMime = file.type.toLowerCase();

        const isValid = rules.some((rule) => {
          if (rule.startsWith(".")) {
            return fileExt === rule;
          }
          if (rule.endsWith("/*")) {
            const typeGroup = rule.replace("/*", "");
            return fileMime.startsWith(`${typeGroup}/`);
          }
          return fileMime === rule;
        });

        if (!isValid) {
          return `File "${file.name}" format is not allowed. Supported: ${rules.join(", ")}`;
        }
      }

      return null;
    },
    [maxSize, accept]
  );

  const processCustomUploads = useCallback(
    async (createdItems: UploadFileItem[]) => {
      if (!onUpload) return;
      for (const item of createdItems) {
        if (!item.file) continue;
        try {
          const uploadedUrl = await onUpload(item.file);
          setItems((prev) =>
            prev.map((i) =>
              i.id === item.id
                ? { ...i, status: "success", progress: 100, url: uploadedUrl || i.url }
                : i
            )
          );
        } catch (err: unknown) {
          const errorMessage = err instanceof Error ? err.message : "Upload failed";
          setItems((prev) =>
            prev.map((i) => (i.id === item.id ? { ...i, status: "error", error: errorMessage } : i))
          );
        }
      }
    },
    [onUpload]
  );

  const handleFilesAdded = useCallback(
    async (fileList: FileList | File[]) => {
      setValidationError(null);
      const incomingFiles = Array.from(fileList);
      if (incomingFiles.length === 0) return;

      if (multiple && items.length + incomingFiles.length > maxFiles) {
        setValidationError(`Cannot add more files. Maximum allowed limit is ${maxFiles} files.`);
        return;
      }

      const validFiles: File[] = [];
      for (const file of incomingFiles) {
        const err = validateFile(file);
        if (err) {
          setValidationError(err);
          return;
        }
        validFiles.push(file);
      }

      const createdItems: UploadFileItem[] = validFiles.map((file, idx) => ({
        id: `${file.name}-${Date.now()}-${idx}`,
        file,
        name: file.name,
        size: file.size,
        type: file.type,
        previewUrl: file.type.startsWith("image/") ? URL.createObjectURL(file) : undefined,
        status: onUpload ? "uploading" : "idle",
        progress: onUpload ? 0 : 100,
      }));

      const nextItems = multiple ? [...items, ...createdItems] : [createdItems[0]];
      setItems(nextItems);

      const rawPayload = multiple
        ? nextItems.map((i) => i.file || i.url).filter(Boolean)
        : nextItems[0]?.file || nextItems[0]?.url || null;

      if (field) {
        field.handleChange(rawPayload);
      }
      if (onChange) {
        onChange(rawPayload as unknown as File & File[]);
      }

      if (onUpload) {
        await processCustomUploads(createdItems);
      }
    },
    [items, multiple, maxFiles, validateFile, field, onChange, onUpload, processCustomUploads]
  );

  const handleRemove = useCallback(
    (id: string) => {
      const nextItems = items.filter((item) => item.id !== id);
      setItems(nextItems);

      const rawPayload = multiple
        ? nextItems.map((i) => i.file || i.url).filter(Boolean)
        : nextItems[0]?.file || nextItems[0]?.url || null;

      if (field) {
        field.handleChange(rawPayload);
      }
      if (onChange) {
        onChange(rawPayload as File | File[] | null);
      }
    },
    [items, multiple, field, onChange]
  );

  const handleReplace = useCallback(
    (id?: string) => {
      if (disabled) return;
      if (id) {
        handleRemove(id);
      }
      inputRef.current?.click();
    },
    [disabled, handleRemove]
  );

  const handleDragOver = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    if (!disabled) setIsDragging(true);
  };

  const handleDragLeave = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
  };

  const handleDrop = (e: DragEvent<HTMLElement>) => {
    e.preventDefault();
    e.stopPropagation();
    setIsDragging(false);
    if (!disabled && e.dataTransfer.files?.length) {
      handleFilesAdded(e.dataTransfer.files);
    }
  };

  const triggerBrowse = () => {
    if (!disabled) {
      inputRef.current?.click();
    }
  };

  return {
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
  };
}
