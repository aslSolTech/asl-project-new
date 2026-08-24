

export type UploadVariant = "default" | "avatar" | "card" | "multiple";

export type AvatarSize = "sm" | "md" | "lg" | "xl";

export interface UploadFileItem {
  id: string;
  file?: File;
  name: string;
  size: number;
  type: string;
  url?: string;
  previewUrl?: string;
  status: "idle" | "uploading" | "success" | "error";
  progress?: number;
  error?: string;
}

export type AcceptType = string | string[];

export interface UploadFieldProps {
  /** Variant of the upload control */
  variant?: UploadVariant;
  /** Allow multiple file selection */
  multiple?: boolean;
  /** Allowed file extensions or MIME types (e.g., "image/*" or [".pdf", ".png"]) */
  accept?: AcceptType;
  /** Maximum file size in bytes (e.g., 5 * 1024 * 1024 for 5MB) */
  maxSize?: number;
  /** Maximum number of files allowed (for multiple variant or multiple=true) */
  maxFiles?: number;
  /** Disable interactions */
  disabled?: boolean;
  /** Global loading state */
  loading?: boolean;
  /** Enable or disable file preview UI */
  isPreview?: boolean;
  /** Display progress bar during upload simulation or processing */
  showProgress?: boolean;
  /** Show remove action button */
  showRemove?: boolean;
  /** Show replace action button */
  showReplace?: boolean;
  /** Show browse text/link trigger */
  showBrowse?: boolean;
  /** Show standalone "Choose File" button style */
  showChooseButton?: boolean;
  /** Enable modal popup for previews */
  previewModal?: boolean;
  /** Rounded styles */
  rounded?: boolean;
  /** Avatar size when variant="avatar" */
  avatarSize?: AvatarSize;
  /** Field label */
  label?: string;
  /** Field description/helper text */
  description?: string;
  /** Placeholder text inside dropzone */
  placeholder?: string;
  /** Field error message from form or validation */
  error?: string;
  /** Required field indicator */
  required?: boolean;
  /** OnBlur handler for field touch state */
  onBlur?: () => void;
  /** Custom wrapper class */
  className?: string;
  /** Value for controlled standalone mode */
  value?: File | File[] | UploadFileItem | UploadFileItem[] | string | string[] | null;
  /** OnChange handler for controlled mode */
  onChange?: (files: File | File[] | null) => void;
  /** Custom upload trigger function (returns progress 0-100 or Promise) */
  onUpload?: (file: File) => Promise<string | void>;
  /** TanStack Form field API object (optional) */
  field?: {
    name: string;
    state: {
      value: unknown;
      meta: {
        errors: string[];
        isTouched?: boolean;
      };
    };
    handleChange: (val: unknown) => void;
    handleBlur?: () => void;
  };
}
