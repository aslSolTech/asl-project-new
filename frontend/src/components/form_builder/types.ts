import { ReactNode } from "react";
import { z } from "zod";

export type FieldType =
  | "text"
  | "email"
  | "password"
  | "tel"
  | "url"
  | "number"
  | "textarea"
  | "select"
  | "checkbox"
  | "switch"
  | "date"
  | "file";

export interface SelectOption {
  readonly label: string;
  readonly value: string | number;
}

export interface FormFieldConfig {
  readonly name: string;
  readonly label: string;
  readonly type: FieldType;
  readonly placeholder?: string;
  readonly defaultValue?: unknown;
  readonly required?: boolean;
  readonly disabled?: boolean;
  readonly readOnly?: boolean;
  readonly helperText?: string;
  readonly options?: readonly SelectOption[];
  readonly rows?: number;
  readonly min?: number;
  readonly max?: number;
  readonly step?: number;
  readonly accept?: string;
  readonly colSpan?: 1 | 2 | 3 | 4;
  readonly className?: string;
  readonly wrapperClassName?: string;
  readonly validate?: (value: unknown) => string | undefined;
}

export interface FormRendererProps<T extends Record<string, unknown> = Record<string, unknown>> {
  readonly schema?: z.ZodType<T>;
  readonly fields: readonly FormFieldConfig[];
  readonly defaultValues?: Partial<T>;
  readonly onSubmit: (data: T) => void | Promise<void>;
  readonly submitLabel?: string;
  readonly submittingText?: string;
  readonly submitIcon?: ReactNode;
  readonly resetOnSubmit?: boolean;
  readonly gridCols?: 1 | 2 | 3 | 4;
  readonly className?: string;
  readonly extraButtons?: ReactNode;
  readonly isLoading?: boolean;
}
